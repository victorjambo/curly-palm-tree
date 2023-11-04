import { Chat } from "./chat";

/**
 * @param {Object} props
 * @param {Chat[]} props.chats
 * @typedef Chat
 * @type {Object}
 * @property {number} id
 * @property {string} message
 * @property {string} username
 * @property {string} timestamp
 * @returns {React.JSX.Element}
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
