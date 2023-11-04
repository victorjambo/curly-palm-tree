import Jazzicon from "../utils/avatar";

/**
 * Single Chat component
 * @param {{
 *   chat: {
 *     id: string;
 *     username: string;
 *     timestamp: string;
 *     message: string;
 *   }
 * }}
 * @returns React.JSX.Element
 */
export function Chat({ chat }) {
  return (
    <div className="flex items-center p-4 hover:bg-slate-100">
      <div className="mr-3">
        <Jazzicon size={35} username={chat.username} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold text-md mr-2 font-sans">
            @{chat.username}
          </span>
          <span className="text-grey text-xs font-light">{chat.timestamp}</span>
        </div>
        <p className="font-light text-md text-grey-darkest pt-1">
          {chat.message}
        </p>
      </div>
    </div>
  );
}
