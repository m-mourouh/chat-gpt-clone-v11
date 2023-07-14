"use client";
import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsClosed } from "@/redux/features/sidebar/sidebar";

export default function ToggleButton({ close }: ToggleButtonProps) {
  const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  const dispatch = useAppDispatch();
  // functions
  const toggleSidebar = () => {
    if(close === true ||  close === false) {
        dispatch(setIsClosed(close))
    }
  };
  return (
    <button
      className={`flex p-3 gap-3 transition-colors duration-200 dark:text-slate-200 ${
        isClosed ? "text-gray-500 border" : "text-white border-white/20"
      } cursor-pointer text-lg rounded-md border  hover:bg-gray-500/10 h-11 w-11 flex-shrink-0 items-center justify-center`}
      onClick={toggleSidebar}
      title={isClosed ? "Open" : " Hide sidebar"}
    >
      <MdOutlineSpaceDashboard />
    </button>
  );
}
