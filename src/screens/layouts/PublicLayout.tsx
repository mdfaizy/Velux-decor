import { Outlet } from "react-router-dom";
import { useState } from "react"; // ✅ ADD
import {Navbar} from "../AiAgentMobile/Navbar";
import { Footer } from "../AiAgentMobile/Footer";
import { BookingModal } from "../AiAgentMobile/BookingModal"; // ✅ ADD
import { OfferBanner } from "../AiAgentMobile/OfferBanner";

const PublicLayout = () => {
  const [bookingOpen, setBookingOpen] = useState(false); // ✅ ADD

  return (
    <div
      className="bg-[#FAF7F2] min-h-screen flex flex-col"
      style={{ paddingTop: "var(--offer-bar-h, 0px)" }}
    >

      {/* Moving offer banner (managed from Dashboard → Offers) */}
      <OfferBanner />

      {/* Navbar */}
      <Navbar
        setBookingOpen={setBookingOpen} // ✅ REAL FUNCTION
      />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* 🔥 GLOBAL MODAL */}
      <BookingModal
        bookingOpen={bookingOpen}
        setBookingOpen={setBookingOpen}
      />

    </div>
  );
};

export default PublicLayout;