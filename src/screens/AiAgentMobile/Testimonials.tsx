// import React from "react";

// interface Testimonial {
//   id: number;
//   name: string;
//   location: string;
//   rating: number;
//   text: string;
//   avatar: string;
//   project: string;
// }

// interface TestimonialsProps {
//   TESTIMONIALS: Testimonial[];
//   activeTestimonial: number;
//   setActiveTestimonial: (index: number) => void;
// }

// export const Testimonials: React.FC<TestimonialsProps> = ({
//   TESTIMONIALS,
//   activeTestimonial,
//   setActiveTestimonial,
// }) => {
//   return (
//     <section
//       style={{
//         padding: "110px 0",
//         background: "#FAF7F2",
//         overflow: "hidden",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-6">
//         <div style={{ textAlign: "center", marginBottom: 64 }}>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               background: "rgba(201,168,76,0.1)",
//               borderRadius: 30,
//               padding: "6px 18px",
//               marginBottom: 20,
//               border: "1px solid rgba(201,168,76,0.2)",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 11,
//                 fontWeight: 700,
//                 color: "#C9A84C",
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Customer Stories
//             </span>
//           </div>
//           <h2
//             style={{
//               fontFamily: "'Playfair Display',serif",
//               fontSize: "clamp(28px,4vw,48px)",
//               fontWeight: 700,
//               color: "#3D2B1F",
//               marginBottom: 16,
//             }}
//           >
//             Loved by Homeowners Across India
//           </h2>
//         </div>
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: 24,
//             padding: "48px",
//             boxShadow: "0 8px 40px rgba(61,43,31,0.07)",
//             border: "1px solid rgba(201,168,76,0.1)",
//             marginBottom: 28,
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               top: 20,
//               left: 48,
//               fontSize: 96,
//               color: "rgba(201,168,76,0.1)",
//               fontFamily: "'Playfair Display',serif",
//               fontWeight: 900,
//               lineHeight: 1,
//             }}
//           >
//             "
//           </div>
//           <div className="grid gap-10 md:grid-cols-[1fr_auto] items-center">
//             <div>
//               <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
//                 {[1, 2, 3, 4, 5].map((s) => (
//                   <span key={s} style={{ color: "#C9A84C", fontSize: 22 }}>
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <p
//                 style={{
//                   fontFamily: "'Playfair Display',serif",
//                   fontSize: "clamp(18px,2.5vw,24px)",
//                   fontStyle: "italic",
//                   color: "#3D2B1F",
//                   lineHeight: 1.6,
//                   marginBottom: 28,
//                 }}
//               >
//                 "{TESTIMONIALS[activeTestimonial].text}"
//               </p>
//               <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                 <img
//                   src={TESTIMONIALS[activeTestimonial].avatar}
//                   alt={TESTIMONIALS[activeTestimonial].name}
//                   style={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                     border: "3px solid rgba(201,168,76,0.3)",
//                   }}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontWeight: 700,
//                       color: "#3D2B1F",
//                       fontSize: 16,
//                     }}
//                   >
//                     {TESTIMONIALS[activeTestimonial].name}
//                   </div>
//                   <div style={{ fontSize: 13, color: "#8A8278" }}>
//                     {TESTIMONIALS[activeTestimonial].location} ·{" "}
//                     {TESTIMONIALS[activeTestimonial].project}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 8,
//                 alignItems: "center",
//               }}
//             >
//               {TESTIMONIALS.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setActiveTestimonial(i)}
//                   style={{
//                     width: i === activeTestimonial ? 8 : 6,
//                     height: i === activeTestimonial ? 8 : 6,
//                     borderRadius: "50%",
//                     border: "none",
//                     cursor: "pointer",
//                     background:
//                       i === activeTestimonial
//                         ? "#C9A84C"
//                         : "rgba(201,168,76,0.3)",
//                     transition: "all 0.3s",
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
//             gap: 16,
//           }}
//         >
//           {TESTIMONIALS.slice(0, 3).map((t) => (
//             <div
//               key={t.id}
//               style={{
//                 background: "#fff",
//                 borderRadius: 16,
//                 padding: "24px",
//                 boxShadow: "0 4px 16px rgba(61,43,31,0.05)",
//                 border: "1px solid rgba(201,168,76,0.08)",
//               }}
//             >
//               <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
//                 {[1, 2, 3, 4, 5].map((s) => (
//                   <span key={s} style={{ color: "#C9A84C", fontSize: 12 }}>
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <p
//                 style={{
//                   fontSize: 13,
//                   color: "#6B4C3B",
//                   lineHeight: 1.6,
//                   marginBottom: 14,
//                 }}
//               >
//                 "{t.text.substring(0, 100)}..."
//               </p>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <img
//                   src={t.avatar}
//                   alt={t.name}
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 700,
//                       color: "#3D2B1F",
//                     }}
//                   >
//                     {t.name}
//                   </div>
//                   <div style={{ fontSize: 11, color: "#8A8278" }}>
//                     {t.location}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


import React, { useEffect, useState } from "react";
import { getReviewsApi } from "../../services/reviewApi";

interface Testimonial {
  _id: string;
  reviewerName: string;
  location: string;
  rating: number;
  title: string;
  image: string;
}

export const Testimonials = () => {
  const [TESTIMONIALS, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // 🔥 API CALL
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviewsApi();

        // 🔥 adjust if your backend is res.data.data
        setTestimonials(res.data || []);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchReviews();
  }, []);

  // 🔥 Safety
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      style={{
        padding: "110px 0",
        background: "#FAF7F2",
        overflow: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER SAME */}
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

        {/* MAIN CARD SAME */}
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
            }}
          >
            "
          </div>

          <div className="grid gap-10 md:grid-cols-[1fr_auto] items-center">
            <div>

              {/* ⭐ Rating */}
              <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                  <span key={i} style={{ color: "#C9A84C", fontSize: 22 }}>
                    ★
                  </span>
                ))}
              </div>

              {/* TEXT */}
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
                "{TESTIMONIALS[activeTestimonial].title}"
              </p>

              {/* USER */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img
                  src={
                    TESTIMONIALS[activeTestimonial].image ||
                    "https://via.placeholder.com/60"
                  }
                  alt={TESTIMONIALS[activeTestimonial].reviewerName}
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
                    {TESTIMONIALS[activeTestimonial].reviewerName}
                  </div>

                  <div style={{ fontSize: 13, color: "#8A8278" }}>
                    {TESTIMONIALS[activeTestimonial].location}
                  </div>
                </div>
              </div>
            </div>

            {/* DOTS */}
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
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SMALL CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 16,
          }}
        >
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <div
              key={t._id}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "24px",
                boxShadow: "0 4px 16px rgba(61,43,31,0.05)",
                border: "1px solid rgba(201,168,76,0.08)",
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} style={{ color: "#C9A84C", fontSize: 12 }}>
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
                "{t.title.substring(0, 100)}..."
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={t.image || "https://via.placeholder.com/40"}
                  alt={t.reviewerName}
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
                    {t.reviewerName}
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
  );
};