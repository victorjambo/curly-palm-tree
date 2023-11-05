import { useRef, useEffect } from "react";
import { useChatsContext } from "../context/chats.provider";
import { Chat } from "./chat";

export function Chats() {
  const { chats } = useChatsContext();

  const ref = useRef(null);
  useEffect(() => {
    if (chats.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chats.length]);

  return (
    <section className="flex-1 h-full flex-col overflow-scroll">
      <div className="flex w-full">
        <div className="flex flex-col w-full">
          {chats.length ? (
            chats.map((chat) => <Chat key={chat.id} chat={chat} />)
          ) : (
            <div className="p-4">No Chats</div>
          )}
          <div ref={ref} />
        </div>
      </div>
    </section>
  );
}
