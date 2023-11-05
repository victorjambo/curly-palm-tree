import { SideNav } from "../components/side-nav";
import { MainChat } from "../components/main-chat";
import Toast from "../components/toast";
import AuthModals from "../components/modals/auth.modal";
import { useAuthContext } from "../context/auth.provider";
import { Navigate } from "react-router-dom";

function App() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <main className="h-screen flex">
        <SideNav />
        <MainChat />

        <Toast />
        <AuthModals />
      </main>
      {isAuth ? null : <Navigate to="/login" replace={true} />}
    </>
  );
}

export default App;
