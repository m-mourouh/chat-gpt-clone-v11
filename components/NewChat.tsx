"use client";
import { BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react";

export default function NewChat() {
  // _______________Hooks______________________
  const router = useRouter();
  const {data: session} = useSession()
  
  // ________________Functions_____________________
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!,"chats"), 
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      }
    )
    router.push(`/chat/${doc.id}`)
    
  }; 

  // _________________JSX________________________
  return (
    <button
      className="flex p-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-lg rounded-md border border-white/20 hover:bg-gray-500/10 h-11 flex-shrink-0 flex-grow"
      onClick={createNewChat}
    >
      <BiPlus />
      <span className="text-sm">New chat</span>
    </button>
  );
}
