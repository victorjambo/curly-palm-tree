/**
 * @typedef ContextProps
 * @type {Object}
 * @property {boolean} isAuth
 * @property {(arg: boolean) => void} setIsAuth
 * @property {boolean} showModal
 * @property {(arg: boolean) => void} setShowModal
 * @property {string} token
 * @property {(token: string) =>  void} setToken
 * @property {{ id: number; username: string }} user
 * @property {(arg: { id: number; username: string }) => void} setUser
 * @property {"Login" | "Signup"} authType
 * @property {(arg: "Login" | "Signup") => void} setAuthType
 */

import { createContext, useContext, useState, useEffect } from "react";

/**
 * Create context.
 * @type {React.Context<ContextProps>}
 */
const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

/**
 * Context API Auth Provider
 * @param {{ children: React.JSX.Element }} children
 * @returns {React.JSX.Element}
 */
const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [token, setToken] = useState("");
  const [authType, setAuthType] = useState(AuthType.Login);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _token = localStorage.getItem("chat.token");
    const _user = localStorage.getItem("chat.user");
    if (_user) {
      setUser(JSON.parse(_user));
      setIsAuth(true);
      setToken(_token?.replaceAll('"', "") || "");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        showModal,
        setShowModal,
        authType,
        setAuthType,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const AuthType = {
  Login: "Login",
  Signup: "Signup",
};
