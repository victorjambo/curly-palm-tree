import { gql } from "@apollo/client";

export const GET_CHANNELS = gql`
  query Channels {
    channels {
      name
      id
      createdAt
      chats {
        message
        id
        createdAt
        user {
          username
          id
        }
      }
    }
  }
`;
