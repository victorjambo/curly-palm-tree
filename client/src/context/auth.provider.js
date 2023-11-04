/**
 * @typedef ContextProps
 * @type {Object}
 * @property {boolean} isAuth
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsAuth
 * @property {boolean} showModal
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setShowModal
 * @property {string} token
 * @property {React.Dispatch<React.SetStateAction<string>>} setToken
 * @property {{ id: number; email: string; name: string }} user
 * @property {React.Dispatch<React.SetStateAction<{ id: number; email: string; name: string }>>} setUser
 * @property {{Login: "Login", Signup: "Signup"}} authType
 * @property {React.Dispatch<React.SetStateAction<{Login: "Login", Signup: "Signup"}>>} setAuthType
 */

import { createContext, useContext, useEffect, useState } from "react";

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
  const [user, setUser] = useState({
    id: 0,
    email: "",
    name: "",
  });

  useEffect(() => {
    const _token = localStorage.getItem("token");
    const _user = localStorage.getItem("user");
    if (_user) {
      setUser(JSON.parse(_user));
      setIsAuth(true);
      setToken(_token?.replaceAll('"', "") || "");
    }
    // Interceptors for apollo
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
