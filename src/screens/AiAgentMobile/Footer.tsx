import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: "#3D2B1F", padding: "80px 0 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-5 pb-16 border-b border-white/10">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}
                >
                  V
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FAF7F2",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                VeluxDecor
              </div>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgba(250,247,242,0.5)",
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 260,
              }}
            >
              India&#39;s premier destination for luxury curtains, wallpaper,
              blinds, home automation, curtain tracks, and wooden flooring —
              VeluxDecor since 1999.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["f", "in", "t", "ig"].map((s) => (
                <button
                  key={s}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(250,247,242,0.55)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#C9A84C";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(250,247,242,0.55)";
                  }}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {[
            {
              title: "Products",
              links: [
                "Curtains",
                "Wallpaper",
                "Blinds",
                "Home Automation",
                "Curtain Tracks",
                "Wooden Flooring",
              ],
            },
            {
              title: "Services",
              links: [
                "Free Consultation",
                "Custom Design",
                "Installation",
                "Repair & Maintenance",
                "Corporate Projects",
                "Interior Styling",
              ],
            },
            {
              title: "Company",
              links: [
                "About Us",
                "Our Story",
                "Showrooms",
                "Blog",
                "Careers",
                "Press",
              ],
            },
            {
              title: "Support",
              links: [
                "Contact Us",
                "FAQ",
                "Shipping Policy",
                "Return Policy",
                "Privacy Policy",
                "Terms of Use",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {col.title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{
                        fontSize: 13,
                        color: "rgba(250,247,242,0.5)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#C9A84C")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(250,247,242,0.5)")
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "40px 0",
            borderBottom: "1px solid rgba(250,247,242,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: "#FAF7F2",
                marginBottom: 6,
              }}
            >
              Get Design Inspiration
            </h4>
            <p style={{ fontSize: 13, color: "rgba(250,247,242,0.45)" }}>
              Subscribe for exclusive offers, design tips, and new arrivals.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 0,
              maxWidth: 420,
              flex: 1,
              minWidth: 280,
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: "6px 0 0 6px",
                border: "1px solid rgba(250,247,242,0.1)",
                borderRight: "none",
                fontSize: 14,
                background: "rgba(255,255,255,0.06)",
                color: "#FAF7F2",
                outline: "none",
              }}
            />
            <button
              style={{
                background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                border: "none",
                borderRadius: "0 6px 6px 0",
                padding: "14px 24px",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div
          style={{
            padding: "24px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(250,247,242,0.35)" }}>
            © {new Date().getFullYear()} VeluxDecor. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 12,
                  color: "rgba(250,247,242,0.3)",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(250,247,242,0.3)")
                }
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};