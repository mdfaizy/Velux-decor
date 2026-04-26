  // import React, { useState, useEffect } from "react";

  // interface NavbarProps {
  //   menuOpen: boolean;
  //   setMenuOpen: (open: boolean) => void;
  //   setBookingOpen: (open: boolean) => void;
  //   scrollTo: (id: string) => void;
  // }

  // export const Navbar: React.FC<NavbarProps> = ({
  //   menuOpen,
  //   setMenuOpen,
  //   setBookingOpen,
  //   scrollTo,
  // }) => {
  //   const [isScrolled, setIsScrolled] = useState(false);

  //   useEffect(() => {
  //     const onScroll = () => setIsScrolled(window.scrollY > 60);
  //     window.addEventListener("scroll", onScroll);
  //     return () => window.removeEventListener("scroll", onScroll);
  //   }, []);

  //   const navLinks = [
  //     { label: "Collections", id: "categories" },
  //     { label: "Rooms", id: "rooms" },
  //     { label: "Products", id: "products" },
  //     { label: "Services", id: "services" },
  //     { label: "About", id: "about" },
  //     { label: "Contact", id: "contact" },
  //   ];

  //   return (
  //     <nav
  //       style={{
  //         position: "fixed",
  //         top: 0,
  //         left: 0,
  //         right: 0,
  //         zIndex: 50,
  //         background: isScrolled ? "rgba(250,247,242,0.97)" : "transparent",
  //         backdropFilter: isScrolled ? "blur(20px)" : "none",
  //         boxShadow: isScrolled ? "0 2px 24px rgba(61,43,31,0.08)" : "none",
  //         transition: "all 0.4s ease",
  //         borderBottom: isScrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
  //       }}
  //     >
  //       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
  //         <div
  //           className="flex items-center gap-3 cursor-pointer"
  //           onClick={() => scrollTo("hero")}
  //         >
  //           <div
  //             style={{
  //               width: 40,
  //               height: 40,
  //               background: "linear-gradient(135deg,#C9A84C,#8B6914)",
  //               borderRadius: 8,
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>
  //               V
  //             </span>
  //           </div>
  //           <div
  //             style={{
  //               fontFamily: "'Playfair Display',serif",
  //               fontSize: 20,
  //               fontWeight: 700,
  //               color: isScrolled ? "#3D2B1F" : "#FAF7F2",
  //               letterSpacing: "0.02em",
  //               lineHeight: 1,
  //               transition: "color 0.4s",
  //             }}
  //           >
  //             VeluxDecor
  //           </div>
  //         </div>

  //         <div className="hidden md:flex items-center gap-8">
  //           {navLinks.map((l) => (
  //             <button
  //               key={l.id}
  //               onClick={() => scrollTo(l.id)}
  //               style={{
  //                 background: "none",
  //                 border: "none",
  //                 cursor: "pointer",
  //                 fontSize: 13,
  //                 fontWeight: 500,
  //                 color: isScrolled ? "#3D2B1F" : "#FAF7F2",
  //                 letterSpacing: "0.05em",
  //                 textTransform: "uppercase",
  //                 transition: "color 0.2s",
  //               }}
  //               onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
  //               onMouseLeave={(e) =>
  //                 (e.currentTarget.style.color = isScrolled
  //                   ? "#3D2B1F"
  //                   : "#FAF7F2")
  //               }
  //             >
  //               {l.label}
  //             </button>
  //           ))}
  //         </div>

  //         <div className="hidden md:flex items-center gap-3">
  //           <button
  //             onClick={() => scrollTo("contact")}
  //             style={{
  //               background: "none",
  //               border: "1px solid rgba(201,168,76,0.7)",
  //               borderRadius: 6,
  //               padding: "9px 20px",
  //               fontSize: 13,
  //               fontWeight: 600,
  //               color: isScrolled ? "#C9A84C" : "#FAF7F2",
  //               cursor: "pointer",
  //               letterSpacing: "0.05em",
  //               transition: "all 0.2s",
  //             }}
  //             onMouseEnter={(e) => {
  //               e.currentTarget.style.background = "#C9A84C";
  //               e.currentTarget.style.color = "#fff";
  //               e.currentTarget.style.borderColor = "#C9A84C";
  //             }}
  //             onMouseLeave={(e) => {
  //               e.currentTarget.style.background = "none";
  //               e.currentTarget.style.color = isScrolled
  //                 ? "#C9A84C"
  //                 : "#FAF7F2";
  //               e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)";
  //             }}
  //           >
  //             Get a Quote
  //           </button>
  //           <button
  //             onClick={() => setBookingOpen(true)}
  //             style={{
  //               background: "linear-gradient(135deg,#C9A84C,#8B6914)",
  //               border: "none",
  //               borderRadius: 6,
  //               padding: "9px 20px",
  //               fontSize: 13,
  //               fontWeight: 600,
  //               color: "#fff",
  //               cursor: "pointer",
  //               letterSpacing: "0.05em",
  //               boxShadow: "0 4px 15px rgba(201,168,76,0.35)",
  //               transition: "all 0.2s",
  //             }}
  //             onMouseEnter={(e) =>
  //               (e.currentTarget.style.transform = "translateY(-1px)")
  //             }
  //             onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
  //           >
  //             Book Consultation
  //           </button>
  //         </div>

  //         <button
  //           className="block md:hidden"
  //           onClick={() => setMenuOpen(!menuOpen)}
  //           style={{
  //             background: "none",
  //             border: "none",
  //             cursor: "pointer",
  //             display: "flex",
  //             flexDirection: "column",
  //             gap: 5,
  //           }}
  //         >
  //           {[0, 1, 2].map((i) => (
  //             <div
  //               key={i}
  //               style={{
  //                 width: 24,
  //                 height: 2,
  //                 background: isScrolled ? "#3D2B1F" : "#FAF7F2",
  //                 transform:
  //                   menuOpen && i === 0
  //                     ? "rotate(45deg) translateY(7px)"
  //                     : menuOpen && i === 2
  //                       ? "rotate(-45deg) translateY(-7px)"
  //                       : "none",
  //                 opacity: menuOpen && i === 1 ? 0 : 1,
  //                 transition: "all 0.3s",
  //               }}
  //             />
  //           ))}
  //         </button>
  //       </div>

  //       {menuOpen && (
  //         <div
  //           style={{
  //             background: "rgba(250,247,242,0.98)",
  //             borderTop: "1px solid rgba(201,168,76,0.2)",
  //             padding: "20px 24px 28px",
  //           }}
  //         >
  //           {navLinks.map((l) => (
  //             <button
  //               key={l.id}
  //               onClick={() => scrollTo(l.id)}
  //               style={{
  //                 display: "block",
  //                 width: "100%",
  //                 textAlign: "left",
  //                 background: "none",
  //                 border: "none",
  //                 cursor: "pointer",
  //                 fontSize: 15,
  //                 fontWeight: 500,
  //                 color: "#3D2B1F",
  //                 padding: "12px 0",
  //                 borderBottom: "1px solid rgba(201,168,76,0.1)",
  //                 letterSpacing: "0.04em",
  //               }}
  //             >
  //               {l.label}
  //             </button>
  //           ))}
  //           <button
  //             onClick={() => {
  //               setBookingOpen(true);
  //               setMenuOpen(false);
  //             }}
  //             style={{
  //               marginTop: 20,
  //               width: "100%",
  //               background: "linear-gradient(135deg,#C9A84C,#8B6914)",
  //               border: "none",
  //               borderRadius: 8,
  //               padding: "14px",
  //               fontSize: 15,
  //               fontWeight: 600,
  //               color: "#fff",
  //               cursor: "pointer",
  //               letterSpacing: "0.05em",
  //             }}
  //           >
  //             Book Free Consultation
  //           </button>
  //         </div>
  //       )}
  //     </nav>
  //   );
  // };


