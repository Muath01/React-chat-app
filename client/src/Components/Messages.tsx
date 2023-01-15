import { Socket } from "dgram";
import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import * as io from "socket.io-client";

// const socket = io.connect("http://localhost:3001");

function Messages({ socket }: { socket: any }) {
  const [message, setMessage] = useState("");
  const [recieveMessage, setRecieveMessage] = useState("");

  // an array to display for sent and recieved messages

  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [recievedMessages, setRecievedMessages] = useState<string[]>([]);

  function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      setSentMessages([...sentMessages, message]);
      // console.log("sent", sentMessages);
      socket.emit("send_message", { message });
      setMessage("");
    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data: any) => {
      setRecievedMessages([...recievedMessages, data.message]);
      console.log("rm", recievedMessages);
      setRecieveMessage(data.message);
    });
  }, [socket]);

  return (
    <>
      <div className="h-full w-3/4 bg-red-10">
        <div className="container border shadow-md h-10 flex items-center">
          <label className="wotfard">Messages</label>
        </div>
        <div className="w-[74.9%] bottom-30 absolute w-[75%] w-full bottom-0">
          <div
            style={{ width: "100%", height: "100px" }}
            className="bg-pink-300 overflow-auto"
          >
            {
              <ul className="right-0 border-2 broder-black">
                {sentMessages.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            }
            {
              <ul className="border border-black absolute right-0 bg-black w-1/4 bg-pink-300">
                {recievedMessages.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            }
          </div>
          <div className="border-2 border-black relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">
                <AiOutlineMessage size={15} />
              </span>
            </div>
            <input
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => sendMessage(e)}
              value={message}
              type="text"
              className="block w-full rounded-md border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-gray-100"
              placeholder="Say hi..."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
