import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { getActiveOffersApi } from "../../services/offerApi";

export const OFFER_BAR_HEIGHT = 38;

interface BannerOffer {
  _id?: string;
  text: string;
  link?: string;
  linkLabel?: string;
}

interface OfferMarqueeProps {
  offers: BannerOffer[];
  onClose?: () => void;
}

const OfferLink: React.FC<{ offer: BannerOffer }> = ({ offer }) => {
  if (!offer.link) return null;
  const label = offer.linkLabel || "Shop now";
  const className =
    "ml-2 underline underline-offset-2 font-semibold hover:text-white transition";

  // internal site path → router link, otherwise open external URL in new tab
  return offer.link.startsWith("/") ? (
    <Link to={offer.link} className={className}>
      {label} →
    </Link>
  ) : (
    <a href={offer.link} target="_blank" rel="noopener noreferrer" className={className}>
      {label} →
    </a>
  );
};

/* Pure presentational marquee — also used as live preview in the admin page */
export const OfferMarquee: React.FC<OfferMarqueeProps> = ({ offers, onClose }) => {
  // repeat short lists so the track is always wider than the screen
  const base = offers.length < 4 ? Array(4).fill(offers).flat() : offers;
  const duration = Math.max(20, base.length * 7);

  const track = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {base.map((offer, i) => (
        <span key={i} className="flex items-center whitespace-nowrap px-8">
          <span style={{ color: "#C9A84C" }} className="mr-3">✦</span>
          <span>{offer.text}</span>
          <OfferLink offer={offer} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="offer-bar relative flex items-center overflow-hidden text-[13px] tracking-wide"
      style={{
        height: OFFER_BAR_HEIGHT,
        background: "linear-gradient(90deg,#3D2B1F,#5C4033,#3D2B1F)",
        color: "#F5E6C8",
      }}
      role="region"
      aria-label="Current offers"
    >
      <div
        className="offer-track flex w-max"
        style={{ animation: `offerMarquee ${duration}s linear infinite` }}
      >
        {track(false)}
        {track(true)}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close offers"
          className="absolute right-0 top-0 h-full px-3 flex items-center hover:text-white"
          style={{ background: "linear-gradient(90deg,transparent,#3D2B1F 35%)" }}
        >
          <X size={16} />
        </button>
      )}

      <style>{`
        @keyframes offerMarquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        .offer-bar:hover .offer-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .offer-track { animation-duration: 120s !important; } }
      `}</style>
    </div>
  );
};

const DISMISS_KEY = "offerBannerDismissed";

/* Fetches live offers and shows the fixed bar at the very top of public pages.
   Sets --offer-bar-h so the navbar and page content shift down below it. */
export const OfferBanner: React.FC = () => {
  const [offers, setOffers] = useState<BannerOffer[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getActiveOffersApi()
      .then((all) => {
        const list: BannerOffer[] = all.filter((o) => o.showInBar);
        setOffers(list);

        // dismissal is remembered per browser session, until offers change
        const signature = list.map((o) => o._id).join(",");
        try {
          setDismissed(sessionStorage.getItem(DISMISS_KEY) === signature);
        } catch {
          /* storage unavailable */
        }
      })
      .catch((err) => console.log("Offer banner error:", err));
  }, []);

  const visible = offers.length > 0 && !dismissed;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--offer-bar-h",
      visible ? `${OFFER_BAR_HEIGHT}px` : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--offer-bar-h", "0px");
    };
  }, [visible]);

  const handleClose = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, offers.map((o) => o._id).join(","));
    } catch {
      /* storage unavailable */
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0" style={{ zIndex: 51 }}>
      <OfferMarquee offers={offers} onClose={handleClose} />
    </div>
  );
};
