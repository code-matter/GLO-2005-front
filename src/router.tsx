import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <div>Login</div>,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
