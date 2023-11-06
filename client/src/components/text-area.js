import { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT } from "../graphql/chats";
import { useAppContext } from "../context/app.provider";

/**
 * Input field component
 * @returns {React.JSX.Element}
 */
export function TextArea() {
  const [value, setValue] = useState("");

  const { activeChannel } = useAppContext();

  const [createChat, { data, loading }] = useMutation(CREATE_CHAT);

  useEffect(() => {
    if (loading) return;
    if (data && data.createChat.success) {
      setValue("");
    }
  }, [loading]);

  const handleSendChat = () => {
    createChat({
      variables: {
        message: value,
        channelId: activeChannel.id,
      },
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
          <PaperAirplaneIcon
            className={`w-5 h-5 ${value ? "text-[#4f87f6]" : ""}`}
          />
        </button>
      </div>
    </section>
  );
}
