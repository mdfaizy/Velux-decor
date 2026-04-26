import React, { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  faqRef: (node?: Element | null | undefined) => void;
  faqInView: boolean;
  FAQ_DATA: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ faqRef, faqInView, FAQ_DATA }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="about"
      ref={faqRef}
      style={{ padding: "110px 0", background: "#F0EAE0" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(201,168,76,0.1)",
              borderRadius: 30,
              padding: "6px 18px",
              marginBottom: 20,
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
              FAQ
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              color: "#3D2B1F",
              marginBottom: 16,
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 17, color: "#6B4C3B" }}>
            Everything you need to know about our products and services.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ_DATA.map((faq, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: `1px solid ${openFaq === i ? "rgba(201,168,76,0.4)" : "rgba(61,43,31,0.07)"}`,
                overflow: "hidden",
                transition: "all 0.3s",
                boxShadow:
                  openFaq === i ? "0 8px 25px rgba(201,168,76,0.1)" : "none",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "22px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#3D2B1F",
                    paddingRight: 16,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    color: "#C9A84C",
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.3s",
                    minWidth: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <div
                  style={{
                    padding: "0 24px 22px",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#6B4C3B",
                    borderTop: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};