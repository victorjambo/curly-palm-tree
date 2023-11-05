/**
 * @typedef ContextProps
 * @type {Object}
 * @property {string} toastMessage
 * @property {(message: string) => void} setToastMessage
 * @property {boolean} showToast
 * @property {"SUCCESS" | "WARN"} toastType
 * @property {(type: "SUCCESS" | "WARN") => void} setToastType
 * @property {(message: string, type: "SUCCESS" | "WARN") => void} handleToast
 * @property {(show: boolean) => void} setShowToast
 */

import { createContext, useContext, useEffect, useState } from "react";
import { useSetUserFromStorage } from "../hooks/useSetUserFromStorage";
import { GET_CHANNELS } from "../graphql/channels";
import { useQuery } from "@apollo/client";

/**
 * Create context.
 * @type {React.Context<ContextProps>}
 */
const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

/**
 * Context API App Provider
 * @param {{ children: React.JSX.Element }} children
 * @returns {React.JSX.Element}
 */
const AppProvider = ({ children }) => {
  // Dom manipulation
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("SUCCESS");

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Chats + Channels
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  // Hooks
  useSetUserFromStorage({
    setCurrentUser,
    setIsAuthenticated,
  });
  const { loading: channelsLoading, data } = useQuery(GET_CHANNELS);

  // Effects
  useEffect(() => {
    if (channelsLoading || !isAuthenticated) return;

    if (data && data.channels) {
      setChannels(data.channels);
      setActiveChannel(data.channels[0]);
    }
  }, [isAuthenticated, channelsLoading]);

  /**
   * Handle Toast.
   * @param {string} msg
   * @param {"SUCCESS" | "WARN"} _toastType
   * @returns {void}
   */
  const handleToast = (msg, _toastType) => {
    setShowToast(true);
    setToastMessage(msg);
    setToastType(_toastType);
  };

  return (
    <AppContext.Provider
      value={{
        toastMessage,
        showToast,
        toastType,
        handleToast,
        channels,
        activeChannel,
        setActiveChannel,
        currentUser,
        isAuthenticated,
        setIsAuthenticated,
        setCurrentUser,
        setChannels,
        setShowToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
