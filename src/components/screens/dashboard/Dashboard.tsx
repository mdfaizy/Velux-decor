import React, { useState } from "react";
import {
  Home,
  Users,
  ShoppingCart,
  Settings,
  Menu,
  X,
  ChevronDown, ChevronUp,
  Folder,
  Star,
} from "lucide-react";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import UserProfile from "../../../pages/auth/UserProfile";
import { useAppSelector } from "../../../redux/slice/reduxHooks";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);


 const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ UPDATED MENU (with child)
  const menuItems = [
    { label: "Dashboard", icon: Home, path: "overview" },

    {
      label: "Users",
      icon: Users,
      children: [
        { label: "All Users", path: "users" },
        { label: "Add User", path: "signup" },
      ],
    },

    // { label: "Create Category", icon: Folder, path: "category" },
    {
  label: "Category",
  icon: Folder,
  children: [
    { label: "All Categories", path: "categories" },
    { label: "Create Category", path: "category" },
  ],
},
{
  label: "Sub Category",
  icon: ShoppingCart, // ya Folder bhi use kar sakte ho
  children: [
    { label: "All SubCategories", path: "subcategories" },
    { label: "Create SubCategory", path: "subcategory" },
  ],
},

// ✅ PRODUCT (SEPARATE)
{
  label: "Product",
  icon: ShoppingCart,
  children: [
    { label: "All Products", path: "products" },
    { label: "Create Product", path: "product" },
  ],
},
    {
  label: "Reviews",
  icon: Star, // lucide-react
  children: [
    { label: "All Reviews", path: "reviews" },
    { label: "Create Review", path: "review" },
  ],
},
{

   label: "Consultations",
  icon: Star, // lucide-react
  children: [
    { label: "List Consultations", path: "consultations" },
    // { label: "Create Review", path: "review" },
  ],
  
},

{

   label: "Rooms Design",
  icon: Star, // lucide-react
  children: [
    { label: "Rooms Design", path: "showroom-video" },
    { label: "Create Rooms Design", path: "showroom-form" },
  ],
  
},

{

   label: "Contact List",
  icon: Star, // lucide-react
  children: [
    { label: "Contact List", path: "contact-list" },
  ],
  
},
    { label: "Settings", icon: Settings, path: "settings" },
  ];

  return (
    // <div className="flex h-screen bg-gray-100 overflow-hidden">
    <div className="flex h-screen bg-gray-100">
      
      {/* ===== MOBILE OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
<aside
  className={`
    fixed top-0 left-0 z-50 h-full bg-white shadow-lg
    transition-all duration-300 ease-in-out
    overflow-y-auto

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
    ${collapsed ? "lg:w-20" : "lg:w-72"}

    w-[260px]
  `}
>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && <h2 className="font-bold text-lg">Dashboard</h2>}

          <div className="flex gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block"
            >
              <Menu />
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X />
            </button>
          </div>
        </div>

        {/* ===== MENU ===== */}
      {/* <nav className="mt-4 px-2 space-y-1"> */}

{/* <nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">   */}
<nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto 
  scrollbar-thin 
  scrollbar-thumb-gray-400 
  scrollbar-track-gray-100
">
  {menuItems.map((item, index) => {
    const isParent = item.children;
    const isOpen = openMenu === index;

    return (
      <div key={index}>

        {/* 🔥 PARENT */}
        <button
          onClick={() => {
            if (isParent) {
              setOpenMenu(isOpen ? null : index);
            } else {
              // navigate(`/${user?.role}/${item.path}`);
              navigate(`/dashboard/${item.path}`);
              setSidebarOpen(false);
            }
          }}
          className={`
            flex items-center justify-between w-full px-4 py-3 rounded-lg
            transition-all duration-200 group
            ${
              isOpen
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* ICON */}
            <item.icon
              size={20}
              className={`
                transition
                ${
                  isOpen
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-blue-500"
                }
              `}
            />

            {/* LABEL */}
            {!collapsed && (
              // <span className="font-medium">
              <span className="font-medium truncate">
                {item.label}
              </span>
            )}

          </div>

          {/* 🔽 ARROW */}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}

        </button>

        {/* 🔥 CHILD MENU */}
        {isParent && isOpen && !collapsed && (
          // <div className="ml-10 mt-1 space-y-1 border-l pl-3">
<div className="ml-6 mt-1 space-y-1 border-l pl-3">
            {item.children.map((child, i) => {
            const isActive =
  user &&
  // location.pathname === `/${user.role}/${child.path}`;
  location.pathname === `/dashboard/${child.path}`;

              return (
                <button
                  key={i}
                  onClick={() => {
                    // navigate(`/dashboard/${child.path}`);
                    // navigate(`/${user.role}/${child.path}`);
                    navigate(`/dashboard/${child.path}`);
                    setSidebarOpen(false);
                  }}
                  className={`
                    flex items-center w-full text-left px-3 py-2 rounded-md text-sm transition
                    ${
                      isActive
                        ? "bg-blue-500 text-white shadow"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {/* 🔥 DOT ICON */}
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>

                  {child.label}
                </button>
              );
            })}

          </div>
        )}

      </div>
    );
  })}

</nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      {/* <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${collapsed ? "lg:ml-20" : "lg:ml-64"}
      `}
      > */}
      <div
  className={`
    flex flex-col flex-1 min-w-0
    transition-all duration-300

    ${collapsed ? "lg:ml-20" : "lg:ml-72"}
  `}
>
        {/* ===== HEADER ===== */}
        {/* <header
          className={`
            bg-white shadow flex items-center justify-between
            px-4 md:px-6 transition-all duration-300
            ${collapsed ? "h-14" : "h-20"}
          `}
        > */}
        <header
  className={`
    sticky top-0 z-30
    bg-white border-b
    flex items-center justify-between
    px-4 md:px-6
    transition-all duration-300

    ${collapsed ? "h-14" : "h-16"}
  `}
>
         {/* <div className="flex"> */}
        <div className="flex items-center gap-3">

  {/* Mobile Menu */}
  <button
    className="lg:hidden"
    onClick={() => setSidebarOpen(true)}
  >
    <Menu size={24} />
  </button>

  {/* Home Button */}
  <button
    onClick={() => navigate("/")}
    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-500 transition"
  >
    <Home size={18} />
    <span className="hidden sm:inline">Home</span>
  </button>

  {/* Title */}
  <h1 className="text-lg md:text-xl font-semibold">
    Admin Panel
  </h1>

</div>
{/* <UserProfile/> */}
<div className="flex items-center gap-3">

  {/* Mobile Menu */}
  <button
    className="lg:hidden"
    onClick={() => setSidebarOpen(true)}
  >
    <Menu size={24} />
  </button>

  {/* Home Button */}
  <button
    onClick={() => navigate("/")}
    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-500 transition"
  >
    <Home size={18} />
    <span className="hidden sm:inline">Home</span>
  </button>

  {/* Title */}
  <h1 className="text-lg md:text-xl font-semibold">
    Admin Panel
  </h1>

</div>
        </header>

        {/* ===== CONTENT ===== */}
        {/* <main className="flex-1 p-4 md:p-6 overflow-y-auto"> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 md:p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;