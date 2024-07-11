import React from 'react';
import {useAwaitablePush} from "@clerk/nextjs/dist/types/app-router/client/useAwaitablePush";
import {auth} from "@clerk/nextjs/server";
import {serverClient} from "@/lib/server/serverClient";
import {GET_CHATBOTS_BY_USER} from "@/graphql/queries";
import {GetChatbotsByUserData, GetChatbotsByUserVariables} from "@/types/types";

const ViewChatbots = async ({}) => {
  const {userId} = await auth()
  if(!userId) return;

  const { data: { chatbotsByUser } } = await serverClient.query<GetChatbotsByUserData, GetChatbotsByUserVariables>({
    query: GET_CHATBOTS_BY_USER,
    variables: {
      clerk_user_id: userId,
    }
  });

  return (
    <div>

    </div>
  );
};

export default ViewChatbots;
// by Rokas with ❤️
