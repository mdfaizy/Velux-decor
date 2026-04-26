// import React, { useState } from "react";
// import {
//   Home,
//   Users,
//   ShoppingCart,
//   Settings,
//   Menu,
//   X,
//   Plus,
//   Folder,
// } from "lucide-react";

// import { Outlet, useNavigate, useLocation } from "react-router-dom";

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false); // mobile default closed
//   const [collapsed, setCollapsed] = useState(false); // desktop collapse

//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { label: "Dashboard", icon: Home, path: "overview" },
//     { label: "Signup", icon: Plus, path: "signup" },
//     { label: "Users", icon: Users, path: "users" },
//     { label: "Create Category", icon: Folder, path: "category" },
//     { label: "Create Product", icon: ShoppingCart, path: "product" },
//     { label: "Settings", icon: Settings, path: "settings" },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">
      
//       {/* ===== MOBILE OVERLAY ===== */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* ===== SIDEBAR ===== */}
//       <aside
//         className={`
//         fixed z-50 top-0 left-0 h-full bg-white shadow-lg transition-all duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//         lg:translate-x-0
//         ${collapsed ? "lg:w-20" : "lg:w-64"}
//         w-64
//         `}
//       >
//         {/* Header */}
//         <div className="p-4 flex items-center justify-between border-b">
//           {!collapsed && <h2 className="font-bold text-lg">Dashboard</h2>}

//           <div className="flex gap-2">
//             {/* Desktop collapse */}
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="hidden lg:block"
//             >
//               <Menu />
//             </button>

//             {/* Mobile close */}
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden"
//             >
//               <X />
//             </button>
//           </div>
//         </div>

//         {/* Menu */}
//         <nav className="mt-5 space-y-1 px-2">
//           {menuItems.map((item, index) => {
//             const isActive =
//               location.pathname === `/dashboard/${item.path}`;

//             return (
//               <button
//                 key={index}
//                 onClick={() => {
//                   navigate(`/dashboard/${item.path}`);
//                   setSidebarOpen(false);
//                 }}
//                 className={`
//                   flex items-center w-full px-4 py-3 rounded-lg transition
//                   ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
//                 `}
//               >
//                 <item.icon size={20} />
//                 {!collapsed && (
//                   <span className="ml-3 font-medium">{item.label}</span>
//                 )}
//               </button>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* ===== MAIN CONTENT ===== */}
//   <div
//   className={`flex-1 flex flex-col transition-all duration-300
//   ${collapsed ? "lg:ml-20" : "lg:ml-64"}
// `}
// >
        
//         {/* HEADER */}
//       <header
//   className={`
//     bg-white shadow flex items-center justify-between
//     px-4 md:px-6 transition-all duration-300
//     ${collapsed ? "h-14" : "h-20"}
//   `}
// >
//   {/* Left */}
//   <div className="flex items-center gap-3">
//     <button
//       className="lg:hidden"
//       onClick={() => setSidebarOpen(true)}
//     >
//       <Menu />
//     </button>

//     <h1 className="text-lg md:text-xl font-bold">
//       Admin Panel
//     </h1>
//   </div>

//   {/* Right */}
//   <div className="flex items-center gap-4">
//     <span className="hidden md:block text-gray-600">
//       Welcome Admin 👋
//     </span>

//     <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center">
//       A
//     </div>
//   </div>
// </header>

//         {/* CONTENT */}
//         <main className="flex-1 p-4 md:p-6 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from "react";
import {
  Home,
  Users,
  ShoppingCart,
  Settings,
  Menu,
  X,
  ChevronDown, ChevronUp,
  Plus,
  Folder,
  Star,
} from "lucide-react";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import UserProfile from "../../../pages/auth/UserProfile";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

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
    { label: "Create Rooms Design", path: "showroom-from" },
  ],
  
},
    { label: "Settings", icon: Settings, path: "settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* ===== MOBILE OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
        fixed z-50 top-0 left-0 h-full bg-white shadow-lg transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
        ${collapsed ? "lg:w-20" : "lg:w-64"}
        w-64
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
      <nav className="mt-4 px-2 space-y-1">

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
              <span className="font-medium">
                {item.label}
              </span>
            )}

          </div>

          {/* 🔽 ARROW */}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}

        </button>

        {/* 🔥 CHILD MENU */}
        {isParent && isOpen && !collapsed && (
          <div className="ml-10 mt-1 space-y-1 border-l pl-3">

            {item.children.map((child, i) => {
              const isActive =
                location.pathname === `/dashboard/${child.path}`;

              return (
                <button
                  key={i}
                  onClick={() => {
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
      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${collapsed ? "lg:ml-20" : "lg:ml-64"}
      `}
      >
        {/* ===== HEADER ===== */}
        <header
          className={`
            bg-white shadow flex items-center justify-between
            px-4 md:px-6 transition-all duration-300
            ${collapsed ? "h-14" : "h-20"}
          `}
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </button>

            <h1 className="text-lg md:text-xl font-bold">
              Admin Panel
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* <span className="hidden md:block text-gray-600">
              Welcome Admin 👋
            </span>

            <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center">
              A
            </div> */}

            <UserProfile />
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;