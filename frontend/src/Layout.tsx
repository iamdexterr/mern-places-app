import React from "react";
import { HeroHeader } from "./components/ui/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <HeroHeader />
      <main className="flex-1  bg-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
