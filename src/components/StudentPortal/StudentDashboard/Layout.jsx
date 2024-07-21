import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <Header />
      <div className="w-full p-[5rem] pr-[1rem] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
