/**
 * @typedef ContextProps
 * @type {Object}
 * @property {string} toastMessage
 * @property {boolean} showToast
 * @property {"SUCCESS" | "WARN"} toastType
 * @property {(message: string, type: "SUCCESS" | "WARN") => void} handleToast
 * @property {Object[]} channels
 * @property {Object} activeChannel
 * @property {(arg: Object) => void} setActiveChannel
 * @property {Object} currentUser
 * @property {boolean} isAuthenticated
 * @property {(arg: boolean) => void} setIsAuthenticated
 * @property {(arg: Object) => void} setCurrentUser
 * @property {(arg: Object[]) => void} setChannels
 * @property {(show: boolean) => void} setShowToast
 * @property {string} toastTitle
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
  const [toastTitle, setToastTitle] = useState("");

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
  const { loading: channelsLoading, data, refetch } = useQuery(GET_CHANNELS);

  // Effects
  useEffect(() => {
    if (channelsLoading || !isAuthenticated) return;

    if (data && data.channels) {
      setChannels(data.channels);
      setActiveChannel(data.channels[0]);
    }
  }, [isAuthenticated, channelsLoading, JSON.stringify(data)]);

  useEffect(() => {
    if (channelsLoading) return;

    if (!data && isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, channelsLoading, JSON.stringify(data)]);

  /**
   * Handle Toast.
   * @param {string} msg
   * @param {"SUCCESS" | "WARN"} _toastType
   * @param {string} _toastTitle
   * @returns {void}
   */
  const handleToast = (msg, _toastType, _toastTitle) => {
    setShowToast(true);
    setToastMessage(msg);
    setToastType(_toastType);
    setToastTitle(_toastTitle);
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
        setShowToast,
        toastTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
