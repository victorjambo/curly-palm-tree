import { HashtagIcon } from "@heroicons/react/20/solid";
import Jazzicon from "./avatar";
import { useChatsContext } from "../context/chats.provider";
import { useAuthContext } from "../context/auth.provider";

/**
 * Navbar component
 * @returns {React.JSX.Element}
 */
export function SideNav() {
  const { channels, activeChannel, setActiveChannel } = useChatsContext();
  const { user } = useAuthContext();

  return (
    <nav className="w-1/6 border-r flex flex-col">
      <div className="flex text-xl border-b py-4">
        <span className="px-4">Chat App</span>
      </div>
      <div className="flex-1 py-4">
        <div className="text-lg px-4 mb-3">Channels</div>
        <ul>
          {channels.map((channel) => (
            <li
              key={channel.id}
              className={
                activeChannel.name === channel.name ? "font-semibold" : ""
              }
            >
              <button
                className="flex flex-row space-x-0.5 items-center hover:bg-slate-100 px-4 py-2  w-full"
                onClick={() => setActiveChannel(channel)}
              >
                <HashtagIcon className="w-4 h-4" />
                <span>{channel.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        <div className="m-6 flex items-center">
          <Jazzicon size={35} username={user.name} />
          <div className="flex flex-col pl-2">
            <span className="">{user.name}</span>
            <span className="text-xs text-slate-400">current user</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
