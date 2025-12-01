import { IoIosArrowDown } from "react-icons/io";
// import { permissionData } from "../../common/Permission/PermissionData";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import getIconComponent from "../getIconComponent";
import React from "react";
import IconComponent from "../IconComponent";
import { SuperpermissionData } from "../../common/Permission/SuperAdminPermissionData";

const SidebarMenu = ({ pathname, sidebarExpanded, setSidebarExpanded }) => {
  const { user } = useSelector((state) => state.loginUser);
  // console.log(user.role, 'user');
  const menuData =
    user?.role?.role === "Superadmin" ? SuperpermissionData : user?.role?.permission || [];
  console.log(menuData, 'menuData');

  return (
    <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
      <nav className="py-4 px-2">
        <div>
          <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
            MENU
          </h3>
          <ul className="mb-4 flex flex-col gap-[8px]">
            {menuData.map((item, index) =>
              item.subMenuExist ? (
                <SidebarLinkGroup
                  key={index}
                  activeCondition={
                    pathname.includes(item.mainpath) ||
                    item.subMenu.some(subItem => pathname === subItem.path)
                  }
                >
                  {(handleClick, open) => (
                    <>
                      <div
                        className={`group  relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 hover:text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 select-none cursor-pointer ${pathname.includes(item.mainpath) &&
                          "bg-graydark dark:bg-meta-4 pointer-events-none"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <IconComponent name={item.icon} />
                        {item.text}
                        <IoIosArrowDown
                          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${open && "rotate-180"
                            }`}
                        />
                      </div>
                      {/*  */}
                      <div
                        className={` transition-all duration-500 ease-out w-full justify-center items-center ${open ? " opacity-100" : " opacity-0 overflow-hidden"
                          }`}
                        style={{
                          maxHeight: open
                            ? `${item.subMenu.length * 40}px`
                            : "0px", // Adjust based on items
                          opacity: open ? 1 : 0,
                        }}
                      >
                        <ul className="my-2  flex flex-col gap-1 pl-6 select-none">
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavLink
                                to={subItem.path}
                                className={({ isActive }) =>
                                  "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 hover:text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 focus:text-bodydark1 " +
                                  (isActive &&
                                    "bg-graydark dark:bg-meta-4 pointer-events-none")
                                }
                              >
                                {subItem.text}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              ) : (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 hover:text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(item.path) &&
                      "bg-graydark dark:bg-meta-4 pointer-events-none"
                      }`}
                  >
                    {/* {item.icon} */}
                    <IconComponent name={item.icon} />
                    {item.text}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SidebarMenu;
