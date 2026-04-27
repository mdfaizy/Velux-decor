import React from "react";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      icon: Users,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Total Products",
      value: "320",
      icon: ShoppingCart,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Revenue",
      value: "₹85,400",
      icon: DollarSign,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Growth",
      value: "+12.5%",
      icon: TrendingUp,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome back! Here's what's happening today 🚀
        </p>
      </div>

      {/* 🔥 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>

              <div
                className={`p-3 rounded-full ${item.bg}`}
              >
                <item.icon className={`w-5 h-5 ${item.text}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Activity */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4 text-gray-700">
            Recent Activity
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>🟢 New user registered</li>
            <li>📦 Product added</li>
            <li>💰 Payment received</li>
            <li>⭐ New review submitted</li>
          </ul>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4 text-gray-700">
            Sales Overview
          </h3>

          <div className="h-40 flex items-center justify-center text-gray-400">
            Chart will go here 📊
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;