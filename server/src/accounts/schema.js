import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: Int
    username: String
  }

  type Query {
    users: [User]
  }

  type AccountMutationResponse {
    success: Boolean!
    user: User
    accessToken: String!
  }

  type Mutation {
    signup(username: String!, password: String!): AccountMutationResponse!
    login(username: String!, password: String!): AccountMutationResponse!
  }
`;
