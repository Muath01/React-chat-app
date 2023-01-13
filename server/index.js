const express = require('express');

const app = express();
const http = require("http");
const {Server} = require("socket.io")

const cors = require("cors");
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let currentRoom = "";

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id)

    socket.on("join_room", (data) => {
        socket.leave(currentRoom)
        currentRoom = data
        socket.join(currentRoom)
        // console.log("here")
    })
    
    socket.on("send_message", data => {
        socket.to(data.room).emit("recieve_message", data)
    })

})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})