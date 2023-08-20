import React from 'react';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { JoinRoom, CreateRoom, Header } from './components';
import { Landing, Room, RoomGeneration, About } from './views'
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import SocketIO, { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents, SocketData, Tool, SocketSequence } from '../../models'

const webServer = "http://localhost:5000"

function App() {
  const [user, setUser] = React.useState<SocketData>();
  const [elements, setElements] = React.useState<Tool[]>([]);
  const canvasRef = React.useRef<any>(null);
  const ctxRef = React.useRef<any>(null);
  const connectionOptions = {
    forceNew: true,
    reconnectionAttempts: 1000,
    timeout: 1000,
    upgrade: false,
    transports: ['websocket'],
  }
  // responds back to the server!
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(webServer, connectionOptions);

  React.useEffect(() => {
    console.log('how many times am i here');
    socket.once('connect', () => {
      console.log('connected to server on: ', socket.id);
    })

    socket.on('eraseCanvas', () => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setElements([]);
    })

    socket.on('disconnect', () => {
      console.log('disconnected from server on: ', socket.id);
    })
    // return () => {
    //   socket.disconnect();
    // }
  }, []);


  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/room" element={<RoomGeneration socket={socket} setUser={setUser} />} />
        <Route path="/room/:roomId" element={<Room elements={elements} setElements={setElements} user={user!} socket={socket} />} />
        <Route path="#about" Component={About} />
      </Routes>
    </div>
  );
}

export default App;
