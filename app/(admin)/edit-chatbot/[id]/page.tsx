"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {BASE_URL} from "@/graphql/apolloClient";
import {Button} from "@/components/ui/button";
import {Copy} from "lucide-react";
import {toast} from "sonner";
import Avatar from "@/components/Avatar";

const EditChatbot = ({params: {id}}: { params: { id: string }}) => {
  const [url, setUrl] = useState<string>('');
  const [chatbotName, setChatbotName] = useState<string>('');

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;
    setUrl(url);
  }, [id]);

  return (
    <div className={'px-0 md:p-10'}>
      <div className={'md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg' +
        ' md:rounded-lg bg-[#2991EE]'}>
        <h2 className={'text-sm text-white font-bold'}>Link to Chat</h2>
        <p className={'text-sm italic text-white'}>
          Share this link with your customers to start chatting with your chatbot.
        </p>
        <div className={'flex items-center space-x-2'}>
          <Link href={url} className={'w-full cursor-pointer hover:opacity-50'}>
            <Input value={url} readOnly={true} className={'cursor-pointer'}/>
          </Link>
          <Button
            size={'sm'}
            className={'px-3'}
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success('Copied to clipboard!');
            }}
          >
            <span className={'sr-only'}>Copy</span>
            <Copy className={'w-4 h-4'} />
          </Button>
        </div>
      </div>
      <section className={'relative mt-5 bg-white p-5 md:p-10 rounded-lg'}>
        <Button className={'absolute top-2 right-2 h-8 w-2'} variant={'destructive'}
          // onClick={() => handleDelete()}
        >
          X
        </Button>
        <div>
          <Avatar seed={chatbotName} />
        </div>

      </section>
    </div>
  );
};

export default EditChatbot;
// by Rokas with ❤️
