import {gql} from "@apollo/client";
import client from "@/graphql/apolloClient";
import {INSERT_MESSAGE} from "@/graphql/mutations";

async function startNewChat(guestName: string, guestEmail: string, chatbotId: number) {
  console.log('CHATBOT ID', chatbotId, 'GUEST NAME', guestName, 'GUEST EMAIL', guestEmail);
  try {
    const guestResult = await client.mutate({
      mutation: gql`
        mutation insertGuest($name: String!, $email: String!) {
            insertGuests(name: $name, email: $email) {
                id
            }
        }
      `,
      variables: {
        name: guestName,
        email: guestEmail,
      }
    });
    const guestId = guestResult.data.insertGuests.id;

    // Initialize a chat session
    const chatSessionResult = await client.mutate({
      mutation: gql`
        mutation insertChatSession($chatbot_id: Int!, $guest_id: Int!) {
            insertChat_sessions(chatbot_id: $chatbot_id, guest_id: $guest_id) {
                id
            }
        }
      `,
      variables: {
        chatbot_id: chatbotId,
        guest_id: guestId,
      }
    });

    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Welcome ${guestName}, I'm your AI assistant. How can I help you today?`,
      },
    });

    console.log("CHAT SESSION ID", chatSessionId, "completed!!!! :smile!!!");
    return chatSessionId;
  } catch (error) {
    console.error('This is error', error);
  }
}

export default startNewChat;
