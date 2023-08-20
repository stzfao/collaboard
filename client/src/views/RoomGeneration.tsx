import * as React from 'react';
import { JoinRoom, CreateRoom, Header } from '../components';
import { Badge, Row, Col } from 'react-bootstrap';
import socketIO, { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../../models';

interface IRoomGenerationProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  setUser: (data: SocketData) => void;
}

const RoomGeneration: React.FunctionComponent<IRoomGenerationProps> = ({socket, setUser}: IRoomGenerationProps) => {
  
  const uuidGen: () => string = (): string => {
    // source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
    let dt = new Date().getTime();
    let uuid = 'xxx-xxx-xxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  
  return (
    <div className='About'>
      <Row>
        <Col>
          <CreateRoom uuidGen={uuidGen} socket={socket} setUser={setUser}/>
        </Col>
        <Col>
          <JoinRoom uuidGen={uuidGen} socket={socket} setUser={setUser}/>
        </Col>
      </Row>
    </div>
  );
};

export default RoomGeneration;
