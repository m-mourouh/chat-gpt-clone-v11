"use client";
import { IoMdSend } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import data from "@/data/data.json";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMessageValue } from "@/redux/features/message/message";
import { FormEvent, useEffect, useState } from "react";
import properties from "@/data/properties.json";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
import { sendMessage } from "@/lib/api/api";
import { setIsLoading, setMessages } from "@/redux/features/chat/chat";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  id: string | null;
};
export default function Message({ id }: Props) {
  //_____________________hooks_____________________

  const messageValue = useAppSelector((state) => state.message.value);
  const isDisabled = useAppSelector((state) => state.message.isDisabled);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  //_____________________functions_____________________
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let message: string;
    message = e.target.value;
    dispatch(setMessageValue(message));
  };
  const notify = (text: string, delay: number) =>
    toast(text, {
      position: "top-center",
      autoClose: delay,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageValue) return;
    if (messageValue.trim().length > 0) {
      //messgae
      dispatch(setIsLoading(true));
      dispatch(setMessages(true));
      //sendMessage to api
      try {
        const answer = await sendMessage({ question: messageValue }); //take time
        // make message field empty
        dispatch(setMessageValue(""));
        // Show Some loading effect
        const message = {
          question: messageValue,
          answer: answer && answer?.data?.choices[0].content[0],
          links: answer && answer?.data?.links,
          code: answer && answer?.data?.code,
          createdAt: serverTimestamp(),
          user: {
            _id: session?.user?.email!,
            name: session?.user?.name!,
            avatar: session?.user?.image!,
          },
        };
        // create new Chat (Home Page)
        if (pathname === "/" && !id) {
          const doc = await addDoc(
            collection(db, "users", session?.user?.email!, "chats"),
            {
              userId: session?.user?.email,
              createdAt: serverTimestamp(),
            }
          );
          router.push(`/chat/${doc.id}`);
          await addDoc(
            collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              doc.id,
              "messages"
            ),
            message
          );
          dispatch(setIsLoading(false));
        }
        // Add new Message to current chat
        else {
          router.push(`/chat/${id}`);
          await addDoc(
            collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              id!,
              "messages"
            ),
            message
          );
          // redirect to the current chat page
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        console.log(error);
        notify("⁉️ Somthing went wrong!", 2000);
        notify("😉 we will fix this later", 4000);
      }
    }
  };
  //____________________JSX______________________________

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center bg-white dark:bg-chat-gray-user w-full md:md-screen h-28 fixed bottom-0 dark:border-t dark:border-t-slate-500 md:border-none">
        <div className="fixed bottom-0 pt-4 md:pb-0 md:bottom-0  px-3 md:mx-5 z-[9999999]   md:rounded-md ">
          <form
            className="flex justify-between items-center "
            onSubmit={handleSubmit}
          >
            <textarea
              cols={80}
              rows={1}
              name="message"
              placeholder={properties.FORM.input_placeholder}
              className="pr-14 no-scrollbar min-h-[10px] w-full py-3 mb-4 md:mb-0 border rounded-md text-gray-900  placeholder:text-gray-200  sm:text-sm sm:leading-6 outline-none resize-none px-3  dark:bg-chat-gray-ai dark:border-gray-700 dark:text-white"
              onChange={(e) => handleChange(e)}
              value={messageValue}
            />
            <button
              disabled={isDisabled}
              className="text-xl absolute right-5 mb-4 md:mb-0 bg-indigo-500 text-white p-2 disabled:bg-transparent disabled:shadow-none disabled:text-slate-300 rounded-md text-center shadow-sm"
            >
              <IoMdSend />
            </button>
          </form>
          <small className="text-slate-500  dark:text-slate-200 flex  items-center gap-1 justify-center mb-2 md:mb-0 md:mt-4 pb-2">
            <p>Built with</p>
            <AiOutlineHeart /> by{" "}
            <Link
              href={data.developer.github_link}
              className="underline"
              target="_blank"
            >
              {data.developer.name}
            </Link>
            <Link
              href={data.developer.v1}
              className="underline"
              target="_blank"
            >
              | version 1.0
            </Link>
          </small>
        </div>
      </div>
    </>
  );
}
