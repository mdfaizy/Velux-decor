import React from "react";

export interface HeroSlide {
  image: string;
  tag: string;
  headline: string;
  sub: string;
  cta: string;
  ctaTarget: string;
}

export interface HeroProps {
  heroRef: (node?: Element | null | undefined) => void; // Type for useInView ref
  HERO_SLIDES: HeroSlide[];
  heroSlide: number;
  heroInView: boolean;
  slide: HeroSlide;
  setHeroSlide: (index: number) => void;
  setBookingOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({
  heroRef,
  HERO_SLIDES,
  heroSlide,
  heroInView,
  slide,
  setHeroSlide,
  setBookingOpen,
  scrollTo,
}: HeroProps) => {
  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 600,
        overflow: "hidden",
      }}
    >
      {/* Slide images */}
      {HERO_SLIDES.map((sl, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            transition: "opacity 1.2s ease",
            opacity: i === heroSlide ? 1 : 0,
            zIndex: i === heroSlide ? 1 : 0,
          }}
        >
          <img
            src={sl.image}
            alt={sl.headline}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: i === heroSlide ? "scale(1.03)" : "scale(1)",
              transition: "transform 7s ease",
            }}
          />
        </div>
      ))}

      {/* Light overlay — preserve the background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(to right, rgba(20,12,6,0.22) 0%, rgba(20,12,6,0.10) 50%, rgba(20,12,6,0.03) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Vertical gold line — Sarom signature */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "15%",
          bottom: "15%",
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(201,168,76,0.6), transparent)",
          zIndex: 3,
        }}
        className="hidden md:block"
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 w-full"
          style={{ paddingLeft: "clamp(24px,7vw,120px)" }}
        >
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s ease",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
              }}
            >
              <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#C9A84C",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {slide.tag}
              </span>
            </div>
            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(42px,6vw,88px)",
                fontWeight: 700,
                color: "#FAF7F2",
                lineHeight: 1.05,
                marginBottom: 24,
                whiteSpace: "pre-line",
                letterSpacing: "-0.01em",
                textShadow: "0 22px 50px rgba(0,0,0,0.4)",
              }}
            >
              {slide.headline}
            </h1>
            <p
              style={{
                fontSize: "clamp(15px,1.3vw,18px)",
                lineHeight: 1.7,
                color: "rgba(250,247,242,0.95)",
                marginBottom: 44,
                maxWidth: 460,
                textShadow: "0 10px 24px rgba(0,0,0,0.35)",
              }}
            >
              {slide.sub}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo(slide.ctaTarget)}
                style={{
                  background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                  border: "none",
                  borderRadius: 4,
                  padding: "16px 36px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 8px 28px rgba(201,168,76,0.4)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 36px rgba(201,168,76,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(201,168,76,0.4)";
                }}
              >
                {slide.cta}
              </button>
              <button
                onClick={() => setBookingOpen(true)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(250,247,242,0.45)",
                  borderRadius: 4,
                  padding: "15px 32px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#FAF7F2",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C9A84C";
                  e.currentTarget.style.color = "#C9A84C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(250,247,242,0.45)";
                  e.currentTarget.style.color = "#FAF7F2";
                }}
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators (bottom-right) */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 48,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setHeroSlide(i)}
            style={{
              height: i === heroSlide ? 32 : 16,
              width: 2,
              background:
                i === heroSlide ? "#C9A84C" : "rgba(250,247,242,0.35)",
              border: "none",
              cursor: "pointer",
              borderRadius: 2,
              transition: "all 0.4s",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          bottom: 42,
          left: "clamp(24px,7vw,120px)",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#C9A84C",
            lineHeight: 1,
          }}
        >
          0{heroSlide + 1}
        </span>
        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(250,247,242,0.3)",
          }}
        />
        <span
          style={{
            fontSize: 12,
            color: "rgba(250,247,242,0.4)",
            letterSpacing: "0.1em",
          }}
        >
          0{HERO_SLIDES.length}
        </span>
      </div>

      {/* Quick-trust bar pinned at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="hidden md:flex"
          style={{
            background: "rgba(250,247,242,0.07)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(201,168,76,0.15)",
            padding: "18px 64px",
            gap: 64,
            alignItems: "center",
          }}
        >
          {[
            ["⭐ 4.9/5", "Google Rating"],
            ["🏆 15,000+", "Projects Done"],
            ["📅 25 Years", "Of Excellence"],
            ["🏙️ 6 Cities", "Showrooms"],
          ].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#FAF7F2",
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(250,247,242,0.5)",
                  marginTop: 4,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {lbl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
