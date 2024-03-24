import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Compagnons from "./pages/Compagnons/Compagnons";
import Compagnon from "./pages/Compagnons/Compagnon/Compagnon";
import Publications from "./pages/Publications/Publications";
import Publication from "./pages/Publications/Publication/Publication";
import Countries from "./pages/Countries/Countries";
import Country from "./pages/Countries/Country/Country";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:username",
    element: <Profile />
  },
  {
    path: "/connexion",
    element: <Login />,
  },
  {
    path: "/inscription",
    element: <Register />,
  },
  { path: "/compagnons", element: <Compagnons /> },
  { path: "/compagnons/:compagnonId", element: <Compagnon /> },
  { path: "/publications", element: <Publications /> },
  { path: "/publications/:publicationId", element: <Publication /> },
  { path: "/pays", element: <Countries /> },
  { path: "/pays/:paysId", element: <Country /> },
  { path: "/configuration", element: <Settings /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
