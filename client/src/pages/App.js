import { SideNav } from "../components/side-nav";
import { MainChat } from "../components/main-chat";
import Toast from "../components/toast";

function App() {
  return (
    <main className="h-screen flex">
      <SideNav />
      <MainChat />
      <Toast />
    </main>
  );
}

export default App;
