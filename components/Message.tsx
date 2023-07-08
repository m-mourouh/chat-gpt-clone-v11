"use client";
import { IoMdSend } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import data from "@/data/data.json";
import Link from "next/link";
type MessageProps = {
  placeholder: string;
};
export default function Message({ placeholder }: MessageProps) {
  return (
    <div className="fixed bottom-0 pt-4 md:pb-0 md:bottom-4 px-3 md:mx-5 z-50 bg-slate-50 border-t md:border-none md:rounded-md md:bg-white">
      <form className="flex justify-between items-center  ">
        <textarea
          cols={80}
          rows={1}
          name="message"
          placeholder={placeholder}
          className="pr-14 no-scrollbar min-h-[10px] w-full py-3 mb-4 md:mb-0 border rounded-md text-gray-900  placeholder:text-gray-200  sm:text-sm sm:leading-6 outline-none resize-none px-3  "
        />
        <button
          type="submit"
          disabled={true}
          className="text-xl absolute right-5 mb-4 md:mb-0 bg-green-500 text-white p-2 disabled:bg-transparent disabled:shadow-none disabled:text-slate-300 rounded-md text-center shadow-sm"
        >
          <IoMdSend />
        </button>
      </form>
      <small className="text-slate-500 flex  items-center gap-1 justify-center mb-2 md:mb-0 md:mt-4">
        <p>Built with</p>
        <AiOutlineHeart /> by <Link href={data.developer.github_link} className="underline" target="_blank">{data.developer.name}</Link>
      </small>
    </div>
  );
}
