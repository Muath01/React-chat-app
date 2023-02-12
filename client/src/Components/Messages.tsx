import { Socket } from "dgram";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as io from "socket.io-client";
import { setMessage, setReceiver, setMessageOnly } from "../Redux/message";
import { RootState } from "../Redux/store";

// const socket = io.connect("http://localhost:3001");

type MessageProps = {
  socket?: any;
};

type chat_id = {
  chat_id?: number;
  sender_id?: number;
  receiver_id?: number;
  chat?: string;
  timestamp?: string;
  status: "sent";
};

type Message = {
  "message": string;
  "sent"?: boolean;
  "sender"?: string | null;
  "receiver"?: string | null;
};

function Messages({ socket }: MessageProps) {
  const [recieveMessage, setRecieveMessage] = useState("");

  // an array to display for sent and recieved messages

  const [com, setCom] = useState<chat_id>();

  const dispatch = useDispatch();

  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [recievedMessages, setRecievedMessages] = useState<string[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  // const logged = localStorage.getItem("logged"); // The person that is logged in/also the sender
  // const reciever = localStorage.getItem("reciever"); // The person the is going to reciev the message(whenever you click on a diff user on the RightBar, this gets updated.)

  const { logged, receiver } = useSelector(
    (state: RootState) => state.loggedAndReceiver
  );
  const [message, setMessage] = useState("");
  // selector
  const { chat_id, sender_id, receiver_id, messages, timestamp, status } =
    useSelector((state: RootState) => state.message);

  // console.log("messages: ", messages);
  useEffect(() => {
    // console.log("useEffect:", socket.id);
    socket.on("receive_message", (data: any) => {
      // console.log("data: ", data);
    });
    // return () => {
    // socket.off("receive_message");
    // };
  }, [socket]);

  async function saveMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    const { value: messageInput } = e.target as HTMLInputElement;

    // if (messages != null) {
    // console.log("here first");
    const newMessage = {
      sender: logged,
      message: messageInput,
      receiver: receiver,
    };

    dispatch(setMessageOnly(newMessage));
    // }

    // messages?.push(newMessage);

    // messages?.push(newMessage);
    // console.log("from this: ", messageInput);
    // dispatch(setMessage({}));

    socket.emit("send_message", { message: messageInput, id: socket.id });

    if (e.key == "Enter") {
      try {
        setAllMessages([
          {
            message: message,
            sender: logged,
          },
        ]);
        const body = {
          "messages": [
            {
              "message": message,
              "sender": logged,
              "receiver": receiver,
            },
          ],
          "logged": logged,
        };
        const result = await fetch("http://localhost:3001/chat", {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(body),
        });
        setMessage("");
      } catch (error: any) {
        console.log("error", error.message);
      }
    }
  }

  // scroll into view

  const messagesEndRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="h-full  bg-red-10 w-full relative flex flex-col">
        <div className="shadow-md flex items-center w-full h-20 absolute z-10 bg-white">
          <label className="wotfard">Messages</label>
        </div>
        {receiver ? (
          <div
            className="relative h-full"
            style={{
              maxHeight: "86vh",
            }}
          >
            {/* <div className="w-full absolute bottom-0 border-2 border-black bg-green-400"> */}
            <div
              className="scroll-bar w-full flex flex-col bottom-0 h-full"
              style={{
                maxHeight: "100vh",
              }}
            >
              <div className="flex flex-col flex-auto bg-gray-100 p-3 overflow-auto  ">
                <div className="flex flex-col h-full overflow-x-auto mb-4 overflow-auto">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {/* Map function */}

                      {messages &&
                        messages!.map((item, index) =>
                          item.sender == logged ? (
                            <div
                              key={`message${index}`}
                              className="col-start-1 col-end-8 p-3 rounded-lg "
                            >
                              <div className="flex flex-row items-center ">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 caret-transparent">
                                  S
                                </div>
                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl caret-transparent">
                                  <div>{item.message}</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={`message${index}`}
                              className="col-start-6 col-end-13 p-3 rounded-lg"
                            >
                              <div className="flex items-center justify-start flex-row-reverse ">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 caret-transparent">
                                  R
                                </div>
                                <div className="relative mr-3 text-sm bg-slate-500 py-2 px-4 shadow rounded-xl caret-transparent">
                                  <div>{item.message}</div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      <div
                        className="caret-transparent"
                        ref={messagesEndRef}
                      ></div>

                      {/* end of map */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative border border-white shadow-sm ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 border-3 ">
                  <span className="text-gray-500 sm:text-sm">
                    <AiOutlineMessage size={15} />
                  </span>
                </div>
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      saveMessage(e);
                    }
                  }}
                  value={message}
                  type="text"
                  className="block w-full pl-7 pr-12  sm:text-sm h-10 bg-gray-100 p-2 focus:outline-none"
                  placeholder="Say hi..."
                />
              </div>
            </div>

            {/* </div> */}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Messages;
