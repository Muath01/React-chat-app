
import React from 'react'
import { FaAlipay, FaBeer, FaLaugh, FaUserFriends } from 'react-icons/fa';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo} from 'react-icons/fa';
import { MdGroups } from "react-icons/md";
import { TbSocial } from "react-icons/tb";


function SideBar() {

    const sideBarItems = [
        {
            text: "Friends",
            icon: <FaUserFriends size={20}/>
        },
        
        {
            text: "Groups",
            icon: <MdGroups size={20}/>
        },

        {
            text: "Socials",
            icon: <TbSocial size={20}/>
        },

        {
            text: "Emoji",
            icon: <FaLaugh size={20}/>
        },

    ]

  return (

    <div className='list-none shadow-lg text-4xl w-1/4 h-full my-1 muath'>
    <h2 className='wotfard relative top-3 left-1'>SideBar</h2>

    <ul className='text-xl my-10 shadow-md flex flex-col overflow-hidden'>
            {sideBarItems.map((item) => (
                <>
                    <li className='shadow-sm w-full flex items-center gap-1 hover:bg-gray-50'> {item.icon} {item.text}</li>

                </>
            ))}
        </ul>
    </div>
  )
}

export default SideBar