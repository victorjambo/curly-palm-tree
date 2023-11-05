import { gql } from "@apollo/client";

export const GET_CHATS_BY_CHANNEL_ID = gql`
  query GetChatsByChannelId($channelId: Int!) {
    getChatsByChannelId(channelId: $channelId) {
      createdAt
      id
      message
      user {
        username
        id
      }
      channel {
        name
        id
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($message: String!, $channelId: Int!) {
    createChat(message: $message, channelId: $channelId) {
      chat {
        message
        id
      }
      success
    }
  }
`;

export const NEW_CHAT_ADDED = gql`
  subscription NewChatAdded($chatId: Int!) {
    newChatAdded(chatID: $chatId) {
      message
      id
    }
  }
`;
