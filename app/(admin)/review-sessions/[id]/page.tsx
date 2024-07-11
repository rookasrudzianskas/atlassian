import React from 'react';
import {useAwaitablePush} from "@clerk/nextjs/dist/types/app-router/client/useAwaitablePush";
import {serverClient} from "@/lib/server/serverClient";
import {GetChatSessionMessagesResponse, GetChatSessionMessagesVariables} from "@/types/types";
import {GET_CHAT_SESSION_MESSAGES} from "@/graphql/queries";
import Messages from "@/components/Messages";

const ReviewSession = async ({params: {id}}: { params: { id: string } }) => {

  const {
    data: {
      chat_sessions: {
        id: chatSessionId,
        created_at,
        messages,
        chatbots: {name},
        guests: {name: guestName, email},
      },
    },
  } = await serverClient.query<GetChatSessionMessagesResponse, GetChatSessionMessagesVariables>({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: parseInt(id as string) },
  });

  return (
    <div className={'flex-1 p-10 pb-24'}>
      <h1 className={'text-xl lg:text-3xl font-semibold'}>Session Review</h1>
      <p className={'font-light text-xs text-gray-400 mt-2 mb-5 text-center'}>
        Created {new Date(created_at).toLocaleDateString()} by {guestName} ({email})
      </p>

      <h2 className={'font-light mt-2'}>
        Between {name} and{" "}
        <span className={'font-extrabold'}>
          {guestName} ({email})
        </span>

        <hr className={'my-10'} />

        <Messages
          messages={messages}
          chatSessionId={chatSessionId}
          chatbotName={name}
        />
      </h2>
    </div>
  );
};

export default ReviewSession;
// by Rokas with ❤️
