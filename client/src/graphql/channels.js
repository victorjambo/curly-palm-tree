import { gql } from "@apollo/client";

export const GET_CHANNELS = gql`
  query Channels {
    channels {
      name
      id
      createdAt
      chats {
        createdAt
        id
        message
        user {
          username
          id
        }
      }
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($name: String!) {
    createChannel(name: $name) {
      channel {
        name
        id
      }
      success
    }
  }
`;
