import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaLaugh, FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import { setMessage, setReceiver } from "../Redux/message";
import Messages from "./Messages";
import { RootState } from "../Redux/store";
import { updateUser } from "../Redux/users";

type User = [
  {
    first_name: string;
    second_name: string;
    user_name: string;
  }
];

type RightBarProps = {
  socket: any;
};

function RightBar({ socket }: RightBarProps) {
  const [users, setUsers] = useState<User>();
  const [clickedUser, setClickUser] = useState("");

  // selectors

  const { username } = useSelector((state: any) => state.message);
  const { logged, receiver } = useSelector(
    (state: RootState) => state.loggedAndReceiver
  );

  const usersState = useSelector((state: RootState) => state.users);

  // const first_name = usersState.length > 0 ? usersState[0].first_name : "";
  // const second_name = usersState.length > 0 ? usersState[0].second_name : "";
  // const user_name = usersState.length > 0 ? usersState[0].user_name : "";
  // const user_id = usersState.length > 0 ? usersState[0].user_id : "";

  // useEffect(() => {}, [receiver]);

  const dispatch = useDispatch();

  // load users on the right side of the screen

  async function getUsers() {
    try {
      const url = "http://localhost:3001/users?logged=" + logged;
      const response = await fetch(url);
      const jsonResponse = await response.json();

      setUsers(jsonResponse);
      dispatch(updateUser(jsonResponse));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // get the messages on the database, between the logged in user, and the clicked receiver.

  async function getMessage(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault();
    const target = e.target as HTMLElement;

    await dispatch(setReceiver(target.innerText));

    try {
      // console.log("here", target.innerText);
      const url =
        "http://localhost:3001/loadChat?logged=" +
        logged +
        "&receiver=" +
        target.innerText;
      const response = await fetch(url);

      const jsonData = await response.json();
      dispatch(setMessage(jsonData));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function createChat(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: logged,
          receiver: target.innerText,
        }),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function fetchMessage(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLElement;

    e.preventDefault();

    try {
      const url = `http://localhost:3001/chats?user_name=` + receiver;
      const response = await fetch(url);
      const jsonResponse = await response.json();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);
  const sideBarItems = [
    {
      text: "Friends",
      icon: <FaUserFriends size={20} />,
    },
  ];

  return (
    <div className="list-none shadow-lg text-4xl h-full  muath w-full bg-white">
      <h2 className="wotfard relative top-3 left-1 text-orange-300">Users</h2>
      {/* <Messages socket={socket} /> */}

      <ul className="text-xl my-10 flex flex-col">
        {users != undefined &&
          users.length > 0 &&
          users.map((item, index) => (
            <li
              onClick={(e) => {
                const target = e.target as HTMLElement;

                getMessage(e);
                createChat(e);
                fetchMessage(e);
              }}
              key={index}
              className="hover:bg-gray-100 hover:text-blue-600 rounded-lg w-100% flex items-center gap-1 cursor-pointer caret-transparent shadow "
            >
              {" "}
              {item.user_name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RightBar;
