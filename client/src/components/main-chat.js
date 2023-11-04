import { useState } from "react";
import { HashtagIcon } from "@heroicons/react/20/solid";
import { Chats } from "./chats";
import { TextArea } from "./text-area";
import { useChatsContext } from "../context/chats.provider";

/**
 * Main chat component
 * @returns {React.JSX.Element}
 */
export function MainChat() {
  const { activeChannel } = useChatsContext();

  const [chats, setChats] = useState([
    {
      id: "1",
      username: "mutai",
      timestamp: "10:15",
      message: "The slack from the other side.",
    },
  ]);

  /**
   * @param {Chat} message
   * @typedef Chat
   * @type {Object}
   * @property {number} id
   * @property {string} message
   * @property {string} username
   * @property {string} timestamp
   */
  const sendChat = (message) => {
    setChats((prev) => [...prev, message]);
  };

  return (
    <div className="w-5/6 h-full flex flex-col">
      <header className="flex w-full py-4 border-b bg-white">
        <div className="px-4 text-lg flex flex-row items-center">
          <HashtagIcon className="w-4 h-4" />
          <span>{activeChannel?.name}</span>
        </div>
      </header>
      <Chats chats={chats} />
      <TextArea sendChat={sendChat} />
    </div>
  );
}
