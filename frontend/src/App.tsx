import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { SideNavigation } from "./components/SideNavigation";
import "./global.css";

const App: FC = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className={"flex"}>
        <SideNavigation />
        <div
          className={"bg-gray-50 text-black w-[calc(100vw-400px)] inline p-8"}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
