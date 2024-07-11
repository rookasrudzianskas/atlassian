import {gql} from "@apollo/client";

export const GET_CHATBOT_BY_ID = gql`
    query GetChatbotById($id: Int!) {
        chatbots(id: $id) {
            id
            name
            created_at
            chatbot_characteristics {
                id
                content
                created_at
            }
            chat_sessions {
                id
                created_at
                guest_id
                messages {
                    id
                    content
                    created_at
                }
            }
        }
    }
`

export const GET_CHATBOTS_BY_USER = gql`
    query GetChatbotsByUser($clerk_user_id: String!) {
        chatbotsByUser(clerk_user_id: $clerk_user_id) {
            id
            name
            created_at
            chatbot_characteristics {
                id
                content
                created_at
            }
            chat_sessions {
                id
                created_at
                guest_id
                messages {
                    id
                    content
                    created_at
                }
            }
        }
    }
`;
