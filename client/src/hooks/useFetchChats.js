/**
 * @typedef Chat
 * @type {Object}
 * @property {number} Chat.id
 * @property {Channel} Chat.channel
 * @property {string} Chat.createdAt
 * @property {string} Chat.message
 * @property {{username: string; id: number}} Chat.user
 */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_CHATS_BY_CHANNEL_ID } from "../graphql/chats";

/**
 * Fetch chats for a given channel
 * @param {number} channelId
 * @returns {{chats: Chat[]; fetchChats: () => void}}
 */
export const useFetchChats = (channelId) => {
  const [chats, setChats] = useState([]);

  const {
    data,
    loading,
    refetch: fetchChats,
  } = useQuery(GET_CHATS_BY_CHANNEL_ID, {
    variables: {
      channelId,
    },
  });

  useEffect(() => {
    if (loading) return;

    if (data && data.getChatsByChannelId) {
      setChats(data.getChatsByChannelId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, JSON.stringify(data?.getChatsByChannelId)]);

  return {
    chats,
    fetchChats,
  };
};
