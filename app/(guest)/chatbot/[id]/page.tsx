"use client";

import React, {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Message} from "@/types/types";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import startNewChat from "@/lib/startNewChat";
import Avatar from "@/components/Avatar";

const ChatbotPage = ({params: { id }}: { params: { id: string }}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [chatId, setChatId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInformationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const chatId = await startNewChat(name, email, Number(id));

    setChatId(chatId);
    setLoading(false);
    setIsOpen(false);
  }

  return (
    <div className={'w-full flex bg-gray-100'}>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className={'sm:max-w-[425px] mx-auto'}>
          <form onSubmit={handleInformationSubmit} className={''}>
            <DialogHeader>
              <DialogTitle>Let's get started!</DialogTitle>
              <DialogDescription>
                I just need a few details to get you started.
              </DialogDescription>
            </DialogHeader>
            <div className={'grid gap-4 py-4'}>
              <div className={'grid grid-cols-4 items-center gap-4'}>
                <Label htmlFor={'name'} className={'text-right'}>
                  Name
                </Label>
                <Input
                  id={'name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={'Rokas'}
                  className={'col-span-3'}
                />
              </div>

              <div className={'grid grid-cols-4 items-center gap-4'}>
                <Label htmlFor={'username'} className={'text-right'}>
                  Email
                </Label>
                <Input
                  id={'username'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={'rokas@rokas.com'}
                  className={'col-span-3'}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type={'submit'} disabled={!name || !email || loading}>
                {!loading ? 'Start chatting' : 'Creating...'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div>
        <div className={'pb-4 border-b sticky top-0 z-50 bg-[#4D7DfB] py-5 px-10 text-white md:rounded-t-lg flex' +
          ' items-center space-x-4'}>
          <Avatar seed={chatbotData?.chatbots.name}
                  className={'h-12 w-12 bg-white rounded-full border--2 border-white'}
          />
          <div className={'truncate text-lg'}>
            <h1 className={'truncate text-lg'}>{chatBotData?.chatbots.name}</h1>
            <p className={'text-sm text-gray-300'}>Typically replies in less than a minute</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatbotPage;
// by Rokas with ❤️
