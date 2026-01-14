import React from "react";
import AdminHome from "./dashboard/AdminHome";
import { useAuth } from "../hooks/useAuth";
import UserHome from "./dashboard/UserHome";

const Home = () => {
  const { user } = useAuth();
  return <div>{user.role === "admin" ? <AdminHome /> : <UserHome />}</div>;
};

export default Home;
