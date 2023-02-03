import React from "react";
import { FaAlipay, FaBeer, FaLaugh, FaUserFriends } from "react-icons/fa";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

function SideBar() {
  const { logged } = useSelector((state: RootState) => state.loggedAndReceiver);
  const sideBarItems = [
    {
      text: "Friends",
      icon: <FaUserFriends size={20} />,
    },

    {
      text: "Groups",
      icon: <MdGroups size={20} />,
    },

    {
      text: "Socials",
      icon: <TbSocial size={20} />,
    },

    {
      text: "Emoji",
      icon: <FaLaugh size={20} />,
    },
  ];

  return (
    <div className="list-none shadow-lg text-4xl w-full h-full my-1 muath">
      <h2 className="wotfard relative top-3 left-5 caret-transparent">
        {logged}
      </h2>

      <ul className="text-xl my-10 flex flex-col caret-transparent">
        {sideBarItems.map((item, index) => (
          <li
            key={index}
            className="hover:bg-gray-100 hover:text-blue-600 rounded-lg w-100% flex items-center gap-1 cursor-pointer caret-transparent"
          >
            {" "}
            {item.icon} {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
