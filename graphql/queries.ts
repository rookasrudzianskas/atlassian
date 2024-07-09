import {gql} from "@apollo/client";

export const CREATE_CHATBOT = gql`
    mutation CreateChatbot($clerk_user_id: String!, $name: String!) {
        insertChatbots(clerk_user_id: $clerk_user_id, name: $name) {
            id
            name
        }
    }
`

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
