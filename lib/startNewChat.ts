import {gql} from "@apollo/client";
import client from "@/graphql/apolloClient";

async function startNewChat(guestName: string, guestEmail: string, chatbotId: number) {
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

  } catch (error) {
    console.error('This is error', error);
  }
}
