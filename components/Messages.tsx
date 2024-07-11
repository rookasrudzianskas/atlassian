"use client";

import React, {useEffect, useRef} from 'react';
import {Message} from "@/types/types";
import {usePathname} from "next/navigation";
import Avatar from "@/components/Avatar";
import {UserCircle} from "lucide-react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";

const Messages = ({messages, chatbotName}: { messages: Message[], chatbotName: string}) => {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const isReviewsPage = path.includes("review-sessions");

  useEffect(() => {
    if(ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={'flex-1 flex flex-col overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg'}>
      {messages.map((message) => {
        const isSender = message.sender !== "user";

       return (
         <div className={`chat ${isSender ? "chat-start" : "chat-end"} relative`} key={message.id}>
           {isReviewsPage && (
             <p className={'absolute -bottom-5 text-xs text-gray-300'}>
               sent {new Date(message.created_at).toLocaleDateString()}
             </p>
           )}

           <div className={`chat-image avatar w-10 ${!isSender && 'mr-4'}`}>
             {isSender ? (
               <Avatar
                 seed={chatbotName}
                 className={'h-12 w-12 bg-white rounded-full border-2 border-[#2991EE]'}
                 />
             ) : (
               <UserCircle className={'text-[#2991EE]'} />
             )}
           </div>

           <p className={`chat-bubble text-white ${isSender ? "chat-bubble-primary bg-[#4D7DFB]" : "chat-bubble-secondary" +
             " bg-gray-200 text-gray-700"}`}>
             <Markdown
              remarkPlugins={[remarkGfm]}
              className={'break-words'}
              components={{
                ul: ({ node, ...props }) => (
                  <ul className={'list-disc list-inside ml-5 mb-5'} {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className={'list-decimal list-inside ml-5 mb-5'} {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className={'mb-2'} {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className={'mb-5'} {...props} />
                ),
                h1: ({ node, ...props }) => (
                  <h1 className={'text-2xl font-bold mb-5'} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className={'text-xl font-bold mb-5'} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className={'text-lg font-bold mb-5'} {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className={'text-md font-bold mb-5'} {...props} />
                ),
                h5: ({ node, ...props }) => (
                  <h5 className={'text-md font-bold mb-5'} {...props} />
                ),
                h6: ({ node, ...props }) => (
                  <h6 className={'text-sm font-bold mb-5'} {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className={'text-sm font-bold mb-5'} {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <pre className={'text-sm font-bold mb-5'} {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className={'text-sm font-bold mb-5'} {...props} />
                ),
                table: ({ node, ...props }) => (
                  <table className={'table-auto w-full border-separate border-2 rounded-sm border-spacing-4' +
                    ' border-white mb-5'} {...props} />
                ),
                thead: ({ node, ...props }) => (
                  <thead className={'text-sm font-bold mb-5'} {...props} />
                ),
                tbody: ({ node, ...props }) => (
                  <tbody className={'text-sm font-bold mb-5'} {...props} />
                ),
                tr: ({ node, ...props }) => (
                  <tr className={'text-sm font-bold mb-5'} {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className={'text-sm font-bold mb-5'} {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className={'text-sm font-bold mb-5'} {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img className={'w-full'} {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className={'text-sm font-bold mb-5'} {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className={'text-sm font-bold mb-5'} {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className={'text-sm font-bold mb-5'} {...props} />
                ),
                del: ({ node, ...props }) => (
                  <del className={'text-sm font-bold mb-5'} {...props} />
                ),
              }}
             >
               {message.content}
             </Markdown>
           </p>
         </div>
       )
      })}
      <div ref={ref} />
    </div>
  );
};

export default Messages;
// by Rokas with ❤️
