import React from "react";
import { FaAlipay, FaBeer, FaLaugh, FaUserFriends } from "react-icons/fa";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TbSocial } from "react-icons/tb";

function SideBar() {
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
      <h2 className="wotfard relative top-3 left-1">SideBar</h2>

      <ul className="text-xl my-10 flex flex-col">
        {sideBarItems.map((item, index) => (
          <li
            key={index}
            className="hover:bg-gray-100 hover:text-blue-600 rounded-lg w-100% flex items-center gap-1 cursor-pointer"
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
