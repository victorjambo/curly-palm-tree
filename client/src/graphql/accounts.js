import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      success
      user {
        username
        id
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      success
      user {
        username
        id
      }
      accessToken
    }
  }
`;
