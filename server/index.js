const express = require("express");
const pool = require("./SQL/db");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { json } = require("express");
app.use(cors());

const server = http.createServer(app);

//middleware

app.use(express.json()); //req.body

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"],
    },
});

// Post

// create a new user/account

app.post("/new", async (req, res) => {
    try {
        //
        // console.log("first-timer", req.body);

        // check if user name exists

        const userExist = await pool.query(
            "SELECT * FROM super_user WHERE user_name = $1 OR user_email = $2",
            [req.body.userName, req.body.email]
        );
        // console.log("mamamamamamrows", userExist.rows);

        if (userExist.rows.length > 0) {
            console.log("user Exist");
            return res.send("User Exist");
        }

        // console.log("exist: ", userExist);
        // console.log("body", req.body);
        const query = pool.query(
            "INSERT INTO super_user (user_email, user_name, password) VALUES ($1, $2, $3)",
            [req.body.email, req.body.userName, req.body.password]
        );
    } catch (error) {
        console.log(error.message.detail);
    }
});

app.post("/add", async (req, res) => {
    try {
        console.log(req.body);
        const { first_name, second_name, user_name, password } = req.body;
        const user = await pool.query(
            "INSERT INTO super_user (first_name, second_name, user_name, password) VALUES($1, $2, $3, $4) RETURNING *",
            [first_name, second_name, user_name, password]
        );

        res.json(user.rows[0]);
    } catch (err) {
        res.send("You can't");
        console.error(err.message);
    }
});

app.post("/login", async (req, res) => {
    let status;

    try {
        // console.log(req.body);
        const { userName, password } = req.body;
        userPass = await pool.query(
            "SELECT password FROM super_user WHERE user_name = $1 ",
            [userName]
        );

        if (userPass.rows[0] && password == userPass.rows[0].password) {
            status = "success";
            // console.log("succefull login");
        } else {
            status = "fail";
            // console.log("Wrong password");
        }

        res.json(status);
    } catch (err) {
        console.log(err.message);
    }
});

app.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        //does chat exist?

        // console.log(req.body);

        const values = [req.body.sender, req.body.receiver];

        const sender_id = await pool.query(
            "SELECT user_id FROM super_user WHERE user_name = $1",
            [req.body.sender]
        );
        const receiver_id = await pool.query(
            "SELECT user_id FROM super_user WHERE user_name = $1",
            [req.body.receiver]
        );

        const chatExist = await pool.query(
            "SELECT * FROM chats WHERE (sender_id = $1 OR sender_id = $2) AND (receiver_id = $2 OR receiver_id = $1)",
            [sender_id.rows[0].user_id, receiver_id.rows[0].user_id]
        );

        if (chatExist.rows.length > 0) {
            console.log("Chat exist");
            return res.send("Chat Already Exist");
        }

        const createChat = await pool.query(
            "INSERT INTO chats (sender_id, receiver_id) VALUES ($1, $2) RETURNING *",
            [sender_id.rows[0].user_id, receiver_id.rows[0].user_id]
        );
        // console.log("here", createChat.rows);

        res.json(createChat);
    } catch (error) {
        console.log("this error", error.message);
    }
});

app.get("/users", async (req, res) => {
    try {
        console.log("body", req.query.logged);
        users = await pool.query(
            "SELECT * FROM super_user WHERE user_name != $1",
            [req.query.logged]
        );

        res.json(users.rows);
        // console.log("body", req.body);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/loadChat", async (req, res) => {
    try {
        const sender_id = await pool.query(
            "SELECT user_id FROM super_user WHERE user_name = $1",
            [req.query.logged]
        );
        const receiver_id = await pool.query(
            "SELECT user_id FROM super_user WHERE user_name = $1",
            [req.query.receiver]
        );

        // console.log("sender-id: ", sender_id.rows[0].user_id);
        // console.log("receiver_id: ", receiver_id.rows[0].user_id);

        chat = await pool.query(
            "SELECT * FROM chats WHERE (sender_id = $1 OR sender_id = $2) AND (receiver_id = $1 OR receiver_id = $2)",
            [sender_id.rows[0].user_id, receiver_id.rows[0].user_id]
        );

        res.json(chat.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/chats", async (req, res) => {
    try {
        sender_id = await pool.query(
            "SELECT user_id FROM super_user WHERE user_name = $1",
            [req.query.user_name]
        );

        chat = pool.query("Select * FROM chats WHERE sender_id = $1", [
            sender_id.rows[0].user_id,
        ]);

        res.json(chat);
    } catch (error) {
        console.log(error.message);
    }
});

// Put requests

// gets the individual chats
app.put("/chat", async (req, res) => {
    try {
        const lastMessage = req.body.messages[req.body.messages.length - 1];

        const sender_id = await pool.query(
            "SELECT user_id FROM super_user WHERE user_name = $1",
            [lastMessage.sender]
        );

        const receiver_id = await pool.query(
            "SELECT user_id FROM super_user WHERE user_name = $1",
            [lastMessage.receiver]
        );

        let JSONData = JSON.stringify(req.body.messages);
        // console.log(JSONData);

        // console.log("sender-id: ", sender_id.rows[0].user_id);
        // console.log("receiver_id: ", receiver_id.rows[0].user_id);

        const query = await pool.query(
            // "UPDATE chats SET messages = messages || $1 WHERE sender_id = $2 AND receiver_id = $3",
            "UPDATE chats SET messages = COALESCE(messages || $1, $1) WHERE (sender_id = $2 OR sender_id = $3) AND (receiver_id = $2 OR receiver_id = $3)",
            [JSONData, sender_id.rows[0].user_id, receiver_id.rows[0].user_id]
        );
        res.sendStatus(201);
    } catch (error) {
        console.log("from this", error.message);
    }
});

// Socket io.

io.on("connection", (socket) => {
    // console.log("User connected: ", socket.id);

    //   socket.on("join_room", (data) => {
    //     socket.leave(currentRoom);
    //     socket.join(currentRoom);
    //     // console.log("here")
    //   });
    console.log("user connect");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    let eventEmitted = false;

    socket.on("send_message", (data) => {
        data.id = socket.id;
        // console.log(socket.id);
        // console.log(data);
        if (!eventEmitted) {
            console.log("data: ", socket.id);
            socket.emit("receive_message", data);
            // socket.broadcast.emit(data);
            eventEmitted = false;
        }
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING on Port 3001");
});
