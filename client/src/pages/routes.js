import App from "./App";
import Auth from "./Auth";
import { createBrowserRouter, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("chat-user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Auth />,
  },
]);
