import { useRef, useEffect, useState } from "react";
import { useAppContext } from "../context/app.provider";
import { Chat } from "./chat";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useSubscription } from "@apollo/client";
import { MENTION, POST_CREATED } from "../graphql/chats";
import { updateChatsInChannel, findChatsInChannels } from "../utils/utils";

export function Chats() {
  const { channels, activeChannel, setChannels, handleToast, currentUser } =
    useAppContext();
  const { data, loading } = useSubscription(POST_CREATED);
  const { data: mention, loading: mentionLoading } = useSubscription(MENTION);

  const [chats, setChats] = useState([]);

  const ref = useRef(null);
  useSmoothScroll({ len: chats.length, ref });

  useEffect(() => {
    if (loading || !data?.postCreated) return;
    const updatedChannels = updateChatsInChannel(
      channels,
      data.postCreated.channel.id,
      data.postCreated
    );
    setChannels(updatedChannels);
  }, [loading, JSON.stringify(data)]);

  useEffect(() => {
    if (!channels.length) return;
    setChats(findChatsInChannels(channels, activeChannel.id));
  }, [activeChannel, channels]);

  useEffect(() => {
    console.log("🚀 ~ mention:", mention)
    if (mentionLoading) return;

    if (mention?.mention?.user?.id === currentUser?.id) {
      handleToast?.(
        `You have been mentioned in #${mention?.mention.channel} channel`,
        "SUCCESS"
      );
    }
  }, [mentionLoading, JSON.stringify(mention)]);

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
