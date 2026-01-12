import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/shared/Login/Login";
import Register from "../pages/shared/register/register";
import ManageGenres from "../pages/dashboard/ManageGenres";
import PrivateRoute from "./PrivateRoute";
import ManageBooks from "../pages/dashboard/ManageBooks.jsx";
import EditBook from "../pages/dashboard/EditBook.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin/manage-genres",
        element: <ManageGenres />,
      },
      {
        path: "/admin/manage-books",
        element: <ManageBooks />,
      },
      {
        path: `/admin/update/:id`,
        element: <EditBook />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
