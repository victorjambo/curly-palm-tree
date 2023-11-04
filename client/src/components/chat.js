import moment from "moment";
import Jazzicon from "./avatar";

/**
 * Chat component
 * @param {Object} props
 * @param {Chat} props.chat
 * @typedef Chat
 * @type {Object}
 * @property {number} id
 * @property {string} message
 * @property {Object} user
 * @property {number} user.id
 * @property {string} user.username
 * @property {string} createdAt
 * @returns {React.JSX.Element}
 */
export function Chat({ chat }) {
  return (
    <div className="flex items-center p-4 hover:bg-slate-100">
      <div className="mr-3">
        <Jazzicon size={35} username={chat.user.username} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold text-md mr-2 font-sans">
            @{chat.user.username}
          </span>
          <span className="text-slate-400 text-sm font-light">{moment(Number(chat.createdAt)).fromNow()}</span>
        </div>
        <p className="font-light text-md text-grey-darkest pt-1">
          {chat.message}
        </p>
      </div>
    </div>
  );
}
