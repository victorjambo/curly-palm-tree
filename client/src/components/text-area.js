import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useChatsContext } from "../context/chats.provider";

/**
 * Input field component
 * @param {Object} props
 * @param {(message: Chat) => void} props.sendChat
 *
 * @typedef Chat
 * @type {Object}
 * @property {number} id
 * @property {string} message
 * @property {string} username
 * @property {string} timestamp
 * @returns {React.JSX.Element}
 */
export function TextArea({ sendChat }) {
  const [value, setValue] = useState("");

  const { activeChannel } = useChatsContext();

  const handleSendChat = () => {
    sendChat({
      id: value,
      username: "victor",
      timestamp: "11:46",
      message: value,
    });
  };

  /**
   * On Input Change
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendChat();
      setValue("");
    }
  };

  return (
    <section className="flex border-t">
      <div className="flex m-6 rounded-lg border-2 border-slate-400 overflow-hidden w-full">
        <input
          type="text"
          className="w-full px-4 outline-none"
          placeholder={`Message #${activeChannel?.name}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="text-slate-400 p-3  border-l-2 border-slate-400"
          onClick={handleSendChat}
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
