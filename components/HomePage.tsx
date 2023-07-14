import { useAppSelector } from "@/redux/hooks";
import Intro from "./Intro";
import Message from "./Message";
export default function Home() {
  // ________________hooks________________
 
  return (
    <main className="relative w-full  md:md-screen">
      <Intro chatID={null} />
      <Message id={null} />
    </main>
  );
}
