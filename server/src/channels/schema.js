import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: Int
    username: String
  }

  type Chat {
    id: Int
    message: String
    user: User
    createdAt: String
  }

  type Channel {
    id: Int
    name: String
    createdAt: String
    chats: [Chat]
  }

  type Query {
    channels: [Channel]
    getChannelById(channelId: Int!): Channel
  }

  type ChannelMutationResponse {
    success: Boolean!
    channel: Channel
  }

  type Mutation {
    createChannel(name: String!): ChannelMutationResponse!
  }
`;
