import { Navigate } from "react-router-dom";
import Jazzicon from "./avatar";
import { useAuthContext } from "../context/auth.provider";

function CurrentUser() {
  const { user } = useAuthContext();
  return (
    <div className="flex">
      {user ? (
        <div className="m-6 flex items-center">
          <Jazzicon size={35} username={user.username} />
          <div className="flex flex-col pl-2">
            <span className="">{user.username}</span>
            <span className="text-xs text-slate-400">current user</span>
          </div>
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </div>
  );
}

export default CurrentUser;
