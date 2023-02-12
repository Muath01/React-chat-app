import React, { useState } from "react";
import { FaAlipay, FaBeer, FaLaugh, FaUserFriends } from "react-icons/fa";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

function SideBar() {
  const { logged } = useSelector((state: RootState) => state.loggedAndReceiver);
  const [modal, setModal] = useState<boolean>();
  const sideBarItems = [
    {
      text: "Add Friends",
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

  const usersState = useSelector((state: RootState) => state.users);

  function openModal() {
    console.log(usersState);
    setModal(true);
  }

  return (
    <div className="list-none shadow-lg text-4xl w-full h-full bg-white ">
      <div className="">
        <h2 className="wotfard  relative top-3 left-5 caret-transparent text-orange-400">
          {logged}
        </h2>
      </div>

      <ul className="text-xl my-10 flex flex-col caret-transparent">
        {sideBarItems.map((item, index) => (
          <li
            onClick={(e) => {
              const { innerText } = e.target as HTMLElement;

              if (innerText == "Add Friends") {
                openModal();
              }
            }}
            key={index}
            className="hover:bg-gray-100 hover:text-blue-600 rounded-lg w-100% flex items-center gap-1 cursor-pointer caret-transparent shadow"
          >
            {" "}
            {item.icon} {item.text}
          </li>
        ))}
      </ul>

      {/* modal */}
      {modal ? (
        <div
          className="relative z-20"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity "></div>

          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <div className="absolute transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  w-1/4 h-2/4 border-2 border-black">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start ">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 ">
                      {/* <!-- Heroicon name: outline/exclamation-triangle --> */}
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* friends */}

                {usersState.map((user) => (
                  <div className="px-4 py-3 sm:flex sm:px-6 mb-2 border-1 shadow-md bg-red-100">
                    <h2>{user.user_name}</h2>
                    <button
                      type="button"
                      className="absolute right-10 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add Friend
                    </button>
                  </div>
                ))}

                {/* Cancel */}
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 absolute bottom-0 right-0">
                  <button
                    onClick={(e) => setModal(false)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SideBar;
