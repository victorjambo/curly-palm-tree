import { useEffect, useState } from "react";
import { SideNav } from "./components/side-nav";
import { MainChat } from "./components/main-chat";
import { useQuery, gql } from "@apollo/client";

const USERS = gql`
  query Users {
    users {
      id
      username
    }
  }
`;

function App() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [currentUser] = useState({
    username: "victor",
    id: 1,
  });

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
    </main>
  );
}

export default App;

const channels = ["general", "random"];
