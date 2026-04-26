import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ReviewCard from "../../../pages/review/ReviewCard";
import CategoriesSection from "../../../pages/category/CategoriesSection";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  tag: string;
};

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
};

type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  project: string;
};

type RoomScene = {
  id: string;
  label: string;
  image: string;
  tag: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "curtains",
    name: "Curtains",
    icon: "🪟",
    description:
      "Luxurious drapes & sheers that transform every room with elegance and warmth",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tag: "Most Popular",
  },
  {
    id: "wallpaper",
    name: "Wallpaper",
    icon: "🎨",
    description:
      "Designer wallpapers from classic to contemporary — breathe new life into walls",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    tag: "Trending",
  },
  {
    id: "blinds",
    name: "Blinds",
    icon: "🏠",
    description:
      "Roller, Roman & Venetian blinds crafted for perfection in light control",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=600&q=80",
    tag: "New Arrivals",
  },
  {
    id: "home-automation",
    name: "Home Automation",
    icon: "⚡",
    description:
      "Smart motorised curtain & blind systems for the connected modern home",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca5bf3?w=600&q=80",
    tag: "Smart Living",
  },
  {
    id: "curtain-tracks",
    name: "Curtain Tracks",
    icon: "🔧",
    description:
      "Premium tracks and poles — ceiling, wall-mounted & bay window solutions",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    tag: "Accessories",
  },
  {
    id: "wooden-flooring",
    name: "Wooden Flooring",
    icon: "🪵",
    description:
      "Solid & engineered hardwood floors that bring timeless natural beauty underfoot",
    image:
      "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80",
    tag: "Premium",
  },
];

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Velvet Drapes",
    category: "Curtains",
    price: 4800,
    originalPrice: 6200,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&q=80",
    badge: "Bestseller",
    rating: 5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Marble Effect Wallpaper",
    category: "Wallpaper",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80",
    badge: "New",
    rating: 4,
    reviews: 64,
  },
  {
    id: 3,
    name: "Linen Roman Blind",
    category: "Blinds",
    price: 2800,
    originalPrice: 3500,
    image:
      "https://images.unsplash.com/photo-1597218868981-1b68e15f0065?w=500&q=80",
    rating: 5,
    reviews: 92,
  },
  {
    id: 4,
    name: "Smart Motorised Track",
    category: "Home Automation",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    badge: "Premium",
    rating: 5,
    reviews: 47,
  },
  {
    id: 5,
    name: "Bay Window Rail Set",
    category: "Curtain Tracks",
    price: 3200,
    originalPrice: 3800,
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=80",
    rating: 4,
    reviews: 38,
  },
  {
    id: 6,
    name: "Oak Engineered Floor",
    category: "Wooden Flooring",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=500&q=80",
    badge: "Luxury",
    rating: 5,
    reviews: 156,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely stunning curtains! The quality is outstanding and the installation team was professional and prompt. My living room looks like a 5-star hotel room now.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    project: "Living Room Curtains",
  },
  {
    id: 2,
    name: "Rajesh Mehta",
    location: "Delhi",
    rating: 5,
    text: "The motorised blinds are a game-changer. The home automation integration works perfectly with our smart home. Worth every rupee!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    project: "Full Home Automation",
  },
  {
    id: 3,
    name: "Anita Verma",
    location: "Bangalore",
    rating: 5,
    text: "The wallpaper selection is incredible — we found the most beautiful botanical print. The team helped us with the whole design concept. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    project: "Bedroom Wallpaper",
  },
  {
    id: 4,
    name: "Sunil Kapoor",
    location: "Pune",
    rating: 5,
    text: "We got our entire home done with VeluxDecor. From flooring to curtains, everything is cohesive and magnificent. Best interior decision we made.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    project: "Complete Home Makeover",
  },
  {
    id: 5,
    name: "Meera Nair",
    location: "Chennai",
    rating: 5,
    text: "The Roman blinds in our bedroom are perfectly fitted and the fabric is gorgeous. Customer service was exceptional throughout the whole process.",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    project: "Bedroom Blinds",
  },
];

