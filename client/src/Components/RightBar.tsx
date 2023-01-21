import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaLaugh, FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import { setMessage } from "../Redux/message";

type User = [
  {
    first_name: string;
    second_name: string;
    user_name: string;
  }
];

function RightBar() {
  const [users, setUsers] = useState<User>();
  const [clickedUser, setClickUser] = useState("");

  // selectors

  const { username } = useSelector((state: any) => state.message);
  const [currentUsername, setCurrentUsername] = useState(username);

  useEffect(() => {
    setCurrentUsername(username);
  }, [username]);

  const dispatch = useDispatch();

  async function getUsers() {
    try {
      const url =
        "http://localhost:3001/users?logged=" + localStorage.getItem("logged");
      const response = await fetch(url);
      const jsonResponse = await response.json();

      setUsers(jsonResponse);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: localStorage.getItem("logged"),
          reciever: target.innerText,
        }),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function fetchMessage(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    // const usernam

    // console.log(target.innerText);
    // console.log("message => ", chat);
    // console.log("current-message => ", currentMessage);

    dispatch(setMessage(target.innerText));

    e.preventDefault();

    try {
      const url = `http://localhost:3001/chats?user_name=` + target.innerText;
      const response = await fetch(url);
      console.log(response);
      const jsonResponse = await response.json();

      console.log("JSON", jsonResponse);
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
    <div className="list-none shadow-lg text-4xl h-full my-1 muath w-full">
      <h2 className="wotfard relative top-3 left-1">Users</h2>

      <ul className="text-xl my-10 flex flex-col ">
        {users != undefined &&
          users.length > 0 &&
          users.map((item, index) => (
            <li
              onClick={(e) => {
                createChat(e);
                fetchMessage(e);
              }}
              key={index}
              className="hover:bg-gray-100 hover:text-blue-600 rounded-lg w-100% flex items-center gap-1 cursor-pointer"
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