//   import React, { useState } from "react";
// import { NavLink  ,Link} from "react-router-dom";
//   interface Props {
//   setBookingOpen: (open: boolean) => void;
// }
// // const Navbar = () => {
// const Navbar: React.FC<Props> = ({ setBookingOpen }) => {
//   const [menuOpen, setMenuOpen] = useState(false);


//   // const navLinks = [
//   //   "Collections",
//   //   "Rooms",
//   //   "Products",
//   //   "Services",
//   //   "About",
//   //   "Contact",
//   // ];

//   const navLinks = [
//   { label: "Collections", path: "/" },
//   { label: "Rooms", path: "/showroom-video" },
//   { label: "Products", path: "/featured-products" },
//   { label: "Services", path: "/services-s" },
//   { label: "About", path: "/" },
//   { label: "Contact", path: "/contact" },
// ];

//   return (
//     <nav className="w-full bg-[#F8F5EF] border-b border-gray-200 fixed top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* 🔹 Logo */}
//           <Link to='/'>
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-md flex items-center justify-center">
//             <span className="text-white font-bold text-lg">V</span>
//           </div>
//           <h1 className="text-xl font-serif font-bold text-[#3D2B1F]">
//             VeluxDecor
//           </h1>
//         </div>
//           </Link>

//         {/* 🔹 Desktop Menu */}
//         {/* <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((item) => (
//             <button
//               key={item}
//               className="text-sm uppercase tracking-wider text-[#3D2B1F] hover:text-yellow-600 transition"
//             >
//               <Link>
//               {item}
//               </Link>
//             </button>
//           ))}
//         </div> */}

