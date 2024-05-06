import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};
