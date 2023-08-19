import http from 'http';
import express from 'express';
import cors from 'cors';
import { Socket, Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents, SocketData } from '../../models/index.js'
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

io.on("connection", (socket) => {
  // socket.emit("noArg");
  // socket.emit("basicEmit", 1, "2", Buffer.from([3]));
  // socket.emit("withAck", "4", (e) => {
  //   // e is inferred as number
  // });

  // // works when broadcast to all
  // io.emit("noArg");

  // // works when broadcasting to a room
  // io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));
  socket.on('userJoined', (data: SocketData) => {
    console.log('socketData', data);
    const {username, userId, roomId, host, presenter} = data;
    socket.join(roomId);
    socket.emit('userIsJoined', true);
  })
  console.log('user is connected!');
  console.log(socket.id); 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})