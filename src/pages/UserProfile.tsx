import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/slice/reduxHooks";
import { setUser, setToken } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phoneNumber || "",
  });

  if (!user) return null;

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  const handleSave = () => {
    toast.success("Profile updated ✅");
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5EF] to-[#F1E9DA] pt-24 px-4">
      
      {/* 🔥 MAIN CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* 🔥 HEADER / COVER */}
        <div className="h-40 bg-gradient-to-r from-[#C9A84C] to-[#8B6914] relative">
          <div className="absolute -bottom-12 left-8 flex items-center gap-5">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-white drop-shadow">
                {user.name}
              </h2>
              <p className="text-sm text-white/80">{user.email}</p>
            </div>
          </div>
        </div>

        {/* 🔥 CONTENT */}
        <div className="pt-16 px-8 pb-8">

          {/* ROLE BADGE */}
          <div className="mb-6">
            <span className="px-3 py-1 text-xs font-semibold bg-[#C9A84C]/10 text-[#8B6914] rounded-full capitalize">
              {user.role}
            </span>
          </div>

          {/* 🔥 FORM GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              {editMode ? (
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                />
              ) : (
                <p className="mt-1 font-medium text-gray-800">{user.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email Address</label>
              <p className="mt-1 font-medium text-gray-800">{user.email}</p>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              {editMode ? (
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                />
              ) : (
                <p className="mt-1 font-medium text-gray-800">
                  {user.phoneNumber || "Not added"}
                </p>
              )}
            </div>

          </div>

          {/* 🔥 ACTION BAR */}
          <div className="flex justify-between items-center mt-10 border-t pt-6">

            <div className="flex gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-[#C9A84C] hover:bg-[#b9963f] text-white px-5 py-2 rounded-lg font-semibold transition"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="border px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium hover:text-red-600 transition"
            >
              Logout →
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;