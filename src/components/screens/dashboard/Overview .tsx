// import React from "react";
// import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

// const Overview = () => {
//   const stats = [
//     {
//       title: "Total Users",
//       value: "1,245",
//       icon: Users,
//       bg: "bg-blue-100",
//       text: "text-blue-600",
//     },
//     {
//       title: "Total Products",
//       value: "320",
//       icon: ShoppingCart,
//       bg: "bg-green-100",
//       text: "text-green-600",
//     },
//     {
//       title: "Revenue",
//       value: "₹85,400",
//       icon: DollarSign,
//       bg: "bg-yellow-100",
//       text: "text-yellow-600",
//     },
//     {
//       title: "Growth",
//       value: "+12.5%",
//       icon: TrendingUp,
//       bg: "bg-purple-100",
//       text: "text-purple-600",
//     },
//   ];

//   return (
//     <div className="space-y-6">

//       {/* 🔥 Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">
//           Dashboard Overview
//         </h1>
//         <p className="text-gray-500 text-sm">
//           Welcome back! Here's what's happening today 🚀
//         </p>
//       </div>

//       {/* 🔥 Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((item, i) => (
//           <div
//             key={i}
//             className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">{item.title}</p>
//                 <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
//               </div>

//               <div
//                 className={`p-3 rounded-full ${item.bg}`}
//               >
//                 <item.icon className={`w-5 h-5 ${item.text}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🔥 Bottom Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Activity */}
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h3 className="font-semibold mb-4 text-gray-700">
//             Recent Activity
//           </h3>

//           <ul className="space-y-3 text-sm text-gray-600">
//             <li>🟢 New user registered</li>
//             <li>📦 Product added</li>
//             <li>💰 Payment received</li>
//             <li>⭐ New review submitted</li>
//           </ul>
//         </div>

//         {/* Chart Placeholder */}
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <h3 className="font-semibold mb-4 text-gray-700">
//             Sales Overview
//           </h3>

//           <div className="h-40 flex items-center justify-center text-gray-400">
//             Chart will go here 📊
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Overview;


import React from "react";
import { Users, ShoppingCart, DollarSign, TrendingUp, Activity, Package, CreditCard, Star, ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react";
import EnquiryTable from "../../../screens/AiAgentMobile/EnquiryTable";

const Overview = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Products",
      value: "320",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      text: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      title: "Revenue",
      value: "₹85,400",
      change: "+23.1%",
      trend: "up",
      icon: DollarSign,
      bg: "bg-gradient-to-br from-amber-500 to-amber-600",
      lightBg: "bg-amber-50",
      text: "text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "-3.2%",
      trend: "down",
      icon: TrendingUp,
      bg: "bg-gradient-to-br from-violet-500 to-violet-600",
      lightBg: "bg-violet-50",
      text: "text-violet-600",
      borderColor: "border-violet-200",
    },
  ];

  const activities = [
    {
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      title: "New user registered",
      description: "John Doe created an account",
      time: "2 min ago",
    },
    {
      icon: Package,
      color: "bg-emerald-100 text-emerald-600",
      title: "Product added",
      description: "iPhone 15 Pro added to inventory",
      time: "15 min ago",
    },
    {
      icon: CreditCard,
      color: "bg-amber-100 text-amber-600",
      title: "Payment received",
      description: "₹12,500 from Rahul Sharma",
      time: "1 hour ago",
    },
    {
      icon: Star,
      color: "bg-violet-100 text-violet-600",
      title: "New review submitted",
      description: "5-star review on MacBook Air",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Welcome back! Here's what's happening today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${item.bg}`} />
            
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500 tracking-wide">
                    {item.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {item.value}
                    </h2>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                      item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {item.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {item.change}
                    </span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-xl ${item.lightBg} ring-1 ring-inset ${item.borderColor}`}>
                  <item.icon className={`w-6 h-6 ${item.text}`} />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.bg} transition-all duration-500 group-hover:opacity-90`}
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity with improved styling */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Latest actions from your team
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-1">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className={`p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Placeholder with improved design */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Overview
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Monthly revenue statistics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-lg">
                Monthly
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                Weekly
              </button>
            </div>
          </div>

          <div className="relative h-48 bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full shadow-sm flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-indigo-400" />
              </div>
              <p className="text-gray-500 font-medium">Chart Coming Soon</p>
              <p className="text-xs text-gray-400 mt-1">
                Revenue analytics visualization
              </p>
            </div>
          </div>
        </div>
      </div>

      <EnquiryTable/>
    </div>
  );
};

export default Overview;