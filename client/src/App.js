import { useEffect, useState } from "react";
import { SideNav } from "./components/side-nav";
import { MainChat } from "./components/main-chat";
import { useQuery } from "@apollo/client";
import { useAppContext } from "./context/app.provider";
import Toast from "./components/toast";
import AuthModals from "./components/modals/auth.modal";
import { USERS } from "./graphql/users";

const channels = ["general", "random"];

function App() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const { currentUser } = useAppContext();

  const { loading, error, data } = useQuery(USERS);

  useEffect(() => {
    console.log({ loading, error, data });
  }, [loading, error, data]);

  return (
    <main className="h-screen flex">
      <SideNav
        channels={channels}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        currentUser={currentUser}
      />
      <MainChat activeChannel={activeChannel} />

      <Toast />
      <AuthModals />
    </main>
  );
}

export default App;
