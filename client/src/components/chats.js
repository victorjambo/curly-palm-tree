import { useSubscription } from "@apollo/client";
import { useChatsContext } from "../context/chats.provider";
import { Chat } from "./chat";
import { NEW_CHAT_ADDED } from "../graphql/chats";
import { useEffect } from "react";

export function Chats() {
  const { chats } = useChatsContext();

  // const { data, loading } = useSubscription(NEW_CHAT_ADDED, {
  //   variables: { chatId: 1 },
  // });

  // useEffect(() => {
  //   console.log({ data, loading });
  // }, [data, loading]);

  return (
    <section className="flex-1 h-full flex-col overflow-scroll">
      <div className="flex w-full">
        <div className="flex flex-col w-full">
          {chats.length ? (
            chats.map((chat) => <Chat key={chat.id} chat={chat} />)
          ) : (
            <div className="p-4">No Chats</div>
          )}
        </div>
      </div>
    </section>
  );
}
