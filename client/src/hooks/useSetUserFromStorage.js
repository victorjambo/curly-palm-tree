import { useEffect } from "react";

export const useSetUserFromStorage = ({
  setCurrentUser,
  setIsAuthenticated,
}) => {
  useEffect(() => {
    const _user = localStorage.getItem("chat-user");
    if (_user) {
      setCurrentUser(JSON.parse(_user));
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
