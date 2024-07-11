"use client";

import React, {useEffect, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  GetChatbotByIdResponse,
  Message,
  MessagesByChatSessionIdResponse,
  MessagesByChatSessionIdVariables
} from "@/types/types";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import startNewChat from "@/lib/startNewChat";
import Avatar from "@/components/Avatar";
import {useQuery} from "@apollo/client";
import {GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID} from "@/graphql/queries";
import Messages from "@/components/Messages";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, useFormField} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  message: z.string().min(2, "Message must be at least 2 characters long"),
});

const ChatbotPage = ({params: { id }}: { params: { id: string }}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [chatId, setChatId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useFormField<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const { data: chatBotData } = useQuery<GetChatbotByIdResponse>(
    GET_CHATBOT_BY_ID,
    {
      variables: {
        id: id,
      }
    }
  );

  const { loading: loadingQuery, error, data, } = useQuery<MessagesByChatSessionIdResponse, MessagesByChatSessionIdVariables>(
    GET_MESSAGES_BY_CHAT_SESSION_ID,
    {
      variables: {
        chat_session_id: chatId,
        skip: !chatId,
      }
    }
  );

  useEffect(() => {
    if (data) {
      setMessages(data.chat_sessions.messages);
    }
  }, [data]);

  const handleInformationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const chatId = await startNewChat(name, email, Number(id));

    setChatId(chatId);
    setLoading(false);
    setIsOpen(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { message: formMessage } = values;
    const message = formMessage;
    form.reset();

    if(!name || !email) {
      setIsOpen(true);
      setLoading(false);
      return;
    }

    if(!message.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      content: message,
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "user",
    };

    const loadingMessage: Message = {
      id: Date.now(),
      content: 'Loading...',
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "ai",
    }
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

      <div className={'flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-md shadow-2xl md:mt-10'}>
        <div className={'pb-4 border-b sticky top-0 z-50 bg-[#4D7DfB] py-5 px-10 text-white md:rounded-t-lg flex' +
          ' items-center space-x-4'}>
          <Avatar seed={chatBotData?.chatbots.name}
                  className={'h-12 w-12 bg-white rounded-full border--2 border-white'}
          />
          <div className={'truncate text-lg'}>
            <h1 className={'truncate text-lg'}>{chatBotData?.chatbots.name}</h1>
            <p className={'text-sm text-gray-300'}>Typically replies in less than a minute</p>
          </div>
        </div>
        <Messages
          messages={messages}
          chatbotName={chatBotData?.chatbots.name!}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'flex items-start sticky bottom-0 z-50 space-x-4' +
            ' drop-shadow-lg p-4' +
            ' bg-gray-100' +
            ' rounded-md'}>
            <FormField
              control={form.control}
              name={"message"}
              render={({ field }) => (
                <FormItem className={'flex-1'}>
                  <FormLabel hidden>Message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={'Type your message here...'}
                      className={'p-8'}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting || !form.formState.isValid} type={'submit'}>
              {!loading ? 'Send' : 'Sending...'}
            </Button>
          </form>
        </Form>
      </div>

    </div>
  );
};

export default ChatbotPage;
// by Rokas with ❤️
