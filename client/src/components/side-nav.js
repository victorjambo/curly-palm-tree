import { HashtagIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import Jazzicon from "./avatar";
import { useChatsContext } from "../context/chats.provider";
import { useAuthContext } from "../context/auth.provider";
import { useEffect, useState } from "react";
import { CREATE_CHANNEL } from "../graphql/channels";
import { useMutation } from "@apollo/client";

/**
 * Navbar component
 * @returns {React.JSX.Element}
 */
export function SideNav() {
  const { channels, activeChannel, setActiveChannel, fetchChannels } =
    useChatsContext();
  const { user } = useAuthContext();

  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  const [createChannel, { data, loading }] = useMutation(CREATE_CHANNEL);

  useEffect(() => {
    if (loading) return;
    if (data && data.createChannel && data.createChannel.success) {
      fetchChannels?.();
      setShowInput(false);
      setInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const addChannel = (e) => {
    e.preventDefault();
    createChannel({ variables: { name: input } });
  };

  return (
    <nav className="w-1/6 border-r flex flex-col">
      <div className="flex text-xl border-b py-4">
        <span className="px-4">Chat App</span>
      </div>
      <div className="flex-1 py-4">
        <div className="text-lg px-4 mb-3 flex justify-between">
          <span>Channels</span>
          <button onClick={() => setShowInput(!showInput)}>
            <PlusCircleIcon className="w-5 h-5 text-slate-500 hover:text-slate-600" />
          </button>
        </div>
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
          {showInput ? (
            <li className="flex justify-center">
              <form onSubmit={addChannel}>
                <input
                  type="text"
                  className="py-2 border rounded-md pl-2"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <input type="submit" className="hidden" />
              </form>
            </li>
          ) : null}
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
