/**
 * Chats Context API
 * @typedef ContextProps
 * @type {Object}
 * @property {Channel[]} channels
 * @property {Channel} activeChannel
 * @property {(channel: Channel) => void} setActiveChannel
 * @property {() => void} fetchChannels
 *
 * @typedef Channel
 * @type {Object}
 * @property {number} Channel.id
 * @property {string} Channel.name
 * @property {string} Channel.createdAt
 */

import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { GET_CHANNELS } from "../graphql/channels";

/**
 * Create context.
 * @type {React.Context<ContextProps>}
 */
const ChatsContext = createContext({});

export const useChatsContext = () => useContext(ChatsContext);

/**
 * Context API Chat Provider
 * @param {{ children: React.JSX.Element }} children
 * @returns {React.JSX.Element}
 */
const ChatsProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  const { loading, data, refetch: fetchChannels } = useQuery(GET_CHANNELS);

  useEffect(() => {
    if (loading) return;

    const dataChannels = data.channels;
    console.log("🚀 ~ file: chats.provider.js:44 ~ useEffect ~ dataChannels:", dataChannels)
    setChannels(dataChannels);
    setActiveChannel(dataChannels[0]);
  }, [loading, JSON.stringify(data?.channels)]);

  return (
    <ChatsContext.Provider
      value={{
        channels,
        fetchChannels,
        activeChannel,
        setActiveChannel,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsProvider;
