/**
 * Fetch Channels Hook
 * @typedef Channel
 * @type {Object}
 * @property {number} Channel.id
 * @property {string} Channel.name
 * @property {string} Channel.createdAt
 */

import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_CHANNELS } from "../graphql/channels";

/**
 * Fetch Channel
 * @typedef Response
 * @type {Object}
 * @property {Channel[]} channels
 * @property {Channel} activeChannel
 * @property {() => void} fetchChannels
 * @property {(channel: Channel) => void} setActiveChannel
 * @returns {Response}
 */
export const useFetchChannels = () => {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  const { loading, data, refetch: fetchChannels } = useQuery(GET_CHANNELS);

  useEffect(() => {
    if (loading) return;
    if (data && data.channels) {
      const dataChannels = data.channels;
      setChannels(dataChannels);
      setActiveChannel(dataChannels[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, JSON.stringify(data?.channels)]);

  return {
    channels,
    activeChannel,
    fetchChannels,
    setActiveChannel,
  };
};
