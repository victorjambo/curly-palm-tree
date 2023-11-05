import { SideNav } from "../components/side-nav";
import { MainChat } from "../components/main-chat";
import Toast from "../components/toast";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/app.provider";

function App() {
  const { isAuthenticated } = useAppContext();
  return (
    <>
      <main className="h-screen flex">
        <SideNav />
        <MainChat />
        <Toast />
      </main>
      {isAuthenticated ? null : <Navigate to="/login" replace={true} />}
    </>
  );
}

export default App;
