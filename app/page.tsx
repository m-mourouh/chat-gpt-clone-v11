"use client"
import HomePage from "@/components/HomePage";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { setChatId } from "@/redux/features/chat/chat";

export default function Home() {
    const dispatch = useAppDispatch();
      useEffect(() => {
        dispatch(setChatId(""));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 
  return <HomePage />;
}