const STATS = [
  { value: 15000, suffix: "+", label: "Happy Customers" },
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Premium Brands" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

const SERVICES = [
  {
    icon: "📐",
    title: "Free Home Consultation",
    desc: "Our expert designers visit your home to understand your vision and requirements.",
  },
  {
    icon: "🎨",
    title: "Custom Design Service",
    desc: "We create bespoke interior solutions tailored to your unique taste and lifestyle.",
  },
  {
    icon: "🔧",
    title: "Professional Installation",
    desc: "Certified installation teams ensure perfect fitting and flawless finish every time.",
  },
  {
    icon: "🛡️",
    title: "5-Year Warranty",
    desc: "All products and installations come with comprehensive 5-year warranty coverage.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Consultation",
    desc: "Book a free home visit with our design experts",
  },
  {
    step: "02",
    title: "Design & Quote",
    desc: "We present curated options and transparent pricing",
  },
  {
    step: "03",
    title: "Order & Produce",
    desc: "Premium materials cut and crafted to exact measurements",
  },
  {
    step: "04",
    title: "Install & Enjoy",
    desc: "Professional installation with complete satisfaction guarantee",
  },
];

const FAQ_DATA = [
  {
    q: "Do you offer free home visits?",
    a: "Yes! We offer complimentary home consultations across all major cities. Our design consultants visit your space, take measurements, and present tailored recommendations.",
  },
  {
    q: "How long does installation take?",
    a: "Most residential installations are completed in 1-2 days. Larger projects or full home makeovers may take 3-5 days. We always confirm timelines before starting.",
  },
  {
    q: "Do you have showrooms I can visit?",
    a: "We have showrooms in Mumbai, Delhi, Bangalore, Pune, and Chennai. You can touch and feel our full range of fabrics, wallpapers, and flooring samples in person.",
  },
  {
    q: "Can I get custom sizes and colors?",
    a: "Absolutely. All our curtains, blinds, and wallpapers are available in custom dimensions and a wide range of colour options. We also offer bespoke fabric sourcing.",
  },
  {
    q: "What brands do you carry?",
    a: "We stock 500+ premium brands including Swicofil, Harlequin, Zoffany, Hunter Douglas, Quick-Step, and many more. Our collection spans every price point and style.",
  },
  {
    q: "Is there EMI / finance available?",
    a: "Yes, we offer 0% EMI plans for 6, 12, and 24 months through leading banks and NBFCs. Finance options available on purchases above ₹15,000.",
  },
];

// Room Scenes — inspired by VJ Furnishings' room-based navigation
const ROOM_SCENES: RoomScene[] = [
  {
    id: "living",
    label: "Living Room",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80",
    tag: "Most Requested",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    tag: "Bestseller",
  },
  {
    id: "dining",
    label: "Dining Room",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    tag: "Elegant Picks",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    tag: "Functional Style",
  },
  {
    id: "study",
    label: "Study / Office",
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    tag: "Focus Spaces",
  },
];

// Brand/Fabric labels for marquee — inspired by Darpan Furnishings' brand strip
const BRANDS = [
  "Hunter Douglas",
  "Harlequin",
  "Zoffany",
  "Swicofil",
  "Quick-Step",
  "Sahco",
  "Osborne & Little",
  "Romo",
  "Designers Guild",
  "Colefax & Fowler",
  "Clarke & Clarke",
  "Mokum",
];

// ─── Hero slides ─────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600&q=90",
    tag: "New Collection 2025",
    headline: "Where Luxury\nMeets Living",
    sub: "Bespoke curtains, wallpapers, blinds & flooring — crafted for the modern Indian home.",
    cta: "Explore Collection",
    ctaTarget: "categories",
    label: "Image 1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=90",
    tag: "Wallpaper Studio",
    headline: "Walls That\nTell Stories",
    sub: "From bold botanicals to textured minimalism — designer wallpapers that define a room.",
    cta: "View Wallpapers",
    ctaTarget: "products",
    label: "Image 2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1600&q=90",
    tag: "Smart Blinds",
    headline: "Light On\nYour Terms",
    sub: "Motorised & manual blinds engineered for perfect light control and effortless style.",
    cta: "Discover Blinds",
    ctaTarget: "categories",
    label: "Image 3",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        style={{ color: s <= rating ? "#C9A84C" : "#ccc", fontSize: "14px" }}
      >
        ★
      </span>
    ))}
  </div>
);

