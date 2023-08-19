import * as React from 'react';
import { JoinRoom, CreateRoom, Header } from '../components';
import { Badge, Row, Col } from 'react-bootstrap';
import socketIO, { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../../models';

interface IRoomGenerationProps {
  uuidGen: () => string;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  setUser: (data: SocketData) => void;
}

const RoomGeneration: React.FunctionComponent<IRoomGenerationProps> = ({uuidGen, socket, setUser}: IRoomGenerationProps) => {
  return (
    <div className='About'>
      <Row>
        <Col>
          <CreateRoom uuidGen={uuidGen} socket={socket} setUser={setUser}/>
        </Col>
        <Col>
          <JoinRoom />
        </Col>
      </Row>
    </div>
  );
};

export default RoomGeneration;
