"use client";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosMenu } from "react-icons/io";
import { useAppDispatch } from "@/redux/hooks";
import { toggle } from "@/redux/features/sidebar/sidebar";
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function TopBar() {
  //___________hooks__________________________
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();


  // ________________Functions_____________________
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  //______________functions______________________
  const toggleSidebar = () => {
    dispatch(toggle());
  };

  return (
    <div className="w-full fixed top-0 z-10 flex items-center justify-between border-b border-white/20 bg-chat-gray-nav px-3 py-2 text-gray-200 sm:pl-3 md:hidden">
      <button
        className="text-3xl text-slate-300 hover:text-slate-400 transition-all"
        onClick={toggleSidebar}
      >
        <IoIosMenu />
      </button>
      {/* <span>
        <p>Nex chat</p>
      </span> */}
      <button
        className="text-2xl text-slate-300 hover:text-slate-400 transition-all"
        onClick={createNewChat}
      >
        <BiPlus />
      </button>
    </div>
  );
}
