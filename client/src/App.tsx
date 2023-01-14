import React, { useState, useEffect } from 'react';
import "./App.css"
import * as io from "socket.io-client";
import SideBar from './Components/SideBar';
import Messages from './Components/Messages';
const socket = io.connect("http://localhost:3001");

function App() {

  const [message, setMessage] = useState("")
  const [messageRecieved, setMessageRecieved] = useState("");
  const [room, setRoom] = useState("");

  function sendMessage(){
    socket.emit("send_message", {message, room})
    setRoom(room)

  }

  function chooseRoom(){
    if(room != ""){
      socket.emit("join_room", room)

    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message)
    })
  }, [socket])
 
  return (
    <div className='body overflow-hidden '>

        <SideBar/>

        <Messages />



    </div>
  );
}

// {/* <h1 className='text-3xl font-bold underline'>My App</h1> */}




// {/* <input value={message} onChange={e => setMessage(e.target.value)}  placeholder='message'/>
// <button onClick={sendMessage}>Send message</button>
// <input value={room} onChange={e => setRoom(e.target.value)}  placeholder='room'/>
// <button onClick={chooseRoom}>Join Room</button>
// <h2>Message: {messageRecieved}</h2> */}
export default App;