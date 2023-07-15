/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import DefaultUserPicture from "@/public/images/default.png";
import Theme from "./Theme";
import { signOut, useSession } from "next-auth/react";

export default function User() {
  const { data: session} = useSession()

  return (
    <div className="flex flex-col mt-5">
      <span className="flex items-center gap-2 flex-col cursor-pointer">
        <img
          src={session?.user?.image || DefaultUserPicture.src}
          alt={session?.user?.name! || "username"}
          className="rounded-full object-cover h-12 w-12"
        />
        <p className="text-white text-sm uppercase ">
          {session?.user?.name?.split("") || "username"}
        </p>
        <button className="text-white bg-chat-gray-user px-4 py-2 rounded-md text-sm hover:bg-indigo-500 transition-all" title="logout" onClick={() => signOut()}>
          Logout
        </button>
      </span>
      <Theme />
    </div>
  );
}
