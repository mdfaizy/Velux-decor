import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCategoriesApi } from "../../services/categoryApi";
import { useState,useEffect } from "react";

// Admin text is sometimes typed in ALL CAPS — show it in normal case
const isAllCaps = (s: string) => /[A-Z]/.test(s) && s === s.toUpperCase();
const toTitleCase = (s: string) =>
  isAllCaps(s) ? s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : s;
const toSentenceCase = (s: string) =>
  isAllCaps(s)
    ? s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase())
    : s;

/* Column span of each tile on large screens (3 columns), so every row is full:
   rows alternate [wide + normal] and [normal × 3]; a single leftover tile spans the whole row */
const getSpans = (count: number): number[] => {
  const spans: number[] = [];
  let wideRow = true;
  while (spans.length < count) {
    const left = count - spans.length;
    if (left === 1) spans.push(3);
    else if (wideRow || left === 2) spans.push(2, 1);
    else spans.push(1, 1, 1);
    wideRow = !wideRow;
  }
  return spans;
};

const LG_SPAN: Record<number, string> = {
  1: "",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

interface Category {
  _id: string;          // 🔥 Mongo ID
  name: string;
  description: string;
  image: string;
  icon: string;
  badge?: string;
  slug: string;         // 🔥 IMPORTANT
  isActive: boolean;
}

export const Categories: React.FC = ({
}) => {
  const navigate = useNavigate();
const [categories, setCategories] = useState<Category[]>([]);


useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await getCategoriesApi();
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCategories();
}, []);

  const spans = getSpans(categories.length);
  return (
    <section
      id="categories"
      style={{ padding: "110px 0", background: "#F0EAE0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 60,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201,168,76,0.1)",
                borderRadius: 30,
                padding: "6px 18px",
                marginBottom: 18,
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Our Collections
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(28px,4vw,50px)",
                fontWeight: 700,
                color: "#3D2B1F",
                lineHeight: 1.1,
              }}
            >
              Curated for Every Style
            </h2>
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#6B4C3B",
              maxWidth: 380,
              lineHeight: 1.7,
            }}
          >
            From classic elegance to modern minimalism — discover our premium
            furnishing solutions.
          </p>
        </div>

        {/* Collection tiles: equal row heights, every row filled */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] lg:auto-rows-[280px]">
          {categories.map((cat, i) => {
            const span = spans[i];
            // on 2-column tablets, a last odd tile spans the full row
            const smFull = categories.length % 2 === 1 && i === categories.length - 1;
            const badge = cat.badge?.trim();

            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => {
                  // 🔥 SLUG BASE NAVIGATION
                  if (!cat.slug) {
                    console.error("Slug missing:", cat);
                    return;
                  }
                  navigate(`/subcategory/${cat.slug}`);
                }}
                className={`group relative block h-full w-full overflow-hidden rounded-2xl text-left
                  shadow-[0_4px_20px_rgba(61,43,31,0.08)] ring-1 ring-[rgba(201,168,76,0.12)]
                  transition-all duration-500 hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(61,43,31,0.18)] hover:ring-2 hover:ring-[#C9A84C]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]
                  ${smFull ? "sm:col-span-2" : ""} ${LG_SPAN[span]} ${span === 1 && smFull ? "lg:col-span-1" : ""}`}
              >
                <img
                  src={cat.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* photo stays visible at the top, text area darkens smoothly */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(26,18,12,0) 30%, rgba(26,18,12,0.45) 60%, rgba(26,18,12,0.88) 100%)",
                  }}
                />

                {badge && (
                  <span
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow"
                    style={{ background: "rgba(201,168,76,0.95)" }}
                  >
                    {badge}
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    {cat.icon && (
                      <img
                        src={cat.icon}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white/70"
                      />
                    )}
                    <h3
                      className={`font-bold leading-tight text-[#FAF7F2] ${
                        span > 1 ? "text-2xl sm:text-[28px]" : "text-xl sm:text-[22px]"
                      }`}
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                      }}
                    >
                      {toTitleCase(cat.name)}
                    </h3>
                  </div>

                  {cat.description && (
                    <p
                      className={`line-clamp-2 text-[13.5px] leading-relaxed text-white/85 ${
                        span > 1 ? "max-w-xl" : ""
                      }`}
                    >
                      {toSentenceCase(cat.description)}
                    </p>
                  )}

                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#E8C97A] opacity-80 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};