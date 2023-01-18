import { Socket } from "dgram";
import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import * as io from "socket.io-client";

// const socket = io.connect("http://localhost:3001");


type Message = { 

  message: string; 
  sent: boolean;
}

function Messages({ socket }: { socket: any }) {
  const [message, setMessage] = useState("");
  const [recieveMessage, setRecieveMessage] = useState("");
  

  // an array to display for sent and recieved messages

  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [recievedMessages, setRecievedMessages] = useState<string[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([])

  console.log("here", recievedMessages)

  // 
  function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      setSentMessages([...sentMessages, message]);
      // console.log("sent", sentMessages);
      socket.emit("send_message", { message });
      setAllMessages([...allMessages, {message: message, sent:true}])
      setMessage("");
    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data: any) => {
      // recievedMessages.push(data.message)
      // setRecievedMessages([...recievedMessages, data.message])
      setAllMessages([...allMessages, {message:data.message, sent:false}])

      // console.log(data.message)
      console.log("rm", recievedMessages);
      setRecieveMessage(data.message);
    });
  }, [socket, allMessages]);

  return (
    <>
      <div className="h-full w-3/4 bg-red-10 border-2 border-red-500 overflow-auto">
        <div className="container border shadow-md h-10 flex items-center">
          <label className="wotfard">Messages</label>
        </div>
        <div className="w-[74.9%] border-2 absolute bottom-0">
          <div
            // style={{ width: "100%", height: "100px" }}
            className= "w-full overflow-auto absolute bottom-[4rem] flex border-2 border-black"
          >
            <div
          className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 h-full w-3/4 overflow-scroll border-2 border-black"
        >
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {/* Map function */}

              {allMessages.map((item, index) => item.sent ? 

                     <div key={`message${index}`} className="col-start-1 col-end-8 p-3 rounded-lg">
                     <div className="flex flex-row items-center">
                       <div
                         className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                       >
                         A
                       </div>
                       <div
                         className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                       >
                         <div> 
                           {item.message}                   
                   </div>
                       </div>
                     </div>
                   </div>
                 
                 
                :
                <div key={`message${index}`} className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                  >
                    A
                  </div>
                  <div
                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                  >
                    <div>{item.message}</div>
                  </div>
                </div>
              </div>
              )}
     
                {/* <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div>
            */}
                
              
                    </div>
                    </div>
                    </div>
                    </div>
            {/* { */}
              {/* // <ul className="bg-red-200 w-4/4"> */}
                {/* // sentMessages.map((item) => ( */}
                  {/* // <li className="bg-red-200">{item}</li> */}
                {/* // ))} */}
              {/* </ul> */}
            
            {/* { */}
              {/* // <ul className="bg-blue-200 w-4/4"> */}
                {/* {recievedMessages.map((item) => ( */}
                  {/* <li className="bg-blue-200">{item}</li> */}
                {/* // ))} */}
              {/* </ul> */}
            {/* } */}
          </div>
          <div className="relative mt-1 rounded-md shadow-sm">
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
