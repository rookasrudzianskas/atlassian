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

    const chatId = await startNewChat(name, email. Number(id));

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

    </div>
  );
};

export default ChatbotPage;
// by Rokas with ❤️
