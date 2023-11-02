import { useState } from "react";
import { HashtagIcon } from "@heroicons/react/20/solid";
import { Chats } from "./chats";
import { TextArea } from "./text-area";

/**
 * Main chat component
 * @param {{ activeChannel: string }}
 * @returns JSX.Element
 */
export function MainChat({ activeChannel }) {
  const [chats, setChats] = useState([{
    id: "1",
    username: "mutai",
    timestamp: "10:15",
    message: "The slack from the other side.",
  }]);

  /**
   * @param {{
   *   id: string;
   *   username: string;
   *   timestamp: string;
   *   message: string;
   * }} message
   */
  const sendChat = (message) => {
    setChats((prev) => [...prev, message]);
  };

  return (
    <div className="w-5/6 h-full flex flex-col">
      <header className="flex w-full py-4 border-b bg-white">
        <div className="px-4 text-lg flex flex-row items-center">
          <HashtagIcon className="w-4 h-4" />
          <span>{activeChannel}</span>
        </div>
      </header>
      <Chats chats={chats} />
      <TextArea activeChannel={activeChannel} sendChat={sendChat} />
    </div>
  );
}
