/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import DefaultUserPicture from "@/public/images/default.png"
import { useSession } from "next-auth/react"

type Props = {
  text: string
}
export default function UserMessage({text}: Props) {
  const {data: session} = useSession()

  return (
    <div className="w-full bg-white dark:bg-chat-gray-user border-b dark:border-b-gray-700 flex justify-center first-of-type:mt-12 md:first-of-type:mt-0">
      <div className="flex items-center gap-3  md:gap-5   px-3 py-5 w-full  md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl ">
        <div className=" min-w-[30px] min-h-[30px]  flex justify-center items-center rounded-sm self-start">
          <img
            src={session?.user?.image || DefaultUserPicture.src}
            alt="userName"
            className="object-cover h-7 w-7 "
          />
        </div>
        <div className="text-sm md:text-base text-left text-slate-800  dark:text-gray-300 ">
          <p className="break-words">{text}</p>
        </div>
      </div>
    </div>
  );
}
