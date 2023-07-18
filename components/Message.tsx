"use client";
import { IoMdSend } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import data from "@/data/data.json";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDisabled, setMessageValue, setLimited } from "@/redux/features/message/message";
import { FormEvent, useState, useEffect } from "react";
import properties from "@/data/properties.json";
import {
  addDoc,
  collection,
  serverTimestamp,
  increment,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
import { sendMessage } from "@/lib/api/api";
import { setIsLoading, setMessages } from "@/redux/features/chat/chat";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showModal } from "@/redux/features/dialog/dialog";

type Props = {
  id: string | null;
};
export default function Message({ id }: Props) {
  //_____________________hooks_____________________

  const messageValue = useAppSelector((state) => state.message.value);
  const isDisabled = useAppSelector((state) => state.message.isDisabled);
  const limited = useAppSelector((state) => state.message.limited);
    const isClosed = useAppSelector((state) => state.sideBar.isClosed);
  const [isLimited,setIsLimited] = useState(false)
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
      const isLocalLimited = localStorage.getItem("limited");
      if(isLocalLimited === "true"){
          setIsLimited(true)
      }
  },[])
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
    if(isLimited || limited) {
       dispatch(
         showModal({
           title: "Message",
           message: "You reached the limit. You can only ask 5 questions 😉",
         })
       );
      return;
    }
    if (!messageValue) return;
    if (messageValue.trim().length > 0) {
      // check if user reached the limit
      const userDocRef = doc(db, "users", session?.user?.email!);
      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          if (userDocSnapshot.data()?.value >= +process.env.NEXT_PUBLIC_MAX_LIMIT!){
            dispatch(setDisabled()); // disable the sed button
            dispatch(setLimited()); 
            dispatch(setMessageValue(""))
             dispatch(
               showModal({
                 title: "Message",
                 message:
                   "You reached the limit. You can only ask 5 questions 😉",
               })
             );
            dispatch(setIsLoading(false));
            return;
          }
        }
      } catch (err) {
        console.error("Error retrieving user document:", err);
      }

      // ________________________________
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
          const userDocRef = doc(db, "users", session?.user?.email!);

          try {
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
              await updateDoc(doc(db, "users", session?.user?.email!), {
                value: increment(1),
              });
            } else {
              await setDoc(doc(db, "users", session?.user?.email!), {
                value: 1,
              });
            }
          } catch (err) {
            console.error("Error retrieving user document:", err);
          }

          const docc = await addDoc(
            collection(db, "users", session?.user?.email!, "chats"),
            {
              userId: session?.user?.email,
              createdAt: serverTimestamp(),
            }
          );

          router.push(`/chat/${docc.id}`);
          await addDoc(
            collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              docc.id,
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
          // updating
          await updateDoc(doc(db, "users", session?.user?.email!), {
            value: increment(1),
          });

          // redirect to the current chat page
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        console.log(error);
        notify("⁉️ Somthing went wrong!", 3500);
        notify("😉 we will fix this later", 4000);
      }
    }
  };
  //____________________JSX______________________________

  return (
    <>
      <ToastContainer />
      <div className={`flex justify-center bg-white dark:bg-chat-gray-user w-full ${!isClosed ? "md:md-screen" : ""} h-28 fixed bottom-0 dark:border-t dark:border-t-slate-500 md:border-none`}>
        <div className="fixed bottom-0 pt-4 md:pb-0 md:bottom-0  px-3 md:mx-5 z-[9999999]   md:rounded-md ">
          <form
            className="flex justify-between items-center "
            onSubmit={handleSubmit}
          >
            <textarea
              cols={80}
              rows={1}
              name="message"
              disabled={limited || isLimited ? true : false}
              placeholder={
                limited || isLimited
                  ? "You can ask only 5 questions"
                  : properties.FORM.input_placeholder
              }
              className="pr-14 no-scrollbar min-h-[10px] w-full py-3 mb-4 md:mb-0 border rounded-md text-gray-900  dark:placeholder:text-gray-200 disabled:dark:placeholder:text-red-200  text-sm sm:leading-6 outline-none resize-none px-3  dark:bg-chat-gray-ai dark:border-gray-700 dark:text-white placeholder:text-slate-700 disabled:placeholder:text-red-400 "
              onChange={(e) => handleChange(e)}
              value={messageValue}
            />
            <button
              disabled={isDisabled || limited || isLimited}
              title={limited || isLimited ? "You can ask only 5 questions" : ""}
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
