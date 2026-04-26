// ─── Types ───────────────────────────────────────────────────────────────────

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  tag: string;
};

export type Product = {
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

export type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  project: string;
};

export type RoomScene = {
  id: string;
  label: string;
  image: string;
  tag: string;
};

export type HeroSlide = {
  image: string;
  tag: string;
  headline: string;
  sub: string;
  cta: string;
  ctaTarget: string;
};

export type ShowroomVideo = {
  id: number;
  src: string;
  title: string;
  thumbnail: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

// Import video assets
import VXD1 from "../../assets/videos/VXD1.mp4";
import VXD2 from "../../assets/videos/VXD2.mp4";
import VXD3 from "../../assets/videos/VXD3.mp4";
import VXD4 from "../../assets/videos/VXD4.mp4";
import VXD5 from "../../assets/videos/VXD5.mp4";
import VXD6 from "../../assets/videos/VXD6.mp4";

export const SHOWROOM_VIDEOS: ShowroomVideo[] = [
  {
    id: 1,
    src: VXD1,
    title: "The Flagship Experience",
    thumbnail:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80",
  },
  {
    id: 2,
    src: VXD2,
    title: "Premium Fabric Gallery",
    thumbnail:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80",
  },
  {
    id: 3,
    src: VXD3,
    title: "Bespoke Design Studio",
    thumbnail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    id: 4,
    src: VXD4,
    title: "Smart Home Simulation",
    thumbnail:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca5bf3?w=600&q=80",
  },
  {
    id: 5,
    src: VXD5,
    title: "Wallpaper Archive",
    thumbnail:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&q=80",
  },
  {
    id: 6,
    src: VXD6,
    title: "Behind the Scenes",
    thumbnail:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
];

export const CATEGORIES: Category[] = [
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
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
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

export const FEATURED_PRODUCTS: Product[] = [
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

export const TESTIMONIALS: Testimonial[] = [
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

export const STATS = [
  { value: 15000, suffix: "+", label: "Happy Customers" },
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Premium Brands" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

export const SERVICES = [
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

export const PROCESS_STEPS = [
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

export const FAQ_DATA = [
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
export const ROOM_SCENES: RoomScene[] = [
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
export const BRANDS = [
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
export const HERO_SLIDES: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600&q=90",
    tag: "New Collection 2025",
    headline: "Where Luxury\nMeets Living",
    sub: "Bespoke curtains, wallpapers, blinds & flooring — crafted for the modern Indian home.",
    cta: "Explore Collection",
    ctaTarget: "categories",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=90",
    tag: "Wallpaper Studio",
    headline: "Walls That\nTell Stories",
    sub: "From bold botanicals to textured minimalism — designer wallpapers that define a room.",
    cta: "View Wallpapers",
    ctaTarget: "products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1600&q=90",
    tag: "Smart Blinds",
    headline: "Light On\nYour Terms",
    sub: "Motorised & manual blinds engineered for perfect light control and effortless style.",
    cta: "Discover Blinds",
    ctaTarget: "categories",
  },
];