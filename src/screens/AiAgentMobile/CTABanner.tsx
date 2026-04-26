import React from "react";

interface CTABannerProps {
  ctaRef: (node?: Element | null | undefined) => void;
  ctaInView: boolean;
  setBookingOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  ctaRef,
  ctaInView,
  setBookingOpen,
  scrollTo,
}) => {
  return (
    <section
      ref={ctaRef}
      style={{
        padding: "110px 0",
        background:
          "linear-gradient(135deg,#3D2B1F 0%,#6B4C3B 50%,#3D2B1F 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.04)",
          }}
        />
        <svg
          style={{
            position: "absolute",
            right: 100,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.07,
            width: 300,
            height: 300,
          }}
          viewBox="0 0 300 300"
        >
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1"
          />
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.5"
          />
          <circle
            cx="150"
            cy="150"
            r="60"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div
        className="max-w-4xl mx-auto px-6 text-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#C9A84C",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            ✦ Limited Time — Free Consultation ✦
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(30px,5vw,60px)",
              fontWeight: 700,
              color: "#FAF7F2",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Ready to Transform
            <br />
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
              Your Home?
            </span>
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "rgba(250,247,242,0.7)",
              marginBottom: 48,
              maxWidth: 520,
              margin: "0 auto 48px",
            }}
          >
            Book a free in-home consultation today and let our experts bring
            your dream interior to life.
          </p>
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setBookingOpen(true)}
              style={{
                background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
                border: "none",
                borderRadius: 6,
                padding: "18px 48px",
                fontSize: 14,
                fontWeight: 700,
                color: "#3D2B1F",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: "transparent",
                border: "1px solid rgba(250,247,242,0.3)",
                borderRadius: 6,
                padding: "17px 40px",
                fontSize: 14,
                fontWeight: 600,
                color: "#FAF7F2",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(250,247,242,0.7)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(250,247,242,0.3)")
              }
            >
              View Showrooms
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};