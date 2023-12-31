import { Chats } from "./chats";
import Header from "./header";
import { TextArea } from "./text-area";
import { MENTION } from "../graphql/chats";
import { useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useAppContext } from "../context/app.provider";

/**
 * Main chat component
 * @returns {React.JSX.Element}
 */
export function MainChat() {
  const { handleToast, currentUser } = useAppContext();
  const { data, loading } = useSubscription(MENTION);

  useEffect(() => {
    if (loading || !data?.mention) return;

    if (
      data.mention.to === currentUser.id &&
      data.mention.from !== currentUser.id
    ) {
      handleToast?.(
        data.mention.message,
        undefined,
        `Mention in #${data.mention.channel}`
      );
    }
  }, [loading, JSON.stringify(data), currentUser]);

  return (
    <div className="w-2/3 lg:w-5/6 h-full flex flex-col">
      <Header />
      <Chats />
      <TextArea />
    </div>
  );
}
