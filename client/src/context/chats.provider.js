/**
 * Chats Context API
 * @typedef ContextProps
 * @type {Object}
 * @property {Channel[]} channels
 * @property {Channel} activeChannel
 * @property {(channel: Channel) => void} setActiveChannel
 *
 * @typedef Channel
 * @type {Object}
 * @property {number} Channel.id
 * @property {string} Channel.name
 * @property {string} Channel.createdAt
 */

import { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    setChannels(CHANNELS);
    setActiveChannel(CHANNELS[0]);
  }, []);

  return (
    <ChatsContext.Provider
      value={{
        channels,
        activeChannel,
        setActiveChannel,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsProvider;

const CHANNELS = [
  { name: "general", id: 1, createdAt: "1699118599910" },
  { name: "random", id: 2, createdAt: "1699118599910" },
];
