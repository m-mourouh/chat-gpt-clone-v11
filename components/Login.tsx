"use client"
import Image from "next/image";
import AiAvatar from "@/public/images/chat.svg";
import { signIn } from "next-auth/react"
export default function Login() {

  //_________________functions________________
  const handleClick = () => {
    signIn('google') // sign in with google
  }

  return (
    <div className="bg-white dark:bg-gray-900 h-screen w-full flex flex-col  items-center justify-center ">
      <button className=" flex items-center  justify-center px-5 py-3 bg-indigo-500 shadow-sm rounded-md gap-2 text-white w-[200px] hover:bg-indigo-600 transition-all" onClick={handleClick}>
        <Image
          src={AiAvatar}
          width={25}
          height={25}
          alt="chat gpt"
          className=""
        />
        <p>Login</p>
      </button>
      <small className="text-slate-600 dark:text-white mt-5 text-base">
        Please login to use this APP
      </small>
    </div>
  );
}
