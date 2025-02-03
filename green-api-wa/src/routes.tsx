import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/registration/Login";
import ChatPage from "./pages/chat-page/ChatPage";
import MainLayout from "./layouts/main-layout/MainLayout";
import AuthLayout from "./layouts/auth-layout/AuthLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "chatpage",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default routes;
