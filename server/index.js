const express = require("express");

const app = express();
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  //   socket.on("join_room", (data) => {
  //     socket.leave(currentRoom);
  //     socket.join(currentRoom);
  //     // console.log("here")
  //   });

  socket.on("send_message", (data) => {
    data.id = socket.id;

    socket.broadcast.emit("recieve_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
