import OpenAI from "openai";
import {NextResponse} from "next/server";
import {serverClient} from "@/lib/server/serverClient";
import {GetChatbotByIdResponse, MessagesByChatSessionIdResponse} from "@/types/types";
import {GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID} from "@/graphql/queries";
import {Chat, ChatCompletionMessageParam} from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { chat_session_id, chatbot_id, content, name } = await req.json();

  console.log("DEBUG 1", chat_session_id, chatbot_id, content, name);

  try {
    const { data } = await serverClient.query<GetChatbotByIdResponse>({
      query: GET_CHATBOT_BY_ID,
      variables: {
        id: chatbot_id
      }
    });

    const chatbot = data.chatbots;

    if(!chatbot) {
      return NextResponse.json({
        error: 'Chatbot not found',
      }, { status: 404 });
    }

    const { data: messagesData } = await serverClient.query<MessagesByChatSessionIdResponse>({
      query: GET_MESSAGES_BY_CHAT_SESSION_ID,
      variables: {
        chat_session_id: chat_session_id
      },
      fetchPolicy: 'no-cache'
    });

    const previousMessages = messagesData.chat_sessions.messages;

    const formattedPreviousMessages: ChatCompletionMessageParam[] = previousMessages.map((message) => ({
      role: message.sender === "ai" ? "system" : "user",
      name: message.sender === "ai" ? "system" : name,
      content: message.content,
    }));

  } catch (error) {
    console.error('This is error', error);
    return NextResponse.json({
      error: error.message,
    });
  }
}
