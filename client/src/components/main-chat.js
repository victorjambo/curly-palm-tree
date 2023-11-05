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

  return (
    <div className="w-5/6 h-full flex flex-col">
      <header className="flex w-full py-4 border-b bg-white">
        <div className="px-4 text-lg flex flex-row items-center">
          <HashtagIcon className="w-4 h-4" />
          <span>{activeChannel?.name ?? 'Channel'}</span>
        </div>
      </header>
      <Chats />
      <TextArea />
    </div>
  );
}
