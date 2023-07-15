/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import AiAvatar from "@/public/images/chat.svg";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdOutlineContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { findImagesFromLinks } from "@/lib/helpers/helpers";

type Props = {
  text: string;
  links: string[];
  code: string;
};

export default function AiMessage({ text, links, code }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, 800);

      return () => clearTimeout(id);
    }
  }, [isCopied]);

  useEffect(() => {
      if (links.length > 0) {
        setImages(findImagesFromLinks(links));
      }
  }, [links]);
  //__________________function__________________________
  const copyText = (code: string) => {
    copy(code);
    setIsCopied(true);
  };
  return (
    <div className="w-full bg-gray-100 dark:bg-chat-gray-ai border-b dark:border-b-gray-700 flex justify-center">
      <div className="flex items-center gap-4  md:gap-5   px-3 py-5 w-full  md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl  ">
        <div className="min-w-[30px] min-h-[30px] bg-indigo-500 flex justify-center items-center rounded-sm self-start">
          <Image
            src={AiAvatar}
            alt="userName"
            height={25}
            width={25}
            className="object-cover"
          />
        </div>
        <div className="text-sm md:text-base text-left text-slate-800  dark:text-slate-300 overflow-x-scroll">
          {/* message text */}
          <div className="break-words break-before-all  ">
            {text ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            ) : (
              "Loading"
            )}
          </div>

          {/* code */}
          {code && (
            <div className="mt-4 relative">
              <div className="w-full bg-gray-900 text-white rounded-t-md flex px-5 py-1 justify-between border-b border-gray-800">
                <small className="">code</small>
                <button
                  className="text-white flex items-center gap-2 hover:text-gray-400 transition-all"
                  onClick={() => copyText(code)}
                >
                  {isCopied ? (
                    <>
                      <BsCheck2 className="text-md text-indigo-400" />
                      <small>copied!</small>
                    </>
                  ) : (
                    <>
                      <MdOutlineContentCopy className="text-md " />
                      <small>copy code</small>
                    </>
                  )}
                </button>
              </div>
              <SyntaxHighlighter
                lineProps={{
                  style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                }}
                wrapLines={true}
                wrapLongLines={true}
                style={materialDark}
                language="javascript"
                className=" rounded-b-md  overflow-x-scroll !m-0"
              >
                {code}
              </SyntaxHighlighter>
            </div>
          )}
          {/* links */}
          {links.length > 0 && (
            <>
              {/* images */}
              {images.length > 0 && (
                <div className="photo-grid-container gap-1 mt-5">
                  {images.splice(0, 12).map((src, idx) => (
                    <img
                      src={src}
                      alt="image"
                      className="object-cover rounded-md"
                      key={idx}
                    />
                  ))}
                </div>
              )}

              {/* <div className="mt-4">
                <p>Here are some useful links:</p>
                <ul className="list-disc text-sm ml-2 md:ml-5 leading-6">
                  {links.splice(0, 5).map((link, idx) => (
                    <li
                      key={idx}
                      className="truncate w-[30ch] md:w-[60ch] hover:text-slate-500"
                    >
                      <Link href={link} className="underline " target="_blank">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
