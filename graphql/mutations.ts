import {gql} from "@apollo/client";

export const CREATE_CHATBOT = gql`
    mutation CreateChatbot($clerk_user_id: String!, $name: String!) {
        insertChatbots(clerk_user_id: $clerk_user_id, name: $name) {
            id
            name
        }
    }
`

export const REMOVE_CHARACTERISTIC = gql`
    mutation RemoveCharacteristic($characteristicId: Int!) {
        deleteChatbot_characteristics(id: $characteristicId) {
            id
        }
    }
`

export const DELETE_CHATBOT = gql`
    mutation DeleteChatbot($id: Int!) {
        deleteChatbots(id: $id) {
            id
        }
    }
`

export const ADD_CHARACTERISTIC = gql`
    mutation AddCharacteristic($chatbotId: Int!, $content: String!) {
        insertChatbot_characteristics(chatbot_id: $chatbotId, content: $content) {
            id
            content
            created_at
        }
    }
`
