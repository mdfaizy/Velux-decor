import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Import all the refactored components
import Navbar  from "./Navbar";
import Hero from "./Hero";
import Brand from "./Brand";
import Stats from "./Stats";
import { RoomInspiration } from "./RoomInspiration";
import { Categories } from "./Categories";
import  {FeaturedProducts} from "./FeaturedProducts";
import Services  from "./Services";
import { ProcessSteps } from "./ProcessSteps";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { Showroom } from "./Showroom";
import { CTABanner } from "./CTABanner";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { BookingModal } from "./BookingModal";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
// import ReviewCard from "../../pages/review/ReviewCard";
// import { getReviewsApi } from "../services/reviewApi"; 
// Import data
import {
  CATEGORIES,
  FEATURED_PRODUCTS,
  TESTIMONIALS,
  STATS,
  SERVICES,
  PROCESS_STEPS,
  FAQ_DATA,
  ROOM_SCENES,
  BRANDS,
  HERO_SLIDES,
  SHOWROOM_VIDEOS,
} from "./data";
// import ReviewSection from "../../pages/review/ReviewSection";

export const AiAgentMobile = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("curtains");
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
  const [brandsRef] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


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

  const slide = HERO_SLIDES[heroSlide];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        fontFamily: "'Open Sans', sans-serif",
        background: "#FAF7F2",
        color: "#1A1A1A",
      }}
    >
      {/* Navbar */}
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
        setBookingOpen={setBookingOpen}
      />

      {/* Hero Section */}
      <Hero
        heroRef={heroRef}
        HERO_SLIDES={HERO_SLIDES}
        heroSlide={heroSlide}
        heroInView={heroInView}
        slide={slide}
        scrollTo={scrollTo}
        setHeroSlide={setHeroSlide}
        setBookingOpen={setBookingOpen}
      />

      {/* Brands Marquee */}
      <Brand brandsRef={brandsRef} BRANDS={BRANDS} />

      {/* Stats Banner */}
      <Stats
        statsRef={statsRef}
        statsInView={statsInView}
        STATS_DATA={STATS}
      />

      {/* Room Inspiration */}
      <RoomInspiration
        roomRef={roomRef}
        roomInView={roomInView}
        ROOM_SCENES={ROOM_SCENES}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        scrollTo={scrollTo}
        setBookingOpen={setBookingOpen}
      />

      {/* Categories */}
      <Categories
        CATEGORIES={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Featured Products */}
      <FeaturedProducts
        productsRef={productsRef}
        productsInView={productsInView}
        FEATURED_PRODUCTS={FEATURED_PRODUCTS}
      />

      {/* Services */}
      <Services
        servicesRef={servicesRef}
        servicesInView={servicesInView}
        SERVICES={SERVICES}
      />

      {/* Process Steps */}
      <ProcessSteps
        processRef={processRef}
        processInView={processInView}
        PROCESS_STEPS={PROCESS_STEPS}
      />

      {/* Testimonials */}
      <Testimonials
        TESTIMONIALS={TESTIMONIALS}
        activeTestimonial={activeTestimonial}
        setActiveTestimonial={setActiveTestimonial}
      />
{/* <ReviewSection/> */}
      {/* Showroom Videos */}
      {/* <Showroom SHOWROOM_VIDEOS={SHOWROOM_VIDEOS} /> */}
      <Showroom/>

      {/* FAQ */}
      <FAQ
        faqRef={faqRef}
        faqInView={faqInView}
        FAQ_DATA={FAQ_DATA}
      />

      {/* CTA Banner */}
      <CTABanner
        ctaRef={ctaRef}
        ctaInView={ctaInView}
        scrollTo={scrollTo}
        setBookingOpen={setBookingOpen}
      />

      {/* Contact */}
      <Contact setBookingOpen={setBookingOpen} />

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        bookingOpen={bookingOpen}
        setBookingOpen={setBookingOpen}
      />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
};