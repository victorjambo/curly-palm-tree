import { Chats } from "./chats";
import Header from "./header";
import { TextArea } from "./text-area";

/**
 * Main chat component
 * @returns {React.JSX.Element}
 */
export function MainChat() {
  return (
    <div className="w-5/6 h-full flex flex-col">
      <Header />
      <Chats />
      <TextArea />
    </div>
  );
}
