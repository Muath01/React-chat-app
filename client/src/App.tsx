import React, { useState, useEffect } from "react";
import "./App.css";
import * as io from "socket.io-client";
import SideBar from "./Components/SideBar";
import Messages from "./Components/Messages";
import RightBar from "./Components/RightBar";
import Login from "./Components/Login";
import { useSelector } from "react-redux";
const socket = io.connect("http://localhost:3001");

function App() {
  const [loginSucceful, setLoginSucceful] = useState(false);
  // const [message, setMessage] = useState("");
  // const [messageRecieved, setMessageRecieved] = useState("");
  // const [room, setRoom] = useState("");

  // function sendMessage() {
  //   socket.emit("send_message", { message, room });
  //   setRoom(room);
  // }

  // function chooseRoom() {
  //   if (room != "") {
  //     socket.emit("join_room", room);
  //   }
  // }

  // useEffect(() => {
  //   socket.on("recieve_message", (data) => {
  //     setMessageRecieved(data.message);
  //   });
  // }, [socket]);

  useEffect(() => {
    localStorage.setItem("logged", JSON.stringify("hello"));
    console.log("hello there buddy");
  }, []);
  console.log(loginSucceful);
  if (!loginSucceful) {
    console.log("heresfdsdf");
    localStorage.clear();
    // localStorage.setItem("user", "hello");
  }

  const { chat } = useSelector((state: any) => state.message);

  return (
    <div className="h-full">
      {!loginSucceful ? (
        <Login setLoginSucceful={setLoginSucceful} />
      ) : (
        <div className="grid grid-cols-12  h-full">
          <div className="col-span-3">
            <SideBar />
          </div>

          <div className="col-span-6 w-full">
            <Messages socket={socket} />
          </div>

          <div className="col-span-3">
            <RightBar />
          </div>
        </div>
      )}
    </div>
  );
}

// {/* <h1 className='text-3xl font-bold underline'>My App</h1> */}

export default App;

{
  /* <input
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="message"
/>
<button onClick={sendMessage}>Send message</button>
<input
  value={room}
  onChange={(e) => setRoom(e.target.value)}
  placeholder="room"
  className="border"
/>
<button onClick={chooseRoom}>Join Room</button>
<h2>Message: {messageRecieved}</h2> */
}
