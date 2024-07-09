"use client";

import React, {useState} from 'react';
import Avatar from "@/components/Avatar";
import {Input} from "@/components/ui/input";

import {Button} from "@/components/ui/button";
import {useMutation} from "@apollo/client";
import {CREATE_CHATBOT} from "@/graphql/mutations";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

const CreateChatbot = ({}) => {
  const {user} = useUser();
  const [name, setName] = useState<string | null>('');
  const router = useRouter();

  const [createChatbot, { data, loading, error }] = useMutation(CREATE_CHATBOT, {
    variables: {
      clerk_user_id: user?.id,
      name: name,
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await createChatbot();
      setName('');

      router.push(`/edit-chatbot/${data.data.insertChatbots.id}`)
    } catch (error) {
      console.error('This is error', error);
    }
  }

  return (
    <div className={'flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded-md' +
      '  m-10'}>
      <Avatar seed={'Create a chatbot'} />
      <div>
        <h1 className={'text-xl lg:text-3xl font-semibold'}>Create</h1>
        <h2 className={'font-light'}>Create a new chatbot to assist you in your conversations with your customers.</h2>
        <h3 className={'font-light'}>Fill out the form below to get started.</h3>
        <form onSubmit={handleSubmit} className={'flex flex-col md:flex-row gap-5 mt-5'}>
          <Input
            placeholder={'Enter a name'}
            className={'max-w-lg'}
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={true}
            type={'text'}
          />
          <Button className={''} disabled={loading || !name}>
            {loading ? 'Creating...' : 'Create chatbot'}
          </Button>
        </form>

        <p className={'text-gray-300 mt-5'}>Example: Customer Support Chatbot</p>
      </div>
    </div>
  );
};

export default CreateChatbot;
// by Rokas with ❤️
