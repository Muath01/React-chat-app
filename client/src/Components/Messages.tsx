import React from 'react'
import {AiOutlineMessage} from "react-icons/ai"

function Messages() {
  return (
    <>
    <div className='h-full w-3/4 bg-red-10'>
    <label className='wotfard'>Messages</label>
    <div className='muaths bottom-30 absolute w-[75%] w-full bottom-0'>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm"><AiOutlineMessage size={15}/></span>
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 bg-gray-100"
          placeholder="Say hi..."
        />
       
       
      </div>
    </div>
    </div>
    </>
  )
}

export default Messages