const AnimatedCounter = ({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);
  return (
    <span>
      {inView ? count : 0}
      {suffix}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const AiAgentMobile = (): JSX.Element => {

  
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("curtains");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeRoom, setActiveRoom] = useState("living");

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [productsRef, productsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [roomRef, roomInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [brandsRef, brandsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance hero slides
  useEffect(() => {
    const t = setInterval(
      () => setHeroSlide((p) => (p + 1) % HERO_SLIDES.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Collections", id: "categories" },
    { label: "Rooms", id: "rooms" },
    { label: "Products", id: "products" },
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const slide = HERO_SLIDES[heroSlide];
  const activeRoomScene =
    ROOM_SCENES.find((r) => r.id === activeRoom) || ROOM_SCENES[0];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        fontFamily: "'Open Sans', sans-serif",
        background: "#FAF7F2",
        color: "#1A1A1A",
      }}
    >
      {/* ── NAVBAR ── */}
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
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("hero")}
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
                color: isScrolled ? "#3D2B1F" : "#FAF7F2",
                letterSpacing: "0.02em",
                lineHeight: 1,
                transition: "color 0.4s",
              }}
            >
              VeluxDecor
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  color: isScrolled ? "#3D2B1F" : "#FAF7F2",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isScrolled
                    ? "#3D2B1F"
                    : "#FAF7F2")
                }
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
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
            </button>
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
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
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
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
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
              </button>
            ))}
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
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════
          ── HERO: Full-bleed cinematic slideshow (Sarom-inspired)
         ══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Slide images */}
        {HERO_SLIDES.map((sl, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              transition: "opacity 1.2s ease",
              opacity: i === heroSlide ? 1 : 0,
              zIndex: i === heroSlide ? 1 : 0,
            }}
          >
            <img
              src={sl.image}
              alt={sl.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: i === heroSlide ? "scale(1.03)" : "scale(1)",
                transition: "transform 7s ease",
              }}
            />
          </div>
        ))}

        {/* Dark overlay — European style (Sarom) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(to right, rgba(20,12,6,0.72) 0%, rgba(20,12,6,0.35) 55%, rgba(20,12,6,0.1) 100%)",
          }}
        />

        {/* Vertical gold line — Sarom signature */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: "15%",
            bottom: "15%",
            width: 1,
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.6), transparent)",
            zIndex: 3,
          }}
          className="hidden md:block"
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-6 w-full"
            style={{ paddingLeft: "clamp(24px,7vw,120px)" }}
          >
            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s ease",
              }}
            >
              {/* Eyebrow */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#C9A84C",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {slide.tag}
                </span>
              </div>
              {/* Headline */}
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(42px,6vw,88px)",
                  fontWeight: 700,
                  color: "#FAF7F2",
                  lineHeight: 1.05,
                  marginBottom: 24,
                  whiteSpace: "pre-line",
                  letterSpacing: "-0.01em",
                }}
              >
                {slide.headline}
              </h1>
              <p
                style={{
                  fontSize: "clamp(15px,1.3vw,18px)",
                  lineHeight: 1.7,
                  color: "rgba(250,247,242,0.75)",
                  marginBottom: 44,
                  maxWidth: 460,
                }}
              >
                {slide.sub}
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollTo(slide.ctaTarget)}
                  style={{
                    background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                    border: "none",
                    borderRadius: 4,
                    padding: "16px 36px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    boxShadow: "0 8px 28px rgba(201,168,76,0.4)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 36px rgba(201,168,76,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "0 8px 28px rgba(201,168,76,0.4)";
                  }}
                >
                  {slide.cta}
                </button>
                <button
                  onClick={() => setBookingOpen(true)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(250,247,242,0.45)",
                    borderRadius: 4,
                    padding: "15px 32px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#FAF7F2",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C9A84C";
                    e.currentTarget.style.color = "#C9A84C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(250,247,242,0.45)";
                    e.currentTarget.style.color = "#FAF7F2";
                  }}
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators (bottom-right) */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 48,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              style={{
                height: i === heroSlide ? 32 : 16,
                width: 2,
                background:
                  i === heroSlide ? "#C9A84C" : "rgba(250,247,242,0.35)",
                border: "none",
                cursor: "pointer",
                borderRadius: 2,
                transition: "all 0.4s",
              }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div
          style={{
            position: "absolute",
            bottom: 42,
            left: "clamp(24px,7vw,120px)",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#C9A84C",
              lineHeight: 1,
            }}
          >
            0{heroSlide + 1}
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(250,247,242,0.3)",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: "rgba(250,247,242,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            0{HERO_SLIDES.length}
          </span>
        </div>

        {/* Quick-trust bar pinned at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="hidden md:flex"
            style={{
              background: "rgba(250,247,242,0.07)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(201,168,76,0.15)",
              padding: "18px 64px",
              gap: 64,
              alignItems: "center",
            }}
          >
            {[
              ["⭐ 4.9/5", "Google Rating"],
              ["🏆 15,000+", "Projects Done"],
              ["📅 25 Years", "Of Excellence"],
              ["🏙️ 6 Cities", "Showrooms"],
            ].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FAF7F2",
                    lineHeight: 1,
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(250,247,242,0.5)",
                    marginTop: 4,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── BRANDS MARQUEE — Darpan-inspired fabric brand strip
         ══════════════════════════════════════════════════════════ */}
      <section
        ref={brandsRef}
        style={{
          background: "#3D2B1F",
          padding: "0",
          overflow: "hidden",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* Label cell */}
          <div
            style={{
              minWidth: 180,
              padding: "22px 32px",
              borderRight: "1px solid rgba(201,168,76,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
            className="hidden md:flex"
          >
            <div
              style={{
                width: 3,
                height: 28,
                background: "#C9A84C",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(250,247,242,0.5)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Premium
              <br />
              Brands
            </span>
          </div>
          {/* Scrolling brands */}
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div
              style={{
                display: "flex",
                gap: 0,
                animation: "marquee 28s linear infinite",
                width: "max-content",
              }}
            >
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <div
                  key={i}
                  style={{
                    padding: "22px 36px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(250,247,242,0.45)",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                    borderRight: "1px solid rgba(250,247,242,0.05)",
                    transition: "color 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(250,247,242,0.45)")
                  }
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── STATS BANNER
         ══════════════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        style={{
          background: "linear-gradient(135deg,#3D2B1F,#6B4C3B)",
          padding: "70px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 40,
              textAlign: "center",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  opacity: statsInView ? 1 : 0,
                  transition: "opacity 0.6s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 52,
                    fontWeight: 700,
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter
                    target={s.value}
                    suffix={s.suffix}
                    inView={statsInView}
                  />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(250,247,242,0.6)",
                    marginTop: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── ROOM INSPIRATION — VJ Furnishings &#39;shop by room&#39; concept
         ══════════════════════════════════════════════════════════ */}
      <section
        id="rooms"
        ref={roomRef}
        style={{ padding: "110px 0", background: "#FAF7F2" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 72,
              alignItems: "start",
            }}
          >
            {/* Left: text + tabs */}
            <div
              style={{
                opacity: roomInView ? 1 : 0,
                transform: roomInView ? "translateX(0)" : "translateX(-24px)",
                transition: "all 0.9s ease",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(201,168,76,0.1)",
                  borderRadius: 30,
                  padding: "6px 18px",
                  marginBottom: 24,
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
                  Shop by Room
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(28px,3.5vw,50px)",
                  fontWeight: 700,
                  color: "#3D2B1F",
                  marginBottom: 16,
                  lineHeight: 1.1,
                }}
              >
                Find the Perfect Look
                <br />
                for Every Space
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "#6B4C3B",
                  marginBottom: 44,
                  maxWidth: 420,
                }}
              >
                Browse curated combinations of curtains, blinds, wallpapers and
                flooring — organised by the room you&#39;re styling, not just by
                product type.
              </p>
              {/* Room tabs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {ROOM_SCENES.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoom(room.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background:
                        activeRoom === room.id ? "#3D2B1F" : "transparent",
                      border: `1px solid ${activeRoom === room.id ? "#3D2B1F" : "rgba(61,43,31,0.1)"}`,
                      borderRadius: 10,
                      padding: "16px 22px",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: activeRoom === room.id ? "#FAF7F2" : "#3D2B1F",
                          transition: "color 0.25s",
                        }}
                      >
                        {room.label}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color:
                            activeRoom === room.id
                              ? "rgba(201,168,76,0.8)"
                              : "#8A8278",
                          marginTop: 2,
                          transition: "color 0.25s",
                        }}
                      >
                        {room.tag}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 18,
                        color:
                          activeRoom === room.id
                            ? "#C9A84C"
                            : "rgba(61,43,31,0.3)",
                        transition: "color 0.25s",
                      }}
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollTo("categories")}
                style={{
                  marginTop: 32,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "gap 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
              >
                View All Collections <span style={{ fontSize: 20 }}>→</span>
              </button>
            </div>

            {/* Right: big room scene image */}
            <div
              style={{
                opacity: roomInView ? 1 : 0,
                transform: roomInView ? "translateX(0)" : "translateX(24px)",
                transition: "all 0.9s ease 0.2s",
                position: "relative",
              }}
            >
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(61,43,31,0.18)",
                  aspectRatio: "4/5",
                }}
              >
                <img
                  key={activeRoomScene.id}
                  src={activeRoomScene.image}
                  alt={activeRoomScene.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 0.6s, transform 0.8s",
                    animation: "roomFadeIn 0.6s ease",
                  }}
                />
              </div>
              {/* Room label overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 28,
                  left: 28,
                  right: 28,
                  background: "rgba(250,247,242,0.92)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 12,
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#C9A84C",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    {activeRoomScene.tag}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#3D2B1F",
                    }}
                  >
                    {activeRoomScene.label}
                  </div>
                </div>
                <button
                  onClick={() => setBookingOpen(true)}
                  style={{
                    background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  Get Ideas
                </button>
              </div>
              <style>{`@keyframes roomFadeIn { from { opacity:0; transform:scale(1.04) } to { opacity:1; transform:scale(1) } }`}</style>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── CATEGORIES — Darpan-inspired horizontal tile grid
         ══════════════════════════════════════════════════════════ */}
      


<CategoriesSection
  categories={CATEGORIES}
  activeCategory={activeCategory}
  setActiveCategory={setActiveCategory}
/>



      {/* ══════════════════════════════════════════════════════════
          ── FEATURED PRODUCTS
         ══════════════════════════════════════════════════════════ */}
      <section
        id="products"
        ref={productsRef}
        style={{ padding: "110px 0", background: "#FAF7F2" }}
      >
        <div className="max-w-7xl mx-auto px-6">
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
                Featured Products
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(28px,4vw,50px)",
                fontWeight: 700,
                color: "#3D2B1F",
                marginBottom: 16,
              }}
            >
              Bestselling Pieces
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#6B4C3B",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Handpicked from our premium collection — loved by thousands of
              homeowners across India.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {FEATURED_PRODUCTS.map((p, i) => (
              <div
                key={p.id}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(61,43,31,0.06)",
                  opacity: productsInView ? 1 : 0,
                  transform: productsInView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 16px 48px rgba(61,43,31,0.14)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(61,43,31,0.06)")
                }
              >
                <div
                  style={{
                    position: "relative",
                    height: 230,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "none")
                    }
                  />
                  {p.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "#C9A84C",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.badge}
                    </div>
                  )}
                  <button
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.92)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#C9A84C")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.92)")
                    }
                  >
                    ♡
                  </button>
                </div>
                <div style={{ padding: "18px 20px 22px" }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#C9A84C",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {p.category}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#3D2B1F",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    <StarRating rating={p.rating} />
                    <span style={{ fontSize: 12, color: "#8A8278" }}>
                      ({p.reviews})
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#3D2B1F",
                        }}
                      >
                        ₹{p.price.toLocaleString()}
                      </span>
                      {p.originalPrice && (
                        <span
                          style={{
                            fontSize: 13,
                            color: "#8A8278",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{p.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      style={{
                        background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                        border: "none",
                        borderRadius: 8,
                        padding: "9px 16px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#fff",
                        cursor: "pointer",
                        letterSpacing: "0.03em",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateY(-1px)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "none")
                      }
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 52 }}>
            <button
              style={{
                background: "transparent",
                border: "2px solid #3D2B1F",
                borderRadius: 8,
                padding: "16px 48px",
                fontSize: 14,
                fontWeight: 700,
                color: "#3D2B1F",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3D2B1F";
                e.currentTarget.style.color = "#FAF7F2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#3D2B1F";
              }}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── SERVICES / WHY CHOOSE US
         ══════════════════════════════════════════════════════════ */}
      <section
        id="services"
        ref={servicesRef}
        style={{ padding: "110px 0", background: "#F0EAE0" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                opacity: servicesInView ? 1 : 0,
                transform: servicesInView
                  ? "translateX(0)"
                  : "translateX(-30px)",
                transition: "all 0.8s ease",
              }}
            >
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 30px 80px rgba(61,43,31,0.18)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80"
                  alt="Our Service"
                  style={{ width: "100%", height: 500, objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 30,
                  right: -30,
                  background: "#fff",
                  borderRadius: 16,
                  padding: "20px 28px",
                  boxShadow: "0 16px 48px rgba(61,43,31,0.15)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#C9A84C",
                  }}
                >
                  98%
                </div>
                <div
                  style={{ fontSize: 13, color: "#6B4C3B", fontWeight: 500 }}
                >
                  Customer Satisfaction
                </div>
                <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#C9A84C", fontSize: 14 }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: -20,
                  background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                  borderRadius: 12,
                  padding: "14px 20px",
                  boxShadow: "0 8px 25px rgba(201,168,76,0.3)",
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Playfair Display',serif",
                  }}
                >
                  25+
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  Years of Excellence
                </div>
              </div>
            </div>
            <div
              style={{
                opacity: servicesInView ? 1 : 0,
                transform: servicesInView
                  ? "translateX(0)"
                  : "translateX(30px)",
                transition: "all 0.8s ease 0.2s",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(201,168,76,0.1)",
                  borderRadius: 30,
                  padding: "6px 18px",
                  marginBottom: 24,
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
                  Why Choose Us
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(28px,3.5vw,46px)",
                  fontWeight: 700,
                  color: "#3D2B1F",
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                Excellence in Every
                <br />
                Detail of Your Home
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "#6B4C3B",
                  marginBottom: 40,
                }}
              >
                With over two decades of expertise, we bring together the finest
                materials, master craftsmen, and cutting-edge design sensibility
                to transform your home into a personal sanctuary.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                {SERVICES.map((s) => (
                  <div
                    key={s.title}
                    style={{
                      display: "flex",
                      gap: 18,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        minWidth: 50,
                        borderRadius: 12,
                        fontSize: 20,
                        background: "rgba(201,168,76,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#3D2B1F",
                          marginBottom: 4,
                          fontSize: 15,
                        }}
                      >
                        {s.title}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#6B4C3B",
                          lineHeight: 1.6,
                        }}
                      >
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



<ReviewCard/>
      {/* ══════════════════════════════════════════════════════════
          ── PROCESS STEPS
         ══════════════════════════════════════════════════════════ */}
      <section
        ref={processRef}
        style={{ padding: "110px 0", background: "#3D2B1F" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201,168,76,0.15)",
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
                How It Works
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(28px,4vw,48px)",
                fontWeight: 700,
                color: "#FAF7F2",
                marginBottom: 16,
              }}
            >
              Your Journey to a Dream Home
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "rgba(250,247,242,0.6)",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              A seamless, stress-free experience from the first consultation to
              the final installation.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 40,
                left: "12.5%",
                right: "12.5%",
                height: 1,
                background:
                  "linear-gradient(to right,rgba(201,168,76,0.1),rgba(201,168,76,0.5),rgba(201,168,76,0.1))",
              }}
              className="hidden md:block"
            />
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.step}
                style={{
                  textAlign: "center",
                  padding: "0 20px",
                  opacity: processInView ? 1 : 0,
                  transform: processInView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.15}s`,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: "2px solid rgba(201,168,76,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 28px",
                    background: "rgba(201,168,76,0.08)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#C9A84C",
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#FAF7F2",
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(250,247,242,0.55)",
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── TESTIMONIALS
         ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "110px 0",
          background: "#FAF7F2",
          overflow: "hidden",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
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
                Customer Stories
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
              Loved by Homeowners Across India
            </h2>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "48px",
              boxShadow: "0 8px 40px rgba(61,43,31,0.07)",
              border: "1px solid rgba(201,168,76,0.1)",
              marginBottom: 28,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 48,
                fontSize: 96,
                color: "rgba(201,168,76,0.1)",
                fontFamily: "'Playfair Display',serif",
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              "
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 40,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#C9A84C", fontSize: 22 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(18px,2.5vw,24px)",
                    fontStyle: "italic",
                    color: "#3D2B1F",
                    lineHeight: 1.6,
                    marginBottom: 28,
                  }}
                >
                  "{TESTIMONIALS[activeTestimonial].text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <img
                    src={TESTIMONIALS[activeTestimonial].avatar}
                    alt={TESTIMONIALS[activeTestimonial].name}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid rgba(201,168,76,0.3)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#3D2B1F",
                        fontSize: 16,
                      }}
                    >
                      {TESTIMONIALS[activeTestimonial].name}
                    </div>
                    <div style={{ fontSize: 13, color: "#8A8278" }}>
                      {TESTIMONIALS[activeTestimonial].location} ·{" "}
                      {TESTIMONIALS[activeTestimonial].project}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    style={{
                      width: i === activeTestimonial ? 8 : 6,
                      height: i === activeTestimonial ? 8 : 6,
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background:
                        i === activeTestimonial
                          ? "#C9A84C"
                          : "rgba(201,168,76,0.3)",
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 16,
            }}
          >
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.id}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "24px",
                  boxShadow: "0 4px 16px rgba(61,43,31,0.05)",
                  border: "1px solid rgba(201,168,76,0.08)",
                }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#C9A84C", fontSize: 12 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6B4C3B",
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}
                >
                  "{t.text.substring(0, 100)}..."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#3D2B1F",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#8A8278" }}>
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── FAQ
         ══════════════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════════════
          ── CTA BANNER
         ══════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        style={{
          padding: "110px 0",
          background:
            "linear-gradient(135deg,#3D2B1F 0%,#6B4C3B 50%,#3D2B1F 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "-30%",
              right: "-10%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "rgba(201,168,76,0.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "-5%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(201,168,76,0.04)",
            }}
          />
          <svg
            style={{
              position: "absolute",
              right: 100,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.07,
              width: 300,
              height: 300,
            }}
            viewBox="0 0 300 300"
          >
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1"
            />
            <circle
              cx="150"
              cy="150"
              r="100"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="0.5"
            />
            <circle
              cx="150"
              cy="150"
              r="60"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div
          className="max-w-4xl mx-auto px-6 text-center"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#C9A84C",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              ✦ Limited Time — Free Consultation ✦
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(30px,5vw,60px)",
                fontWeight: 700,
                color: "#FAF7F2",
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Ready to Transform
              <br />
              <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
                Your Home?
              </span>
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "rgba(250,247,242,0.7)",
                marginBottom: 48,
                maxWidth: 520,
                margin: "0 auto 48px",
              }}
            >
              Book a free in-home consultation today and let our experts bring
              your dream interior to life.
            </p>
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setBookingOpen(true)}
                style={{
                  background: "linear-gradient(135deg,#C9A84C,#E8C97A)",
                  border: "none",
                  borderRadius: 6,
                  padding: "18px 48px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#3D2B1F",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(250,247,242,0.3)",
                  borderRadius: 6,
                  padding: "17px 40px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FAF7F2",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(250,247,242,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(250,247,242,0.3)")
                }
              >
                View Showrooms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── CONTACT
         ══════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{ padding: "110px 0", background: "#FAF7F2" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(201,168,76,0.1)",
                  borderRadius: 30,
                  padding: "6px 18px",
                  marginBottom: 24,
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
                  Contact Us
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(28px,3.5vw,44px)",
                  fontWeight: 700,
                  color: "#3D2B1F",
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                Let&#39;s Create Something Beautiful Together
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "#6B4C3B",
                  marginBottom: 40,
                }}
              >
                Visit us at any of our showrooms, or we&#39;ll come to you. Our
                design consultants are ready to help you create the perfect
                interior.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                  marginBottom: 48,
                }}
              >
                {[
                  {
                    icon: "📍",
                    label: "Head Office",
                    val: "123 Design Avenue, Andheri West, Mumbai - 400053",
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    val: "+91 98765 43210 | +91 22 4567 8900",
                  },
                  { icon: "✉️", label: "Email", val: "hello@veluxdecor.com" },
                  {
                    icon: "⏰",
                    label: "Hours",
                    val: "Mon–Sat: 10am – 7pm | Sun: 11am – 5pm",
                  },
                ].map((info) => (
                  <div
                    key={info.label}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        minWidth: 44,
                        borderRadius: 10,
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                      }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#C9A84C",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 3,
                        }}
                      >
                        {info.label}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#3D2B1F",
                          lineHeight: 1.5,
                        }}
                      >
                        {info.val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#8A8278",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Our Showrooms
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {[
                    "Mumbai",
                    "Delhi",
                    "Bangalore",
                    "Pune",
                    "Chennai",
                    "Hyderabad",
                  ].map((city) => (
                    <div
                      key={city}
                      style={{
                        background: "rgba(201,168,76,0.08)",
                        borderRadius: 20,
                        padding: "6px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#3D2B1F",
                        border: "1px solid rgba(201,168,76,0.15)",
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: "48px",
                boxShadow: "0 8px 48px rgba(61,43,31,0.08)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#3D2B1F",
                  marginBottom: 8,
                }}
              >
                Send Us a Message
              </h3>
              <p style={{ fontSize: 14, color: "#8A8278", marginBottom: 32 }}>
                We&#39;ll get back to you within 24 hours.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {[
                    { lbl: "First Name", ph: "Rahul" },
                    { lbl: "Last Name", ph: "Sharma" },
                  ].map((f) => (
                    <div key={f.lbl}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#3D2B1F",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        {f.lbl}
                      </label>
                      <input
                        placeholder={f.ph}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 8,
                          border: "1px solid #E0D8CC",
                          fontSize: 14,
                          color: "#3D2B1F",
                          background: "#FDFAF6",
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#C9A84C")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#E0D8CC")}
                      />
                    </div>
                  ))}
                </div>
                {[
                  {
                    lbl: "Email Address",
                    ph: "rahul@example.com",
                    type: "email",
                  },
                  { lbl: "Phone Number", ph: "+91 98765 43210", type: "tel" },
                ].map((f) => (
                  <div key={f.lbl}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#3D2B1F",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {f.lbl}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.ph}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 8,
                        border: "1px solid #E0D8CC",
                        fontSize: 14,
                        color: "#3D2B1F",
                        background: "#FDFAF6",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D8CC")}
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#3D2B1F",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Service Interested In
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 8,
                      border: "1px solid #E0D8CC",
                      fontSize: 14,
                      color: "#3D2B1F",
                      background: "#FDFAF6",
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                    onBlur={(e) => (e.target.style.borderColor = "#E0D8CC")}
                  >
                    <option value="">Select a service...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                    <option value="full">Complete Home Makeover</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#3D2B1F",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your project, style preferences, and any specific requirements..."
                    rows={4}
                    style={
                      {
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 8,
                        border: "1px solid #E0D8CC",
                        fontSize: 14,
                        color: "#3D2B1F",
                        background: "#FDFAF6",
                        outline: "none",
                        boxSizing: "border-box",
                        resize: "vertical",
                        fontFamily: "'Open Sans',sans-serif",
                        transition: "border-color 0.2s",
                      } as React.CSSProperties
                    }
                    onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                    onBlur={(e) => (e.target.style.borderColor = "#E0D8CC")}
                  />
                </div>
                <button
                  style={{
                    background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                    border: "none",
                    borderRadius: 10,
                    padding: "16px",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    cursor: "pointer",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    boxShadow: "0 6px 20px rgba(201,168,76,0.3)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "none")
                  }
                >
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ── FOOTER
         ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#3D2B1F", padding: "80px 0 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              gap: 48,
              paddingBottom: 60,
              borderBottom: "1px solid rgba(250,247,242,0.07)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}
                  >
                    V
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#FAF7F2",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                >
                  VeluxDecor
                </div>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(250,247,242,0.5)",
                  lineHeight: 1.7,
                  marginBottom: 28,
                  maxWidth: 260,
                }}
              >
                India&#39;s premier destination for luxury curtains, wallpaper,
                blinds, home automation, curtain tracks, and wooden flooring —
                VeluxDecor since 1999.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {["f", "in", "t", "ig"].map((s) => (
                  <button
                    key={s}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(250,247,242,0.55)",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#C9A84C";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "rgba(250,247,242,0.55)";
                    }}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            {[
              {
                title: "Products",
                links: [
                  "Curtains",
                  "Wallpaper",
                  "Blinds",
                  "Home Automation",
                  "Curtain Tracks",
                  "Wooden Flooring",
                ],
              },
              {
                title: "Services",
                links: [
                  "Free Consultation",
                  "Custom Design",
                  "Installation",
                  "Repair & Maintenance",
                  "Corporate Projects",
                  "Interior Styling",
                ],
              },
              {
                title: "Company",
                links: [
                  "About Us",
                  "Our Story",
                  "Showrooms",
                  "Blog",
                  "Careers",
                  "Press",
                ],
              },
              {
                title: "Support",
                links: [
                  "Contact Us",
                  "FAQ",
                  "Shipping Policy",
                  "Return Policy",
                  "Privacy Policy",
                  "Terms of Use",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#C9A84C",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 20,
                  }}
                >
                  {col.title}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        style={{
                          fontSize: 13,
                          color: "rgba(250,247,242,0.5)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#C9A84C")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(250,247,242,0.5)")
                        }
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "40px 0",
              borderBottom: "1px solid rgba(250,247,242,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 20,
                  color: "#FAF7F2",
                  marginBottom: 6,
                }}
              >
                Get Design Inspiration
              </h4>
              <p style={{ fontSize: 13, color: "rgba(250,247,242,0.45)" }}>
                Subscribe for exclusive offers, design tips, and new arrivals.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: 0,
                maxWidth: 420,
                flex: 1,
                minWidth: 280,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  borderRadius: "6px 0 0 6px",
                  border: "1px solid rgba(250,247,242,0.1)",
                  borderRight: "none",
                  fontSize: 14,
                  background: "rgba(255,255,255,0.06)",
                  color: "#FAF7F2",
                  outline: "none",
                }}
              />
              <button
                style={{
                  background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                  border: "none",
                  borderRadius: "0 6px 6px 0",
                  padding: "14px 24px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
          <div
            style={{
              padding: "24px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{ fontSize: 13, color: "rgba(250,247,242,0.35)" }}>
              © {new Date().getFullYear()} VeluxDecor. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "rgba(250,247,242,0.3)",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(250,247,242,0.3)")
                  }
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── BOOKING MODAL ── */}
      {bookingOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "rgba(61,43,31,0.65)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              background: "#FAF7F2",
              borderRadius: 24,
              padding: "48px",
              maxWidth: 540,
              width: "100%",
              boxShadow: "0 40px 100px rgba(61,43,31,0.3)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setBookingOpen(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(61,43,31,0.08)",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#3D2B1F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201,168,76,0.1)",
                borderRadius: 30,
                padding: "5px 14px",
                marginBottom: 20,
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Free Service
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#3D2B1F",
                marginBottom: 8,
              }}
            >
              Book Your Free Consultation
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "#8A8278",
                marginBottom: 32,
                lineHeight: 1.6,
              }}
            >
              Our expert designer will visit your home at your convenience —
              completely free, no obligation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { lbl: "Full Name", ph: "Your full name", type: "text" },
                { lbl: "Mobile Number", ph: "+91 98765 43210", type: "tel" },
                { lbl: "Email Address", ph: "your@email.com", type: "email" },
                {
                  lbl: "City",
                  ph: "Mumbai, Delhi, Bangalore...",
                  type: "text",
                },
              ].map((f) => (
                <div key={f.lbl}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#3D2B1F",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {f.lbl}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 8,
                      border: "1px solid #E0D8CC",
                      fontSize: 14,
                      color: "#3D2B1F",
                      background: "#fff",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                    onBlur={(e) => (e.target.style.borderColor = "#E0D8CC")}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#3D2B1F",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: "1px solid #E0D8CC",
                    fontSize: 14,
                    color: "#3D2B1F",
                    background: "#fff",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8CC")}
                />
              </div>
              <button
                style={{
                  marginTop: 8,
                  background: "linear-gradient(135deg,#C9A84C,#8B6914)",
                  border: "none",
                  borderRadius: 10,
                  padding: "16px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  boxShadow: "0 6px 20px rgba(201,168,76,0.3)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-1px)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                Confirm Free Consultation →
              </button>
              <p
                style={{ fontSize: 12, color: "#8A8278", textAlign: "center" }}
              >
                ✓ No charges &nbsp; ✓ No obligation &nbsp; ✓ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp */}
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
        💬
      </a>
    </div>
  );
};
