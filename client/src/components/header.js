import { HashtagIcon } from "@heroicons/react/20/solid";
import { useAppContext } from "../context/app.provider";
import { useNavigate } from "react-router-dom";

/**
 * Header component
 * @returns {React.JSX.Element}
 */
function Header() {
  const { activeChannel, isAuthenticated, setIsAuthenticated, setCurrentUser } =
    useAppContext();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate("/login")
  };

  return (
    <header className="flex w-full py-4 border-b justify-between">
      <div className="px-4 text-lg flex flex-row items-center">
        <HashtagIcon className="w-4 h-4" />
        <span>{activeChannel?.name ?? "Channel"}</span>
      </div>
      {isAuthenticated ? (
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
