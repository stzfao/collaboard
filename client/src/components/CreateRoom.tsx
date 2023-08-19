import * as React from 'react';
import { Form } from 'react-bootstrap';
import { Container, Row, Col, InputGroup, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { Copy } from 'react-feather';
import socketIO, { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../../models';
import { useNavigate } from 'react-router-dom';


interface ICreateRoomProps {
    uuidGen: () => string;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    setUser: (data: SocketData) => void;
}


const CreateRoom: React.FunctionComponent<ICreateRoomProps> = ({ uuidGen, socket, setUser }: ICreateRoomProps) => {
    const [roomId, setRoomId] = React.useState(uuidGen());
    const [username, setUsername] = React.useState('');

    const navigate = useNavigate();

    const handleCreateRoom = (e: any) => {
        e.preventDefault();

        // {name, roomId, userId, hsot, presenter}
        const roomData = {
            username,
            roomId,
            userId: uuidGen() + '__' + 'user',
            host: true,
            presenter: true
        }
        setUser(roomData);
        navigate(`/room/${roomId}`);
        socket.emit('userJoined', roomData);
        console.log(roomData);
    }

    return (
        <div className='CreateRoom'>
            <h2>Create a Room</h2>
            <Form >
                <Stack gap={3}>
                    <Form.Group controlId="validationCustomUsername">
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                                aria-describedby="AddUsername"
                                value={username}
                                onChange={(e) => {setUsername(e.target.value) }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                placeholder='Generate room key'
                                value={roomId}
                                disabled
                                aria-label='Generate room key with generate and copy buttons'
                            />
                            <Button variant="primary" onClick={() => setRoomId(uuidGen())}>Generate</Button>
                            <Button variant="outline-primary"><Copy /></Button>
                        </InputGroup>
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={handleCreateRoom}>
                        Generate Room
                    </Button>
                </Stack>
            </Form>
        </div>
    );
};

export default CreateRoom;
