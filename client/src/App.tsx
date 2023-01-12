import React, { useState, useEffect } from 'react';
import "./App.css"
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {

  const [message, setMessage] = useState("")
  const [messageRecieved, setMessageRecieved] = useState("");

  function sendMessage(){
    socket.emit("send_message", {message:message})

  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message)
    })
  }, [socket])
 
  return (
    <div>
      <input value={message} onChange={e => setMessage(e.target.value)}  placeholder='message'/>
      <button onClick={sendMessage}>Send message</button>
      <h2>{messageRecieved}</h2>
    </div>
  );
}

export default App;