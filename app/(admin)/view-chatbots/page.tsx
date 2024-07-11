import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {serverClient} from "@/lib/server/serverClient";
import {GET_CHATBOTS_BY_USER} from "@/graphql/queries";
import {Chatbot, GetChatbotsByUserData, GetChatbotsByUserVariables} from "@/types/types";

const ViewChatbots = async ({}) => {
  const {userId} = await auth()
  if(!userId) return;

  const { data: { chatbotsByUser } } = await serverClient.query<GetChatbotsByUserData, GetChatbotsByUserVariables>({
    query: GET_CHATBOTS_BY_USER,
    variables: {
      clerk_user_id: userId,
    }
  });

  const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div>

    </div>
  );
};

export default ViewChatbots;
// by Rokas with ❤️
