import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/shared/Login/Login";
import ManageGenres from "../pages/dashboard/ManageGenres";
import PrivateRoute from "./PrivateRoute";
import ManageBooks from "../pages/dashboard/ManageBooks.jsx";
import EditBook from "../pages/dashboard/EditBook.jsx";
import CreateBook from "../pages/dashboard/CreateBook.jsx";
import ManageUsers from "../pages/dashboard/ManageUsers.jsx";
import AdminRoute from "./AdminRoute.jsx";
import BrowseBook from "../pages/dashboard/BrowseBook.jsx";
import BookDetails from "../pages/dashboard/BookDetails.jsx";
import MyLibrary from "../pages/dashboard/MyLibrary.jsx";
import ModerateReviews from "../pages/dashboard/ModerateReviews.jsx";
import Home from "../pages/Home.jsx";
import Register from "../pages/shared/Register/Register.jsx";

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
        index: true,
        element: <Home />,
      },
      {
        path: "admin/manage-genres",
        element: (
          <AdminRoute>
            <ManageGenres />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: `/admin/update/:id`,
        element: (
          <AdminRoute>
            <EditBook />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-books/create",
        element: (
          <AdminRoute>
            <CreateBook />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/moderate-reviews",
        element: (
          <AdminRoute>
            <ModerateReviews />
          </AdminRoute>
        ),
      },
      {
        path: "user/browse-book",
        element: <BrowseBook />,
      },
      {
        path: "/book/details/:id",
        element: <BookDetails />,
      },
      {
        path: "/user/my-library",
        element: <MyLibrary />,
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
