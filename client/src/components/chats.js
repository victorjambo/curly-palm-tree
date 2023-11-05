import { useRef, useEffect, useState } from "react";
import { useAppContext } from "../context/app.provider";
import { Chat } from "./chat";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export function Chats() {
  const { channels, activeChannel } = useAppContext();

  const [chats, setChats] = useState([]);

  const ref = useRef(null);
  useSmoothScroll({ len: chats.length, ref });

  useEffect(() => {
    const channel = channels.find((channel) => channel.id === activeChannel.id);
    if (channel) {
      setChats(channel.chats);
    } else {
      setChats([]);
    }
  }, [activeChannel.id, channels]);

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
