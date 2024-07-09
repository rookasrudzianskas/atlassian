"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {BASE_URL} from "@/graphql/apolloClient";

const EditChatbot = ({params: {id}}: { params: { id: string }}) => {
  const [url, setUrl] = useState<string>('');

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
        <div>
          <Link href={url} className={'w-full cursor-pointer hover:opacity-50'}>
            <Input value={url} readOnly={true} className={'cursor-pointer'}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditChatbot;
// by Rokas with ❤️
