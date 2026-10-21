import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Folder,
  FolderTree,
  Package,
  Star,
  CalendarCheck,
  Sofa,
  Inbox,
  Megaphone,
  MessageCircle,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import UserProfile from "../../../pages/auth/UserProfile";

type MenuChild = { label: string; path: string };
type MenuItem = {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: MenuChild[];
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "overview" },
  {
    label: "Users",
    icon: Users,
    children: [
      { label: "All Users", path: "users" },
      { label: "Add User", path: "signup" },
    ],
  },
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
    icon: FolderTree,
    children: [
      { label: "All SubCategories", path: "subcategories" },
      { label: "Create SubCategory", path: "subcategory" },
    ],
  },
  {
    label: "Product",
    icon: Package,
    children: [
      { label: "All Products", path: "products" },
      { label: "Create Product", path: "product" },
    ],
  },
  {
    label: "Reviews",
    icon: Star,
    children: [{ label: "Customer Reviews", path: "reviews" }],
  },
  {
    label: "Consultations",
    icon: CalendarCheck,
    children: [{ label: "List Consultations", path: "consultations" }],
  },
  {
    label: "Rooms Design",
    icon: Sofa,
    children: [
      { label: "Rooms Design", path: "showroom-video" },
      { label: "Create Rooms Design", path: "showroom-form" },
    ],
  },
  {
    label: "Contacts & Enquiries",
    icon: Inbox,
    children: [
      { label: "Contact List", path: "contact-list" },
      { label: "Enquiries", path: "enquiry" },
    ],
  },
  {
    label: "Offers Banner",
    icon: Megaphone,
    children: [{ label: "Manage Offers", path: "offers" }],
  },
  {
    label: "WhatsApp Marketing",
    icon: MessageCircle,
    children: [
      { label: "Customers", path: "customers" },
      { label: "Send Broadcast", path: "whatsapp-broadcast" },
    ],
  },
];

const GOLD = "#C9A84C";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop icon-only mode
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.replace(/^\/dashboard\/?/, "");
  const isActive = (path?: string) => !!path && currentPath === path;
  const parentOfCurrent = menuItems.findIndex((m) =>
    m.children?.some((c) => c.path === currentPath)
  );

  const [openMenu, setOpenMenu] = useState<number | null>(
    parentOfCurrent >= 0 ? parentOfCurrent : null
  );

  // keep the section of the current page expanded
  useEffect(() => {
    if (parentOfCurrent >= 0) setOpenMenu(parentOfCurrent);
  }, [parentOfCurrent]);

  const pageTitle =
    menuItems.flatMap((m) => m.children || [m]).find((c) => c.path === currentPath)
      ?.label || "Admin Panel";

  const go = (path: string) => {
    navigate(`/dashboard/${path}`);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-shell flex h-screen bg-[#FAF7F2]">

      {/* ===== MOBILE OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-20" : "lg:w-72"}
          w-[270px]
        `}
        style={{
          background: "linear-gradient(180deg,#2A1D14 0%,#3D2B1F 55%,#2A1D14 100%)",
          boxShadow: "4px 0 24px rgba(42,29,20,0.18)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between gap-3 px-5 h-[72px] border-b border-white/10 shrink-0">
          <button
            onClick={() => go("overview")}
            className="flex items-center gap-3 min-w-0"
            title="Velux Decor Admin"
          >
            <span
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-lg"
              style={{ background: "linear-gradient(135deg,#C9A84C,#8B6914)" }}
            >
              VD
            </span>
            {!collapsed && (
              <span className="text-left leading-tight min-w-0">
                <span
                  className="block text-[17px] font-bold text-[#FAF7F2] truncate"
                  style={{ fontFamily: "'Playfair Display',serif" }}
                >
                  Velux Decor
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                  Admin Panel
                </span>
              </span>
            )}
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {menuItems.map((item, index) => {
            const hasChildren = !!item.children;
            const isOpen = openMenu === index;
            const sectionActive = isActive(item.path) || index === parentOfCurrent;
            const Icon = item.icon;

            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      if (collapsed) setCollapsed(false);
                      setOpenMenu(isOpen ? null : index);
                    } else if (item.path) {
                      go(item.path);
                    }
                  }}
                  title={collapsed ? item.label : undefined}
                  className={`
                    group flex items-center w-full gap-3 rounded-xl px-3 py-2.5 text-left
                    transition-colors duration-200
                    ${collapsed ? "lg:justify-center" : ""}
                    ${
                      sectionActive
                        ? "bg-[#C9A84C]/15 text-[#E8C97A]"
                        : "text-[#FAF7F2]/75 hover:bg-white/5 hover:text-[#FAF7F2]"
                    }
                  `}
                >
                  <Icon
                    size={19}
                    className={`shrink-0 ${sectionActive ? "text-[#E8C97A]" : "text-[#C9A84C]/80 group-hover:text-[#C9A84C]"}`}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate text-[14px] font-medium">{item.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          size={16}
                          className={`shrink-0 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* Children */}
                {hasChildren && isOpen && !collapsed && (
                  <div className="ml-[22px] mt-1 mb-2 border-l border-[#C9A84C]/25 pl-3 space-y-0.5">
                    {item.children!.map((child) => {
                      const active = isActive(child.path);
                      return (
                        <button
                          key={child.path}
                          onClick={() => go(child.path)}
                          className={`
                            relative flex items-center w-full rounded-lg px-3 py-2 text-left text-[13px]
                            transition-colors duration-200
                            ${
                              active
                                ? "bg-gradient-to-r from-[#C9A84C] to-[#B8963F] text-[#2A1D14] font-semibold shadow-[0_4px_14px_rgba(201,168,76,0.3)]"
                                : "text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-white/5"
                            }
                          `}
                        >
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

        {/* Footer */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? "View website" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-white/5 transition ${
              collapsed ? "lg:justify-center" : ""
            }`}
          >
            <ExternalLink size={17} className="text-[#C9A84C] shrink-0" />
            {!collapsed && "View website"}
          </a>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-30 h-[72px] shrink-0 flex items-center justify-between gap-4 px-4 md:px-8 border-b border-[#C9A84C]/15"
          style={{ background: "rgba(250,247,242,0.9)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden p-2 rounded-lg text-[#3D2B1F] hover:bg-[#C9A84C]/10"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <button
              className="hidden lg:flex p-2 rounded-lg text-[#6B4C3B] hover:bg-[#C9A84C]/10 hover:text-[#3D2B1F]"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                Velux Decor
              </p>
              <h1
                className="text-lg md:text-[22px] font-bold text-[#3D2B1F] truncate leading-tight"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                {pageTitle}
              </h1>
            </div>
          </div>

          <UserProfile />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
