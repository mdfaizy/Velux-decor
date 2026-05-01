import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
interface NavbarProps {
  setBookingOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setBookingOpen,
  scrollTo,
}) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRoutePage, setIsRoutePage] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);

    // 🔥 jab route change ho
    setIsRoutePage(true);
    setIsScrolled(true); // force dark navbar
  }, [location.pathname]);
  const isHome = location.pathname === "/";
  const navLinks = [
    { label: "Collections", path: "/categories" },
    { label: "Rooms", path: "/room-inspiration" },
    { label: "Products", path: "/featured-products" },
    { label: "Services", path: "/services-s" },
    { label: "About", path: "/showroom-video" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: isScrolled ? "rgba(250,247,242,0.97)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        boxShadow: isScrolled ? "0 2px 24px rgba(61,43,31,0.08)" : "none",
        transition: "all 0.4s ease",
        borderBottom: isScrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to='/'
          className="flex items-center gap-3 cursor-pointer"
        // onClick={() => scrollTo("/")}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg,#C9A84C,#8B6914)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>
              V
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 20,
              fontWeight: 700,
              // color: isScrolled ? "#3D2B1F" : "#FAF7F2",
              color: isScrolled || isRoutePage ? "#3D2B1F" : "#FAF7F2",
              letterSpacing: "0.02em",
              lineHeight: 1,
              transition: "color 0.4s",
            }}
          >
            VeluxDecor
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                `text-sm uppercase tracking-wider transition ${isActive
                  ? "text-[#C9A84C] font-semibold"
                  : isHome && !isScrolled
                    ? "text-white hover:text-[#C9A84C]"
                    : "text-[#3D2B1F] hover:text-[#C9A84C]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            // onClick={() => scrollTo("contact")}
            to='/contact'
            style={{
              background: "none",
              border: "1px solid rgba(201,168,76,0.7)",
              borderRadius: 6,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: isScrolled ? "#C9A84C" : "#FAF7F2",
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C9A84C";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#C9A84C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = isScrolled
                ? "#C9A84C"
                : "#FAF7F2";
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)";
            }}
          >
            Get a Quote
          </Link>
          <button
            onClick={() => setBookingOpen(true)}
            style={{
              background: "linear-gradient(135deg,#C9A84C,#8B6914)",
              border: "none",
              borderRadius: 6,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              letterSpacing: "0.05em",
              boxShadow: "0 4px 15px rgba(201,168,76,0.35)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            Book Consultation
          </button>

          <Link to='/login'
            onClick={() => setMenuOpen(false)}
            style={{
              background: "linear-gradient(135deg,#C9A84C,#8B6914)",
              border: "none",
              borderRadius: 6,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              letterSpacing: "0.05em",
              boxShadow: "0 4px 15px rgba(201,168,76,0.35)",
              transition: "all 0.2s",
            }}
          >
            Login
          </Link>
        </div>
        <button
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 2,
                background: isScrolled ? "#3D2B1F" : "#FAF7F2",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translateY(7px)"
                    : menuOpen && i === 2
                      ? "rotate(-45deg) translateY(-7px)"
                      : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transition: "all 0.3s",
              }}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            background: "rgba(250,247,242,0.98)",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            padding: "20px 24px 28px",
          }}
        >
          {navLinks.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                color: "#3D2B1F",
                padding: "12px 0",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                letterSpacing: "0.04em",
              }}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-2">

            <Link to='/login'
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 20,
                width: "auth",
                background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                border: "none",
                borderRadius: 8,
                padding: "14px",
                fontSize: 15,
                fontWeight: 600,
                color: "#fff",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              Login
            </Link>
            <button
              onClick={() => {
                setBookingOpen(true);
                setMenuOpen(false);
              }}
              style={{
                marginTop: 20,
                width: "100%",
                background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                border: "none",
                borderRadius: 8,
                padding: "14px",
                fontSize: 15,
                fontWeight: 600,
                color: "#fff",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};