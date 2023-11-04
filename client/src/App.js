import { SideNav } from "./components/side-nav";
import { MainChat } from "./components/main-chat";
import Toast from "./components/toast";
import AuthModals from "./components/modals/auth.modal";

function App() {
  return (
    <main className="h-screen flex">
      <SideNav />
      <MainChat />

      <Toast />
      <AuthModals />
    </main>
  );
}

export default App;
