import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Folder,
  CalendarCheck,
  Star,
  Plus,
  Megaphone,
  MessageCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import EnquiryTable from "../../../screens/AiAgentMobile/EnquiryTable";
import { getProductsApi } from "../../../services/productApi";
import { getCategoriesApi } from "../../../services/categoryApi";
import { getConsultationsApi } from "../../../services/consultationApi";
import { getAllReviewsAdminApi } from "../../../services/reviewApi";
import { useAppSelector } from "../../../redux/slice/reduxHooks";

// list endpoints answer { data: [...] } or a plain array
const listOf = (res: any): any[] | null =>
  Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : null;

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

type Stats = {
  products: number | null;
  categories: number | null;
  consultations: number | null;
  pendingReviews: number | null;
};

const Overview = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [stats, setStats] = useState<Stats>({
    products: null,
    categories: null,
    consultations: null,
    pendingReviews: null,
  });
  const [loading, setLoading] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    const [products, categories, consultations, reviews] = await Promise.allSettled([
      getProductsApi(),
      getCategoriesApi(),
      getConsultationsApi(),
      getAllReviewsAdminApi(),
    ]);
    const count = (r: PromiseSettledResult<any>) =>
      r.status === "fulfilled" ? listOf(r.value)?.length ?? null : null;

    setStats({
      products: count(products),
      categories: count(categories),
      consultations: count(consultations),
      pendingReviews:
        reviews.status === "fulfilled"
          ? (listOf(reviews.value) || []).filter((r: any) => r.status === "pending").length
          : null,
    });
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const statCards = [
    { title: "Products", value: stats.products, icon: Package, path: "products" },
    { title: "Categories", value: stats.categories, icon: Folder, path: "categories" },
    { title: "Consultations", value: stats.consultations, icon: CalendarCheck, path: "consultations" },
    {
      title: "Reviews to approve",
      value: stats.pendingReviews,
      icon: Star,
      path: "reviews",
      highlight: !!stats.pendingReviews,
    },
  ];

  const quickActions = [
    { label: "Add Product", icon: Plus, path: "product" },
    { label: "Create Offer", icon: Megaphone, path: "offers" },
    { label: "WhatsApp Broadcast", icon: MessageCircle, path: "whatsapp-broadcast" },
    { label: "Approve Reviews", icon: Star, path: "reviews" },
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

      {/* ===== WELCOME BANNER ===== */}
      <section
        className="relative overflow-hidden rounded-2xl p-6 md:p-10"
        style={{
          background: "linear-gradient(135deg,#3D2B1F 0%,#6B4C3B 55%,#3D2B1F 100%)",
          boxShadow: "0 20px 50px rgba(61,43,31,0.18)",
        }}
      >
        {/* rings motif from the website */}
        <svg
          className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 opacity-[0.08]"
          viewBox="0 0 300 300"
          aria-hidden="true"
        >
          <circle cx="150" cy="150" r="140" fill="none" stroke="#C9A84C" strokeWidth="1" />
          <circle cx="150" cy="150" r="100" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="60" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] mb-3">
              ✦ {today}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAF7F2] leading-tight">
              {greeting()}, <span className="italic text-[#E8C97A]">{user?.name?.split(" ")[0] || "Admin"}</span>
            </h2>
            <p className="mt-2 text-[15px] text-[#FAF7F2]/70 max-w-lg">
              Here's what's happening at Velux Decor today.
            </p>
          </div>

          <button
            onClick={loadStats}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-sm text-[#FAF7F2]/85 hover:bg-white/10 hover:text-white transition"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {statCards.map((s) => (
          <button
            key={s.title}
            onClick={() => navigate(`/dashboard/${s.path}`)}
            className={`group text-left rounded-2xl bg-white p-4 md:p-6 border transition-all duration-300
              hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(61,43,31,0.12)]
              ${s.highlight ? "border-[#C9A84C] shadow-[0_8px_24px_rgba(201,168,76,0.2)]" : "border-[#EFE6D8] shadow-[0_4px_16px_rgba(61,43,31,0.05)]"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,#C9A84C,#8B6914)" }}
              >
                <s.icon size={20} className="text-white" />
              </span>
              <ArrowRight
                size={16}
                className="text-[#C9A84C] opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
              />
            </div>
            <p
              className="mt-4 text-3xl md:text-4xl font-bold text-[#3D2B1F]"
              style={{ fontFamily: "'Playfair Display',serif" }}
            >
              {s.value === null ? (loading ? "…" : "—") : s.value.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#8A8278]">
              {s.title}
            </p>
          </button>
        ))}
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section>
        <h3 className="text-lg font-bold text-[#3D2B1F] mb-3">Quick actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(`/dashboard/${a.path}`)}
              className="flex items-center gap-3 rounded-xl bg-white border border-[#EFE6D8] px-4 py-3.5 text-left text-sm font-semibold text-[#5C4033]
                transition-all hover:border-[#C9A84C] hover:bg-[#FBF7EE] hover:-translate-y-0.5"
            >
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(201,168,76,0.12)" }}>
                <a.icon size={16} className="text-[#8B6914]" />
              </span>
              {a.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== LATEST ENQUIRIES ===== */}
      <section className="rounded-2xl bg-white border border-[#EFE6D8] shadow-[0_4px_16px_rgba(61,43,31,0.05)] overflow-hidden">
        <div className="p-2 md:p-4">
          <EnquiryTable />
        </div>
      </section>

      <p className="text-center text-xs text-[#8A8278] py-2">
        © {new Date().getFullYear()} Velux Decor Private Limited · Admin Panel
      </p>
    </div>
  );
};

export default Overview;
