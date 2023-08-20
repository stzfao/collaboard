import * as React from 'react';
import { Form } from 'react-bootstrap';
import { Container, Row, Col, InputGroup, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { Copy } from 'react-feather';
import socketIO, { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../../models';
import { useNavigate } from 'react-router-dom';

interface IJoinRoomProps {
  uuidGen: () => string;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  setUser: (data: SocketData) => void;
}

const JoinRoom: React.FunctionComponent<IJoinRoomProps> = ({ uuidGen, socket, setUser }: IJoinRoomProps) => {
  const [roomId, setRoomId] = React.useState('');
  const [username, setUsername] = React.useState('');

	const navigate = useNavigate();

  const handleRoomJoin = (e: any) => {
    e.preventDefault();

		const roomData = {
			username, 
			roomId,
			userId: uuidGen() + '__' + 'user',
			member: false,
		};
		socket.emit('joinRoom',roomData, (entry: boolean) => {
      roomData.member = entry;
    });
		setUser(roomData);
		navigate(`/room/${roomId}`);
  }

  return (
    <div className='CreateRoom'>
      <h2>Join an existing Room</h2>
      <Form >
        <Stack gap={3}>
          <Form.Group controlId="validationCustomUsername">
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="validationRoomKey">
            <Form.Control
              placeholder='Enter room key'
              aria-label='Enter room key to join room'
              required
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid room key.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' onClick={handleRoomJoin}>
            Join Room
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default JoinRoom;
