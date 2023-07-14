import ChatItem from "./ChatItem"
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";

export default function ChatItems() {
  const { data: session } = useSession()
  const [chats, loading, error] = useCollection(session && collection(db,"users",session.user?.email!,"chats"));
  return (
    <ul className="flex flex-col mt-4 gap-2">
      {chats?.docs.map((chat) => (
        <ChatItem  key={chat.id}  id={chat.id}/>
      ))}
    </ul>
  );
}

