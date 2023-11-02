import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { MainChat } from "./components/main-chat";

function App() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [currentUser] = useState({
    username: "victor",
    id: 1
  });

  return (
    <main className="h-screen flex">
      <SideNav
        channels={channels}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        currentUser={currentUser}
      />
      <MainChat activeChannel={activeChannel} />
    </main>
  );
}

export default App;

const channels = ["general", "random"];
