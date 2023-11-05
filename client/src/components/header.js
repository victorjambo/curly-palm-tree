import { HashtagIcon } from "@heroicons/react/20/solid";
import { useChatsContext } from "../context/chats.provider";
import { useAuthContext } from "../context/auth.provider";

/**
 * Header component
 * @returns {React.JSX.Element}
 */
function Header() {
  const { activeChannel } = useChatsContext();
  const { isAuth, setUser, setIsAuth } = useAuthContext();

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuth(false);
  };

  return (
    <header className="flex w-full py-4 border-b justify-between">
      <div className="px-4 text-lg flex flex-row items-center">
        <HashtagIcon className="w-4 h-4" />
        <span>{activeChannel?.name ?? "Channel"}</span>
      </div>
      {isAuth ? (
        <button
          className="mr-4 px-4 hover:bg-slate-200 rounded-md"
          onClick={logout}
        >
          logout
        </button>
      ) : null}
    </header>
  );
}
export default Header;
