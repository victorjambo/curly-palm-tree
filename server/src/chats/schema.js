import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: Int
    username: String
  }

  type Channel {
    id: Int
    name: String
    createdAt: String
  }

  type Chat {
    id: Int
    message: String
    user: User
    channel: Channel
    createdAt: String
  }

  type Query {
    chats: [Chat]
    getChatsByChannelId(channelId: Int!): [Chat]
  }

  type ChatMutationResponse {
    success: Boolean!
    chat: Chat
  }

  type Mutation {
    createChat(message: String!, channelId: Int!): ChatMutationResponse!
  }
`;
