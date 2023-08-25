import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Back } from "../components/Back";

export const Layout = () => {
  return (
    <>
      <div className="layout-bar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/browse">Browse</NavLink>
      </div>
      <div className="body-container">
        <Back />
        <Outlet />
      </div>
    </>
  );
};
