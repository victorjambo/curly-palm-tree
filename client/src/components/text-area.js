import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

/**
 * Input field component
 * @param {{
 *   activeChannel: string;
 *   sendChat: (message: {
 *     id: string;
 *     img: string;
 *     username: string;
 *     timestamp: string;
 *     message: string;
 *   }) => void;
 * }}
 * @returns React.JSX.Element
 */
export function TextArea({ activeChannel, sendChat }) {
  const [value, setValue] = useState("");

  const handleSendChat = () => {
    sendChat({
      id: value,
      img: "https://avatars2.githubusercontent.com/u/343407?s=460&v=4",
      username: "victor",
      timestamp: "11:46",
      message: value,
    });
  };

  /**
   * On Input Change
   * @param {React.KeyboardEvent<HTMLInputElement>} e
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
          placeholder={`Message #${activeChannel}`}
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
