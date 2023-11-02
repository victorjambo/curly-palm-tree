import { HashtagIcon } from "@heroicons/react/20/solid";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

/**
 * Navbar component
 * @param {{
 *   channels: string[];
 *   activeChannel: string;
 *   setActiveChannel: React.Dispatch<React.SetStateAction<string>;
 *   currentUser: { username: string; id: number };
 * }}
 * @returns React.JSX.Element
 */
export function SideNav({
  channels,
  activeChannel,
  setActiveChannel,
  currentUser,
}) {
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
              key={channel}
              className={activeChannel === channel ? "font-semibold" : ""}
            >
              <button
                className="flex flex-row space-x-0.5 items-center hover:bg-slate-100 px-4 py-2  w-full"
                onClick={() => setActiveChannel(channel)}
              >
                <HashtagIcon className="w-4 h-4" />
                <span>{channel}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        <div className="m-6 flex items-center">
          <Jazzicon
            diameter={42}
            seed={jsNumberForAddress(currentUser.username)}
          />
          <div className="flex flex-col pl-2">
            <span className="">{currentUser.username}</span>
            <span className="text-xs text-slate-400">current user</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
