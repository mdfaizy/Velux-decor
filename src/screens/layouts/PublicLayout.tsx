// import { Outlet } from "react-router-dom";
// import Navbar from "../AiAgentMobile/Navbar";
// import { Footer } from "../AiAgentMobile/Footer";

// const PublicLayout = () => {
  
//   return (
//     <div className="bg-[#FAF7F2] min-h-screen">

//       {/* Navbar (sab public pages me common) */}
//       <Navbar
//         menuOpen={false}
//         setMenuOpen={() => {}}
//         scrollTo={() => {}}
//         setBookingOpen={() => {}}
//       />

//       {/* Page content */}
//       <Outlet />


//       <Footer/>

//     </div>
//   );
// };

// export default PublicLayout;


import { Outlet } from "react-router-dom";
import { useState } from "react"; // ✅ ADD
import Navbar from "../AiAgentMobile/Navbar";
import { Footer } from "../AiAgentMobile/Footer";
import { BookingModal } from "../AiAgentMobile/BookingModal"; // ✅ ADD

const PublicLayout = () => {
  const [bookingOpen, setBookingOpen] = useState(false); // ✅ ADD

  return (
    <div className="bg-[#FAF7F2] min-h-screen flex flex-col">

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