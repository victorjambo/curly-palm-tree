import Jazzicon from "./avatar";
import { useAppContext } from "../context/app.provider";

function CurrentUser() {
  const { currentUser } = useAppContext();

  return (
    <div className="flex">
      {currentUser ? (
        <div className="m-6 flex items-center">
          <Jazzicon size={35} username={currentUser.username} />
          <div className="flex flex-col pl-2">
            <span className="">{currentUser.username}</span>
            <span className="text-xs text-slate-400">current user</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CurrentUser;
