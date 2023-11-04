/**
 * Chats Context API
 * @typedef ContextProps
 * @type {Object}
 * @property {Channel[]} channels
 * @property {Channel} activeChannel
 * @property {(channel: Channel) => void} setActiveChannel
 * @property {() => void} fetchChannels
 * @property {Chat[]} chats
 * @property {() => void} fetchChats
 *
 * @typedef Channel
 * @type {Object}
 * @property {number} Channel.id
 * @property {string} Channel.name
 * @property {string} Channel.createdAt
 *
 * @typedef Chat
 * @type {Object}
 * @property {number} Chat.id
 * @property {Channel} Chat.channel
 * @property {string} Chat.createdAt
 * @property {string} Chat.message
 * @property {{username: string; id: number}} Chat.user
 */

import { createContext, useContext } from "react";
import { useFetchChannels } from "../hooks/useFetchChannels";
import { useFetchChats } from "../hooks/useFetchChats";

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
  const { channels, activeChannel, fetchChannels, setActiveChannel } =
    useFetchChannels();

  const { chats, fetchChats } = useFetchChats(activeChannel?.id ?? 1);

  return (
    <ChatsContext.Provider
      value={{
        chats,
        channels,
        fetchChannels,
        activeChannel,
        setActiveChannel,
        fetchChats,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsProvider;
