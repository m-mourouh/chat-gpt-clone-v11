"use client";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import ToggleButton from "./ToggleButton";
export default function SideBar() {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div className={`md:min-w-[260px] ${isClosed ? "md:min-w-[0px]" : ''}`}>
      <div
        className={`bg-chat-gray-900  h-screen md:w-[260px]  p-2 fixed top-0 -left-full md:left-0 bottom-0 z-[9999] transition duration-500  ${
          isClosed ? "-translate-x-full -left-full" : ''
        }`}
      >
        <div className="flex gap-2 ">
          <button className="flex p-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-lg rounded-md border border-white/20 hover:bg-gray-500/10 h-11 flex-shrink-0 flex-grow">
            <BiPlus />
            <span className="text-sm">New chat</span>
          </button>
          <ToggleButton close={true}/>
        </div>
      </div>
    </div>
  );
}
