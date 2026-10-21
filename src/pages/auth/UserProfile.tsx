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
        <span className="hidden md:block text-right leading-tight">
          <span className="block text-[11px] text-[#8A8278]">Welcome back</span>
          <span className="block text-sm font-semibold text-[#3D2B1F]">{user?.name || "Admin"}</span>
        </span>

        <div
          className="w-10 h-10 text-white font-bold rounded-full flex items-center justify-center ring-2 ring-[#C9A84C]/30 ring-offset-2 ring-offset-[#FAF7F2]"
          style={{ background: "linear-gradient(135deg,#C9A84C,#8B6914)" }}
        >
          {getInitial()}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-60 bg-white shadow-[0_16px_40px_rgba(61,43,31,0.15)] rounded-xl border border-[#EFE6D8] z-50 overflow-hidden">

          {/* User Info */}
          <div className="px-4 py-3 bg-[#FBF7EE] border-b border-[#EFE6D8]">
            <p className="text-sm font-semibold text-[#3D2B1F]">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-[#8A8278] truncate">
              {user?.email || "admin@gmail.com"}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full text-left px-4 py-2.5 hover:bg-[#FBF7EE] text-sm text-[#5C4033]"
          >
            Go to website
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 border-t border-[#EFE6D8]"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;