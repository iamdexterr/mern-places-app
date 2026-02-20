import { createBrowserRouter } from "react-router";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import NewPlaces from "./pages/places/NewPlaces";
import UserPlaces from "./pages/UserPlaces";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      { path: "auth", element: <LoginPage /> },
      { path: "/:userId/places", element: <UserPlaces /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "places/new", element: <NewPlaces key="create" /> },
          { path: "places/:placeId", element: <NewPlaces key="edit" /> },
        ],
      },
    ],
  },
]);