//        <div className="hidden md:flex items-center gap-8">
//   {navLinks.map((item) => (
//     <NavLink
//       key={item.label}
//       to={item.path}
//       className={({ isActive }) =>
//         `text-sm uppercase tracking-wider transition ${
//           isActive
//             ? "text-yellow-600 font-semibold"
//             : "text-[#3D2B1F] hover:text-yellow-600"
//         }`
//       }
//     >
//       {item.label}
//     </NavLink>
//   ))}
// </div>

//         {/* 🔹 Right Buttons */}
//         <div className="hidden md:flex items-center gap-4">
//           <button className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-md text-sm font-medium hover:bg-yellow-600 hover:text-white transition">
//             <Link to='/contact'>
//              Get a Quote</Link>
//           </button>

//           <button
//           onClick={() => setBookingOpen(true)} 
//           className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white rounded-md text-sm font-semibold shadow hover:scale-105 transition">
//             Book Consultation
//           </button>
//         </div>

//         {/* 🔹 Mobile Menu Icon */}
//         <button
//           className="md:hidden flex flex-col gap-1"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span className="w-6 h-[2px] bg-[#3D2B1F]"></span>
//           <span className="w-6 h-[2px] bg-[#3D2B1F]"></span>
//           <span className="w-6 h-[2px] bg-[#3D2B1F]"></span>
//         </button>
//       </div>

//       {/* 🔥 Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-[#F8F5EF] px-6 pb-6">
//           {/* {navLinks.map((item) => (
//             <button
//               key={item}
//               className="block w-full text-left py-3 border-b text-[#3D2B1F]"
//             >
//               {item}
//             </button>
//           ))} */}
//           {navLinks.map((item) => (
//     <NavLink
//       key={item.label}
//       to={item.path} // ✅ IMPORTANT
//       className="text-sm uppercase tracking-wider text-[#3D2B1F] hover:text-yellow-600 transition"
//     >
//       {item.label}
//     </NavLink>
//   ))}

//           <div className="flex flex-col gap-3 mt-4">
//             <button className="w-full border border-yellow-600 text-yellow-600 py-2 rounded-md">
//               Get a Quote
//             </button>

//           <button
//   onClick={() => {
//     setBookingOpen(true);
//     setMenuOpen(false);
//   }}
//   className="w-full bg-yellow-600 text-white py-2 rounded-md"
// >
//   Book Consultation
// </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

interface Props {
  setBookingOpen: (open: boolean) => void;
}

const Navbar: React.FC<Props> = ({ setBookingOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Collections", path: "/" },
    { label: "Rooms", path: "/showroom-video" },
    { label: "Products", path: "/featured-products" },
    { label: "Services", path: "/services-s" },
    { label: "About", path: "/" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav className="w-full h-[72px] bg-[#F8F5EF] border-b border-gray-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* 🔹 Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <h1 className="text-xl font-serif font-bold text-[#3D2B1F]">
              VeluxDecor
            </h1>
          </Link>

          {/* 🔹 Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-wider transition ${
                    isActive
                      ? "text-yellow-600 font-semibold"
                      : "text-[#3D2B1F] hover:text-yellow-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* 🔹 Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-md text-sm font-medium hover:bg-yellow-600 hover:text-white transition"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => setBookingOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white rounded-md text-sm font-semibold shadow hover:scale-105 transition"
            >
              Book Consultation
            </button>
          </div>

          {/* 🔹 Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-6 h-6"
          >
            <span
              className={`absolute w-6 h-[2px] bg-[#3D2B1F] transition ${
                menuOpen ? "rotate-45 top-3" : "top-1"
              }`}
            />
            <span
              className={`absolute w-6 h-[2px] bg-[#3D2B1F] transition ${
                menuOpen ? "opacity-0" : "top-3"
              }`}
            />
            <span
              className={`absolute w-6 h-[2px] bg-[#3D2B1F] transition ${
                menuOpen ? "-rotate-45 top-3" : "top-5"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* 🔥 MOBILE OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* 🔥 MOBILE MENU */}
      <div
        className={`fixed top-[72px] left-0 w-full bg-[#F8F5EF] z-50 transform transition-all duration-300 md:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-5">

          {navLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 border-b text-sm uppercase tracking-wider transition ${
                  isActive
                    ? "text-yellow-600 font-semibold"
                    : "text-[#3D2B1F]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-5">

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center border border-yellow-600 text-yellow-600 py-2 rounded-md text-sm font-medium"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => {
                setBookingOpen(true);
                setMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-2 rounded-md text-sm font-semibold"
            >
              Book Consultation
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;