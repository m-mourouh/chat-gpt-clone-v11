import React from 'react'
import { BiPlus } from 'react-icons/bi';
import { IoIosMenu } from 'react-icons/io';

export default function TopBar() {
  return (
    <div className="w-full fixed top-0 z-10 flex items-center justify-between border-b border-white/20 bg-chat-gray-nav px-3 py-2 text-gray-200 sm:pl-3 md:hidden">
      <button className="text-3xl text-slate-300 hover:text-slate-400 transition-all">
        <IoIosMenu />
      </button>
      <span>
        <p>Nex chat</p>
      </span>
      <button className="text-2xl text-slate-300 hover:text-slate-400 transition-all">
        <BiPlus />
      </button>
    </div>
  );
}
