import React from "react";
import { CATEGORIES } from "./data";
import { useState } from "react";
interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  tag: string;
}

// interface CategoriesProps {
//   CATEGORIES: Category[];
//   activeCategory: string;
//   setActiveCategory: (id: string) => void;
// }

export const Categories: React.FC = ({
  // CATEGORIES,
  // activeCategory,
  // setActiveCategory,
}) => {

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
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

        {/* 6-category masonry-style grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            // Make first and last tile double-wide on large screens only
            const isWide = i === 0 || i === 5;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`overflow-hidden rounded-[16px] cursor-pointer transition-all duration-300 ${
                  isWide ? "lg:col-span-2" : ""
                }`}
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow:
                    activeCategory === cat.id
                      ? "0 20px 50px rgba(201,168,76,0.22)"
                      : "0 4px 20px rgba(61,43,31,0.07)",
                  border: `2px solid ${activeCategory === cat.id ? "#C9A84C" : "transparent"}`,
                  transform:
                    activeCategory === cat.id ? "translateY(-4px)" : "none",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: isWide ? 280 : 220,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform:
                        activeCategory === cat.id
                          ? "scale(1.06)"
                          : "scale(1)",
                      transition: "transform 0.6s",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.62) 100%)",
                    }}
                  />
                  {/* Tag pill */}
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      background: "rgba(201,168,76,0.92)",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.tag}
                  </div>
                  {/* Name at bottom */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 22px",
                      background: "rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{cat.icon}</span>
                      <span
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: isWide ? 24 : 20,
                          fontWeight: 700,
                          color: "#FAF7F2",
                          textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                        }}
                      >
                        {cat.name}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.95)",
                        lineHeight: 1.6,
                        maxWidth: 380,
                        textShadow: "0 6px 16px rgba(0,0,0,0.28)",
                      }}
                    >
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};