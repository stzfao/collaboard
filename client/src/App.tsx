import React from 'react';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { JoinRoom, CreateRoom, Header } from './components';
import { Landing, Room, RoomGeneration, About } from './views'
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import SocketIO, { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../models'

const webServer = "http://localhost:5000"

function App() {

  const socket0: Socket<ServerToClientEvents, ClientToServerEvents> = SocketIO();
  const [user, setUser] = React.useState<SocketData>();
  const connectionOptions = {
    forceNew: true,
    reconnectionAttempts: 1000,
    timeout: 1000,
    transports: ['websocket'],
  }
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(webServer, connectionOptions);

  React.useEffect(() => {
    console.log("hello!!");
    socket.on('userIsJoined', (success: boolean) => {
      if(success) console.log('joined!! :D');
      else console.log('joining error :((');
    })
  }, []);



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
    <div>
      <Header />
      <Routes>
        <Route path="/" Component={Landing} />
        {/* <Route path="/generate_room" Component={RoomGeneration} uuidGen={uuidGen}/> */}
        <Route path="/generate_room" element={<RoomGeneration
          uuidGen={uuidGen}
          socket={socket}
          setUser={setUser}
        />} />
        <Route path="/room/:roomId" Component={Room} />
        <Route path="#about" Component={About} />
      </Routes>
    </div>
  );
}

export default App;
