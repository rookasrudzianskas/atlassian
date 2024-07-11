"use client";

import React, {useEffect} from 'react';
import {Chatbot} from "@/types/types";

const ChatbotSessions = ({ chatbots }: { chatbots: Chatbot[] }) => {
  const [sortedChatbots, setSortedChatbots] = React.useState<Chatbot[]>(chatbots);

  useEffect(() => {
    const sortedArray = [...chatbots].sort((a, b) => b.chat_sessions.length - a.chat_sessions.length);
    setSortedChatbots(sortedArray);
  }, [chatbots]);

  return (
    <div>

    </div>
  );
};

export default ChatbotSessions;
// by Rokas with ❤️
