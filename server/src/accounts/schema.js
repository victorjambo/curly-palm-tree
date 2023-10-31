import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: Int
    username: String
  }

  type Query {
    users: [User]
  }

  type MutationResponse {
    success: Boolean!
    user: User
    accessToken: String!
  }

  type Mutation {
    signup(username: String!, password: String!): MutationResponse!
    login(username: String!, password: String!): MutationResponse!
  }
`;
