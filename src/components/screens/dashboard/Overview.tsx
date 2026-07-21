import React, { useState, useEffect } from "react";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Package, 
  CreditCard, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreVertical,
  Download,
  Plus,
  Calendar,
  ChevronRight,
  BarChart3,
  PieChart,
  RefreshCw,
  Bell,
  Settings,
  HelpCircle,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import EnquiryTable from "../../../screens/AiAgentMobile/EnquiryTable";

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      bg: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      text: "text-blue-600",
      borderColor: "border-blue-200",
      ringColor: "ring-blue-500/20",
      hoverBg: "hover:bg-blue-50/50",
    },
    {
      title: "Total Products",
      value: "320",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      bg: "from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      text: "text-emerald-600",
      borderColor: "border-emerald-200",
      ringColor: "ring-emerald-500/20",
      hoverBg: "hover:bg-emerald-50/50",
    },
    {
      title: "Revenue",
      value: "₹85,400",
      change: "+23.1%",
      trend: "up",
      icon: DollarSign,
      bg: "from-amber-500 to-amber-600",
      lightBg: "bg-amber-50",
      text: "text-amber-600",
      borderColor: "border-amber-200",
      ringColor: "ring-amber-500/20",
      hoverBg: "hover:bg-amber-50/50",
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "-3.2%",
      trend: "down",
      icon: TrendingUp,
      bg: "from-violet-500 to-violet-600",
      lightBg: "bg-violet-50",
      text: "text-violet-600",
      borderColor: "border-violet-200",
      ringColor: "ring-violet-500/20",
      hoverBg: "hover:bg-violet-50/50",
    },
  ];

  const activities = [
    {
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      iconBg: "bg-blue-50",
      title: "New user registered",
      description: "John Doe created an account",
      time: "2 min ago",
      type: "user",
    },
    {
      icon: Package,
      color: "bg-emerald-100 text-emerald-600",
      iconBg: "bg-emerald-50",
      title: "Product added",
      description: "iPhone 15 Pro added to inventory",
      time: "15 min ago",
      type: "product",
    },
    {
      icon: CreditCard,
      color: "bg-amber-100 text-amber-600",
      iconBg: "bg-amber-50",
      title: "Payment received",
      description: "₹12,500 from Rahul Sharma",
      time: "1 hour ago",
      type: "payment",
    },
    {
      icon: Star,
      color: "bg-violet-100 text-violet-600",
      iconBg: "bg-violet-50",
      title: "New review submitted",
      description: "5-star review on MacBook Air",
      time: "2 hours ago",
      type: "review",
    },
  ];

  // Quick action buttons
  const quickActions = [
    { label: "Add Product", icon: Plus, color: "bg-indigo-600 hover:bg-indigo-700 text-white" },
    { label: "View Users", icon: Users, color: "bg-blue-600 hover:bg-blue-700 text-white" },
    { label: "Sales Report", icon: BarChart3, color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
    { label: "Settings", icon: Settings, color: "bg-gray-600 hover:bg-gray-700 text-white" },
  ];

  // Stat Card Component
  const StatCard = ({ item }: { item: typeof stats[0] }) => (
    <div className={`
      group relative bg-white p-5 md:p-6 rounded-2xl shadow-sm 
      hover:shadow-xl transition-all duration-300 
      border border-gray-100 hover:border-gray-200
      hover:-translate-y-1
      ${item.hoverBg}
    `}>
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${item.bg}`} />
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5 flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium text-gray-500 tracking-wide uppercase">
              {item.title}
            </p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900">
                {item.value}
              </h2>
              <span className={`
                inline-flex items-center gap-0.5 text-xs font-semibold 
                ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}
                bg-white px-1.5 py-0.5 rounded-full border border-gray-100
              `}>
                {item.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {item.change}
              </span>
            </div>
          </div>
          
          <div className={`
            p-2.5 md:p-3 rounded-xl 
            bg-gradient-to-br ${item.bg}
            shadow-lg shadow-opacity-20
            flex-shrink-0
            ring-1 ring-white/20 ring-inset
          `}>
            <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${item.bg} transition-all duration-1000 group-hover:opacity-90`}
            style={{ width: `${Math.random() * 40 + 60}%` }}
          />
        </div>
      </div>
    </div>
  );

  // Activity Item Component
  const ActivityItem = ({ activity }: { activity: typeof activities[0] }) => (
    <div className="flex items-start gap-3 md:gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer hover:shadow-sm">
      <div className={`
        p-2 rounded-lg ${activity.iconBg} 
        group-hover:scale-110 transition-transform
        ring-1 ring-inset ring-gray-100
      `}>
        <activity.icon className={`w-4 h-4 ${activity.color.split(' ')[1]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {activity.title}
        </p>
        <p className="text-xs md:text-sm text-gray-500 truncate">
          {activity.description}
        </p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Clock className="w-3 h-3 text-gray-400" />
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {activity.time}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Animated background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-50/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-50/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-5 md:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 md:gap-3">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Dashboard Overview
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200">
                Live
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
              <p className="text-xs md:text-sm text-gray-500">
                Welcome back! Here's what's happening today
              </p>
              <span className="hidden md:inline-block text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-400">{formatDate(currentTime)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            <button 
              onClick={() => setLoading(true)}
              className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 md:gap-2 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 md:w-4 md:h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">Refresh</span>
            </button>
            <button className="px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-1.5 md:gap-2">
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Report</span>
            </button>
          </div>
        </div>

        {/* Quick Actions - Mobile Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:hidden scrollbar-hide">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-2 ${action.color} shadow-sm flex-shrink-0`}
            >
              <action.icon className="w-3.5 h-3.5" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Quick Actions - Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 ${action.color} shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((item, i) => (
            <StatCard key={i} item={item} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                  Recent Activity
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  Latest actions from your team
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-0.5 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>

            <button className="w-full mt-4 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center gap-2 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
              View All Activity
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Chart / Analytics */}
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                  Sales Overview
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  Monthly revenue statistics
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setSelectedPeriod("monthly")}
                  className={`px-2.5 md:px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedPeriod === "monthly"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPeriod("weekly")}
                  className={`px-2.5 md:px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedPeriod === "weekly"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-50 via-indigo-50/20 to-transparent rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center group hover:border-indigo-200 transition-all">
              <div className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-gray-100">
                  <PieChart className="w-7 h-7 md:w-8 md:h-8 text-indigo-400" />
                </div>
                <p className="text-gray-500 font-medium">Chart Coming Soon</p>
                <p className="text-xs text-gray-400 mt-1">
                  Revenue analytics visualization
                </p>
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Expenses
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mt-4">
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Total Sales</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">1,245</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Avg Order</p>
                <p className="text-sm md:text-base font-semibold text-gray-900">₹2,450</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Conversion</p>
                <p className="text-sm md:text-base font-semibold text-emerald-600">3.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Table Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Recent Enquiries
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  Latest consultation requests from customers
                </p>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1.5 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-2 md:p-4">
            <EnquiryTable />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
          <p>© 2026 VeluxDecor Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;