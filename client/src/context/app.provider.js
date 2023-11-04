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
