import http from 'http';
import express from 'express';
import cors from 'cors';
import { Socket, Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, SocketData, Tool, SocketSequence } from '../../models/index.js'
const app = express();
app.use(cors);
const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get("/", (req, res) => {
  res.send("MERN");
})

let connections = [];
let rooms = [];

// listens to events
io.on("connection", (socket) => {

  connections.push(socket);
  console.log("<<<--->>>WHY AM I HERE JUST TO SUFFER---");
  console.log('conn:', connections.length);
  console.log('rooms:', rooms.length);
  
  socket.on('eraseCanvas', () => {
    io.to('room1').emit('eraseCanvas');
  })

  socket.on('joinRoom', (userData: SocketData) => {
    if(rooms.indexOf(userData.roomId) !== -1) {
      socket.join(userData.roomId);
      socket.emit('joinCheck', (true));
    }
    else socket.emit('joinCheck', (false));
  })

  socket.on('createRoom', (userData: SocketData) => {
    socket.join(userData.roomId);
    rooms.push(userData.roomId);
  })

  socket.on('disconnect', (reason) => {
    console.log('user disconnected: ', socket.id);
    connections = connections.filter((con) => con.id != socket.id);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})