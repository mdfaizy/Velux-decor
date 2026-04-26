import React from "react";

interface BrandsMarqueeProps {
  brandsRef: (node?: Element | null | undefined) => void;
  brandsInView: boolean;
}

const BRANDS = [
  "Hunter Douglas",
  "Harlequin",
  "Zoffany",
  "Swicofil",
  "Quick-Step",
  "Sahco",
  "Osborne & Little",
  "Romo",
  "Designers Guild",
  "Colefax & Fowler",
  "Clarke & Clarke",
  "Mokum",
];

export const BrandsMarquee: React.FC<BrandsMarqueeProps> = ({
  brandsRef,
  brandsInView,
}) => {
  return (
    <section
      ref={brandsRef}
      style={{
        background: "#3D2B1F",
        padding: "0",
        overflow: "hidden",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {/* Label cell */}
        <div
          style={{
            minWidth: 180,
            padding: "22px 32px",
            borderRight: "1px solid rgba(201,168,76,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
          className="hidden md:flex"
        >
          <div
            style={{
              width: 3,
              height: 28,
              background: "#C9A84C",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(250,247,242,0.5)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Premium
            <br />
            Brands
          </span>
        </div>
        {/* Scrolling brands */}
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: 0,
              animation: "marquee 28s linear infinite",
              width: "max-content",
            }}
          >
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div
                key={i}
                style={{
                  padding: "22px 36px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(250,247,242,0.45)",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  borderRight: "1px solid rgba(250,247,242,0.05)",
                  transition: "color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(250,247,242,0.45)")
                }
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
    </section>
  );
};