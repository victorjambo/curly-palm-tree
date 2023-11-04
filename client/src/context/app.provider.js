/**
 * @typedef ContextProps
 * @type {Object}
 * @property {Object} currentUser
 * @property {string} currentUser.username
 * @property {number} currentUser.id
 * @property {string} toastMessage
 * @property {Dispatch<SetStateAction<string>>} setToastMessage
 * @property {boolean} showToast
 * @property {"SUCCESS" | "WARN"} toastType
 * @property {React.Dispatch<React.SetStateAction<"SUCCESS" | "WARN">>} setToastType
 * @property {(message: string, type: "SUCCESS" | "WARN") => void} handleToast
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setShowToast
 */

import { createContext, useContext, useState } from "react";

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
  const [currentUser] = useState({
    username: "victor",
    id: 1,
  });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("SUCCESS");

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
        currentUser,
        toastMessage,
        setToastMessage,
        showToast,
        setShowToast,
        toastType,
        setToastType,
        handleToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
