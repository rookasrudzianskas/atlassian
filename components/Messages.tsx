"use client";

import React from 'react';
import {Message} from "@/types/types";
import {usePathname} from "next/navigation";
import Avatar from "@/components/Avatar";
import {UserCircle} from "lucide-react";

const Messages = ({messages, chatbotName}: { messages: Message[], chatbotName: string}) => {
  const path = usePathname();
  const isReviewsPage = path.includes("review-sessions");
  return (
    <div>
      {messages.map((message) => {
        const isSender = message.sender !== "user";

       return (
         <div className={`chat ${isSender ? "chat-start" : "chat-end"} relative`} key={message.id}>
           {isReviewsPage && (
             <p className={'absolute -bottom-5 text-xs text-gray-300'}>
               sent {new Date(message.created_at).toLocaleDateString()}
             </p>
           )}

           <div>
             {isSender ? (
               <Avatar
                 seed={chatbotName}
                 className={'h-12 w-12 bg-white rounded-full border-2 border-[#2991EE]'}
                 />
             ) : (
               <UserCircle className={'text-[#2991EE]'} />
             )}
           </div>
         </div>
       )
      })}
    </div>
  );
};

export default Messages;
// by Rokas with ❤️
