import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import { Offer, getActiveOffersApi } from "../../services/offerApi";
import { OfferCountdown } from "./OfferCountdown";

interface ProductOfferStripProps {
  categoryId?: string;
}

/* Offer callout on the product page, under the price card */
export const ProductOfferStrip: React.FC<ProductOfferStripProps> = ({ categoryId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    getActiveOffersApi()
      .then((list) =>
        setOffers(
          list.filter(
            (o) => o.showOnProduct && (!o.category || o.category === categoryId)
          )
        )
      )
      .catch((err) => console.log("Product offer error:", err));
  }, [categoryId]);

  if (!offers.length) return null;

  return (
    <div className="flex flex-col gap-3 mb-4">
      {offers.map((offer) => (
        <div
          key={offer._id}
          className="flex items-start gap-3 rounded-xl p-4"
          style={{
            background: "linear-gradient(135deg,#FFF8E7,#FBEFD5)",
            border: "1px dashed #C9A84C",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full w-9 h-9 shrink-0"
            style={{ background: "linear-gradient(135deg,#C9A84C,#8B6914)" }}
          >
            <Tag size={16} color="#fff" />
          </div>

          <div className="flex-1 min-w-0 text-sm">
            {offer.title && (
              <p className="font-semibold" style={{ color: "#3D2B1F" }}>{offer.title}</p>
            )}
            <p style={{ color: "#5C4033" }}>{offer.text}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              {offer.endDate && (
                <span className="text-xs" style={{ color: "#8B6914" }}>
                  Ends in <OfferCountdown endDate={offer.endDate} variant="inline" />
                </span>
              )}
              {offer.link &&
                (offer.link.startsWith("/") ? (
                  <Link to={offer.link} className="text-xs font-semibold underline" style={{ color: "#8B6914" }}>
                    {offer.linkLabel || "View offer"} →
                  </Link>
                ) : (
                  <a
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold underline"
                    style={{ color: "#8B6914" }}
                  >
                    {offer.linkLabel || "View offer"} →
                  </a>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
