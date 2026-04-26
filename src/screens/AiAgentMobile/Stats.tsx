import React from "react";
import AnimatedCounter from "./AnimatedCounter";

// 1. Define the interface for a single stat item
interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

// 2. Define the props for the STATS component
interface StatsProps {
  // Type for the ref from useInView
  statsRef: (node?: Element | null | undefined) => void;
  statsInView: boolean;
  STATS_DATA: StatItem[];
}

const STATS: React.FC<StatsProps> = ({ statsRef, statsInView, STATS_DATA }) => {
  return (
    <section
      ref={statsRef}
      style={{
        background: "linear-gradient(135deg,#3D2B1F,#6B4C3B)",
        padding: "70px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 40,
            textAlign: "center",
          }}
        >
          {STATS_DATA.map((s) => (
            <div
              key={s.label}
              style={{
                opacity: statsInView ? 1 : 0,
                transition: "opacity 0.6s",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 52,
                  fontWeight: 700,
                  color: "#C9A84C",
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  inView={statsInView}
                />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(250,247,242,0.6)",
                  marginTop: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default STATS;
