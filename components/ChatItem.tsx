"use client"
import Link from "next/link";
import { LuMessageSquare } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
import { collection, deleteDoc, orderBy, query, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import AiAvatar from "@/public/images/chat.svg"
import { setLastQuestion } from "@/redux/features/chat/chat";
import { useAppDispatch } from "@/redux/hooks";
export default function ChatItem({ id }: ChatItemProps) {
  //______________________hooks________________
  const [isActive, setIsActive] = useState<boolean>();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch()
  const [messages, loading, error] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );
  useEffect(() => {
    if (!pathname) return;
    setIsActive(pathname.includes(id));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  
  //______________________functions________________

  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <li
      className={`flex items-center  justify-between  text-white hover:bg-[#2A2B32] py-3 px-3 ${
        isActive && "bg-[#2A2B32]"
      }`}
    >
      <span className="flex gap-2 items-center  ">
        <LuMessageSquare className="text-base" />
        <Link
          href={`/chat/${id}`}
          className="rounded-md cursor-pointer text-sm capitalize truncate w-[20ch]"
          title={
            messages?.docs[messages.docs.length - 1]?.data().question || "New chat"
          }
        >
          {loading ? (
              <span className="animate-pulse">Loading...</span>
          ) : (
            messages?.docs[messages.docs.length - 1]?.data().question || "New chat"
          )}
        </Link>
      </span>
      <button
        className="cursor-pointer text-slate-500 hover:text-white transition-all"
        title="Remove chat"
        onClick={deleteChat}
      >
        <GoTrash className="text-base" />
      </button>
    </li>
  );
}
