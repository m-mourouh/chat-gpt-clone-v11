"use client"
import React from 'react'
import { MdOutlineSpaceDashboard } from 'react-icons/md';

type ToggleButtonProps = {
    close: boolean
}

export default function ToggleButton({close}: ToggleButtonProps) {

    // functions
    const toggleSidebar = () => {

    }
  return (
    <button
      className="flex p-3 gap-3 transition-colors duration-200 text-white cursor-pointer text-lg rounded-md border border-white/20 hover:bg-gray-500/10 h-11 w-11 flex-shrink-0 items-center justify-center"
      onClick={toggleSidebar}
    >
      <MdOutlineSpaceDashboard />
    </button>
  );
}
