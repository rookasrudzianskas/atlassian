export interface Chatbot {
  id: number;
  clerk_user_id: string;
  name: string;
  created_at: string;
  chatbot_characteristics: ChatbotCharacteristic[];
  chat_sessions: ChatSession[];
}

export interface ChatbotCharacteristic {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: string;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface ChatSession {
  id: number;
  chatbot_id: number;
  guest_id: number | null;
  created_at: string;
  messages: Message[];
  guests: Guest
}

export interface Message {
  id: number;
  chat_session_id: number;
  content: string;
  created_at: string;
  sender: "ai" | "user";
}

export interface GetChatbotByIdVariables {
  id: number;
}

export interface GetChatbotByIdResponse {
  chatbots: Chatbot;
}

export interface GetChatbotsByUserData {
  chatbotsByUser: Chatbot[];
}

export interface GetChatbotsByUserVariables {
  clerk_user_id: string;
}

export interface GetUserChatbotsVariables {
  userId: string;
}

export interface GetUserChatbotsResponse {
  chatbotsByUser: Chatbot[];
}

export interface GetChatSessionMessagesVariables {
  id: number;
}

export interface GetChatSessionMessagesResponse {
  chat_sessions: {
    id: number;
    created_at: string;
    messages: Message[];
    chatbots: {
      name: string;
    }
    guests: {
      name: string;
      email: string;
    }
  }
}

export interface MessagesByChatSessionIdResponse {
  chat_sessions: ChatSession;
}

export interface MessagesByChatSessionIdVariables {
  chat_session_id: number;
}
