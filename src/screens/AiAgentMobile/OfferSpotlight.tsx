import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Offer, getActiveOffersApi } from "../../services/offerApi";
import { OfferCountdown } from "./OfferCountdown";

type SpotlightOffer = Pick<Offer, "text" | "title" | "image" | "link" | "linkLabel" | "endDate">;

const ctaStyle: React.CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
  borderRadius: 6,
  padding: "14px 36px",
  fontSize: 13,
  fontWeight: 700,
  color: "#3D2B1F",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
  transition: "transform 0.3s",
};

const OfferCta: React.FC<{ offer: SpotlightOffer }> = ({ offer }) => {
  if (!offer.link) return null;
  const label = offer.linkLabel || "Shop now";
  const hover = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
      (e.currentTarget.style.transform = "translateY(-3px)"),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
      (e.currentTarget.style.transform = "none"),
  };

  return offer.link.startsWith("/") ? (
    <Link to={offer.link} style={ctaStyle} {...hover}>{label}</Link>
  ) : (
    <a href={offer.link} target="_blank" rel="noopener noreferrer" style={ctaStyle} {...hover}>
      {label}
    </a>
  );
};

/* One large promo card. Exported so the admin page can preview it. */
export const OfferSpotlightCard: React.FC<{ offer: SpotlightOffer; visible?: boolean }> = ({
  offer,
  visible = true,
}) => (
  <div
    className="relative overflow-hidden rounded-2xl grid md:grid-cols-2"
    style={{
      background: "linear-gradient(135deg,#3D2B1F 0%,#6B4C3B 55%,#3D2B1F 100%)",
      border: "1px solid rgba(201,168,76,0.35)",
      boxShadow: "0 24px 60px rgba(61,43,31,0.25)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "all 0.8s",
    }}
  >
    {/* decorative rings, same motif as the CTA banner */}
    <svg
      className="pointer-events-none absolute"
      style={{ right: -60, top: -60, width: 260, height: 260, opacity: 0.08 }}
      viewBox="0 0 300 300"
      aria-hidden="true"
    >
      <circle cx="150" cy="150" r="140" fill="none" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="150" cy="150" r="100" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
      <circle cx="150" cy="150" r="60" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
    </svg>

    <div
      className={`relative z-10 flex flex-col justify-center gap-5 p-8 sm:p-12 ${
        offer.image ? "" : "md:col-span-2 items-center text-center"
      }`}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#C9A84C",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        ✦ Limited Time Offer ✦
      </p>

      {offer.title && (
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: 700,
            color: "#FAF7F2",
            lineHeight: 1.1,
          }}
        >
          {offer.title}
        </h2>
      )}

      <p style={{ fontSize: 17, color: "rgba(250,247,242,0.8)", maxWidth: 520 }}>
        {offer.text}
      </p>

      {offer.endDate && (
        <div className="flex flex-col gap-2" style={{ alignItems: offer.image ? "flex-start" : "center" }}>
          <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(250,247,242,0.6)" }}>
            Ends in
          </span>
          <OfferCountdown endDate={offer.endDate} />
        </div>
      )}

      <div>
        <OfferCta offer={offer} />
      </div>
    </div>

    {offer.image && (
      <div className="relative min-h-[240px] md:min-h-full">
        <img
          src={offer.image}
          alt={offer.title || "Offer"}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* soft fade into the card on desktop */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: "linear-gradient(90deg,#4A3428 0%,rgba(74,52,40,0) 35%)" }}
        />
      </div>
    )}
  </div>
);

/* Home page section: shows offers marked "Show on home page" */
export const OfferSpotlight: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    getActiveOffersApi()
      .then((list) => setOffers(list.filter((o) => o.showOnHome)))
      .catch((err) => console.log("Offer spotlight error:", err));
  }, []);

  if (!offers.length) return null;

  return (
    <section ref={ref} style={{ padding: "72px 0", background: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
        {offers.slice(0, 2).map((offer) => (
          <OfferSpotlightCard key={offer._id} offer={offer} visible={inView} />
        ))}
      </div>
    </section>
  );
};
