import { Chat } from "./chat";

/**
 * Chats component
 * @param {{
 *   chats: {
 *     id: string;
 *     username: string;
 *     timestamp: string;
 *     message: string;
 *   }[]
 * }}
 * @returns React.JSX.Element
 */
export function Chats({ chats }) {
  return (
    <section className="flex-1 h-full flex-col overflow-scroll">
      <div className="flex w-full">
        <div className="flex flex-col w-full">
          {chats.map((chat) => (
            <Chat key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </section>
  );
}
