import React, { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/slice/reduxHooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useAppSelector((state) => state.auth); // ✅ GET USER
  console.log(user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 👉 outside click close
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👉 initials (A, M, etc.)
  const getInitial = () => {
    if (!user?.name) return "A";
    return user.name.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <span className="hidden md:block text-gray-600">
          Welcome {user?.name || "Admin"} 👋
        </span>

        <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center">
          {getInitial()}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-lg border z-50">

          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "admin@gmail.com"}
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/profile")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/dashboard/settings")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;