import React from "react";
import Whatsapp from "../../assets/images/whatsapp.svg";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/919079701780"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        textDecoration: "none",
        zIndex: 999,
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
    >
      <img src={Whatsapp} alt="WhatsApp" className="w-10 h-10" />
    </a>
  );
};