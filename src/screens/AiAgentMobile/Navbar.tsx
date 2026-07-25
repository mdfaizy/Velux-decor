import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/slice/reduxHooks";
import { useNavigate } from "react-router-dom";
import { setUser, setToken } from "../../redux/slice/authSlice";
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

  const { user } = useAppSelector((state) => state.auth);
const dispatch = useAppDispatch();
const navigate = useNavigate();
console.log(user);
const handleLogout = () => {
  dispatch(setUser(null));
  dispatch(setToken(null));
  navigate("/login");
};
  //  useEffect(() => {
  //   const onScroll = () => setIsScrolled(window.scrollY > 60);
  //   window.addEventListener("scroll", onScroll);
  //    onScroll(); // 👈 ye naya line add karo
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

//   useEffect(() => {
//   const onScroll = () => {
//     setIsScrolled(window.scrollY > 60);
//   };

//   onScroll();

//   window.addEventListener("scroll", onScroll);

//   return () => window.removeEventListener("scroll", onScroll);
// }, []);

useEffect(() => {
  const onScroll = () => {
    if (location.pathname === "/") {
      // Home page
      setIsScrolled(window.scrollY > 60);
    } else {
      // Other pages
      setIsScrolled(true);
    }
  };

  onScroll();

  window.addEventListener("scroll", onScroll);

  return () => window.removeEventListener("scroll", onScroll);
}, [location.pathname]);

  
  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   // 🔥 jab route change ho
  //   setIsRoutePage(true);
  //   setIsScrolled(true); // force dark navbar
  // }, [location.pathname]);

  useEffect(() => {
  window.scrollTo(0, 0);
  setIsRoutePage(true);
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
        // background: isScrolled ? "#FFFFFF" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        boxShadow: isScrolled ? "0 2px 24px rgba(61,43,31,0.08)" : "none",
        transition: "all 0.4s ease",
        borderBottom: isScrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        borderRadius: isScrolled ? "0 0 12px 12px" : "0",
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
              VD
            </span>
          </div>
         <div
  style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 700,
    color: isScrolled || isRoutePage ? "#3D2B1F" : "#FAF7F2",
    // color: isScrolled ? "#3D2B1F" : "#FAF7F2",
    letterSpacing: "0.02em",
    lineHeight: 1,
    transition: "color 0.4s",
  }}
>
  VELUX DECOR<sup style={{ fontSize: "14px", marginLeft: "1px ,lg:text-xs" }}>®</sup>
  
</div>
        </Link>
        {/* <div className="hidden md:flex items-center gap-6"> */}
        <div className="hidden lg:flex items-center gap-4">
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

        {/* <div className="hidden md:flex items-center gap-3"> */}
        <div className="hidden lg:flex items-center gap-3">
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
              e.currentTarget.style.color = isScrolled? "#C9A84C": "#FAF7F2";
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)";
            }}>
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
            onMouseEnter={(e) =>(e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
            Book Consultation
          </button>
          {!user ? (
  <>
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
           <Link to='/signup'
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
            Signup
          </Link>
  </>
) : (
 <div className="relative group flex items-center gap-3">

  {/* 🔥 AVATAR */}
  <div className="relative">
    <img
      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
      className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#C9A84C] shadow-md hover:scale-105 transition"
    />

    {/* ONLINE DOT */}
    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
  </div>

  {/* 🔥 DROPDOWN */}
  <div className="
    absolute top-14 right-0
    w-56
    bg-white/90 backdrop-blur-lg
    shadow-2xl rounded-xl
    border border-gray-200
    opacity-0 invisible
    group-hover:opacity-100 group-hover:visible
    transform translate-y-2 group-hover:translate-y-0
    transition-all duration-300 z-50
  ">

    {/* 🔥 USER INFO */}
    <div className="px-4 py-3 border-b">
      <p className="font-semibold text-gray-800">{user.name}</p>
      <p className="text-xs text-gray-500 truncate">{user.email}</p>
    </div>
    
        
{(user?.role === "admin" || user?.role === "designer") && (
  <button
    onClick={() => {
      navigate("/dashboard/overview");
      setMenuOpen(false);
    }}
    className="w-full text-left px-4 py-2 text-sm hover:text-[#C9A84C]"
  >
    📊 Dashboard
  </button>
)}
    {/* 🔥 MENU ITEMS */}
    <div className="py-2">

      <button
        onClick={() => navigate("/profile")}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 transition"
      >
        👤 Profile
      </button>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition"
      >
        🚪 Logout
      </button>

    </div>

  </div>
</div>
)}
          
        </div>
        <button
          // className="flex flex-col gap-[5px] md:hidden"
          className="flex flex-col gap-[5px] lg:hidden"
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

      {/* {menuOpen && (
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
      )} */}

      {menuOpen && (
  <div
    className="bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#C9A84C]/20 px-6 py-6 space-y-4"
  >

    {/* 🔥 NAV LINKS */}
    {navLinks.map((l) => (
      <NavLink
        key={l.path}
        to={l.path}
        onClick={() => setMenuOpen(false)}
        className="block text-[#3D2B1F] font-medium py-2 border-b border-[#C9A84C]/10"
      >
        {l.label}
      </NavLink>
    ))}

    {/* 🔥 AUTH SECTION */}
    {!user ? (
      <div className="flex gap-2 mt-4">

        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="w-full text-center bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-white py-3 rounded-lg font-semibold"
        >
          Login
        </Link>

        <Link
          to="/signup"
          onClick={() => setMenuOpen(false)}
          className="w-full text-center bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-white py-3 rounded-lg font-semibold"
        >
          Signup
        </Link>

      </div>
    ) : (
      <div className="mt-4 bg-white rounded-xl shadow p-4">

        {/* 🔥 USER INFO */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        {/* 🔥 ACTIONS */}
        <button
          onClick={() => {
            navigate("/profile");
            setMenuOpen(false);
          }}
          className="w-full text-left py-2 text-sm hover:text-[#C9A84C]"
        >
          👤 Profile
        </button>
        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="w-full text-left py-2 text-sm text-red-500 hover:text-red-600"
        >
          🚪 Logout
        </button>

      </div>
    )}

    {/* 🔥 CONSULT BUTTON */}
    <button
      onClick={() => {
        setBookingOpen(true);
        setMenuOpen(false);
      }}
      className="w-full mt-4 bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-white py-3 rounded-lg font-semibold"
    >
      Book Free Consultation
    </button>

  </div>
)}
    </nav>
  );
};