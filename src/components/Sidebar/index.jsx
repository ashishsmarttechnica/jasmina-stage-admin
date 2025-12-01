import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import MobileIconButton from "./mobileIconButton";
import useSidebar from "../../hooks/useSidebar";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarExpanded,
    setSidebarExpanded,
    trigger,
    sidebar,
  } = useSidebar();

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-1 flex h-screen w-[250px] flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2  pt-4 ">
        <NavLink to="/" className="text-center font-bold w-full ">
          <div className="uppercase text-white text-[29px] tracking-widest">
          Jasmina

          </div>
        </NavLink>
        {/* mobileIconButton */}
        <MobileIconButton
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          trigger={trigger}
        />
        {/* mobileIconButton */}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <SidebarMenu
        pathname={pathname}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
    </aside>
  );
};

export default Sidebar;
