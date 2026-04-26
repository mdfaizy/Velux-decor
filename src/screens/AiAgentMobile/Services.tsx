// import React from "react";

// interface Service {
//   icon: string;
//   title: string;
//   desc: string;
// }

// interface ServicesProps {
//   servicesRef: (node?: Element | null | undefined) => void;
//   servicesInView: boolean;
//   SERVICES: Service[];
// }

// export const Services: React.FC<ServicesProps> = ({
//   servicesRef,
//   servicesInView,
//   SERVICES,
// }) => {
//   return (
//     <section
//       id="services"
//       ref={servicesRef}
//       style={{ padding: "110px 0", background: "#F0EAE0" }}
//     >
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid gap-10 lg:grid-cols-2 items-center">
//           <div
//             style={{
//               position: "relative",
//               opacity: servicesInView ? 1 : 0,
//               transform: servicesInView
//                 ? "translateX(0)"
//                 : "translateX(-30px)",
//               transition: "all 0.8s ease",
//             }}
//           >
//             <div
//               style={{
//                 borderRadius: 20,
//                 overflow: "hidden",
//                 boxShadow: "0 30px 80px rgba(61,43,31,0.18)",
//               }}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80"
//                 alt="Our Service"
//                 style={{ width: "100%", height: 500, objectFit: "cover" }}
//               />
//             </div>
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 30,
//                 right: -30,
//                 background: "#fff",
//                 borderRadius: 16,
//                 padding: "20px 28px",
//                 boxShadow: "0 16px 48px rgba(61,43,31,0.15)",
//                 border: "1px solid rgba(201,168,76,0.15)",
//               }}
//             >
//               <div
//                 style={{
//                   fontFamily: "'Playfair Display',serif",
//                   fontSize: 36,
//                   fontWeight: 700,
//                   color: "#C9A84C",
//                 }}
//               >
//                 98%
//               </div>
//               <div
//                 style={{ fontSize: 13, color: "#6B4C3B", fontWeight: 500 }}
//               >
//                 Customer Satisfaction
//               </div>
//               <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
//                 {[1, 2, 3, 4, 5].map((s) => (
//                   <span key={s} style={{ color: "#C9A84C", fontSize: 14 }}>
//                     ★
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div
//               style={{
//                 position: "absolute",
//                 top: 24,
//                 left: -20,
//                 background: "linear-gradient(135deg,#C9A84C,#8B6914)",
//                 borderRadius: 12,
//                 padding: "14px 20px",
//                 boxShadow: "0 8px 25px rgba(201,168,76,0.3)",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 22,
//                   fontWeight: 700,
//                   color: "#fff",
//                   fontFamily: "'Playfair Display',serif",
//                 }}
//               >
//                 25+
//               </div>
//               <div
//                 style={{
//                   fontSize: 11,
//                   color: "rgba(255,255,255,0.85)",
//                   fontWeight: 600,
//                   letterSpacing: "0.05em",
//                 }}
//               >
//                 Years of Excellence
//               </div>
//             </div>
//           </div>
//           <div
//             style={{
//               opacity: servicesInView ? 1 : 0,
//               transform: servicesInView
//                 ? "translateX(0)"
//                 : "translateX(30px)",
//               transition: "all 0.8s ease 0.2s",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 8,
//                 background: "rgba(201,168,76,0.1)",
//                 borderRadius: 30,
//                 padding: "6px 18px",
//                 marginBottom: 24,
//                 border: "1px solid rgba(201,168,76,0.2)",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#C9A84C",
//                   letterSpacing: "0.12em",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Why Choose Us
//               </span>
//             </div>
//             <h2
//               style={{
//                 fontFamily: "'Playfair Display',serif",
//                 fontSize: "clamp(28px,3.5vw,46px)",
//                 fontWeight: 700,
//                 color: "#3D2B1F",
//                 marginBottom: 16,
//                 lineHeight: 1.15,
//               }}
//             >
//               Excellence in Every
//               <br />
//               Detail of Your Home
//             </h2>
//             <p
//               style={{
//                 fontSize: 16,
//                 lineHeight: 1.75,
//                 color: "#6B4C3B",
//                 marginBottom: 40,
//               }}
//             >
//               With over two decades of expertise, we bring together the finest
//               materials, master craftsmen, and cutting-edge design sensibility
//               to transform your home into a personal sanctuary.
//             </p>
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: 24 }}
//             >
//               {SERVICES.map((s) => (
//                 <div
//                   key={s.title}
//                   style={{
//                     display: "flex",
//                     gap: 18,
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 50,
//                       height: 50,
//                       minWidth: 50,
//                       borderRadius: 12,
//                       fontSize: 20,
//                       background: "rgba(201,168,76,0.1)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       border: "1px solid rgba(201,168,76,0.2)",
//                     }}
//                   >
//                     {s.icon}
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: 700,
//                         color: "#3D2B1F",
//                         marginBottom: 4,
//                         fontSize: 15,
//                       }}
//                     >
//                       {s.title}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: 14,
//                         color: "#6B4C3B",
//                         lineHeight: 1.6,
//                       }}
//                     >
//                       {s.desc}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };



import React from "react";

interface Service {
  icon: string;
  title: string;
  desc: string;
}

interface ServicesProps {
  servicesRef?: any; // ✅ optional
  servicesInView?: boolean; // ✅ optional
  SERVICES?: Service[]; // ✅ optional
}

const Services: React.FC<ServicesProps> = ({
  servicesRef,
  servicesInView = true, // ✅ default
  SERVICES = [],
}) => {
  return (
    <section
      id="services"
      ref={servicesRef}
      className="py-[110px] bg-[#F0EAE0]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-10 lg:grid-cols-2 items-center">

          {/* LEFT IMAGE */}
          <div
            className={`
              relative transition-all duration-700
              ${servicesInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
            `}
          >
            <div className="rounded-[20px] overflow-hidden shadow-[0_30px_80px_rgba(61,43,31,0.18)]">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80"
                alt="Our Service"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Satisfaction Card */}
            <div className="absolute bottom-[30px] right-[-30px] bg-white rounded-2xl px-7 py-5 shadow-[0_16px_48px_rgba(61,43,31,0.15)] border border-[#C9A84C26]">
              <div className="font-serif text-[36px] font-bold text-[#C9A84C]">
                98%
              </div>
              <div className="text-[13px] text-[#6B4C3B] font-medium">
                Customer Satisfaction
              </div>
              <div className="flex gap-[3px] mt-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#C9A84C] text-sm">
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute top-6 left-[-20px] bg-gradient-to-br from-[#C9A84C] to-[#8B6914] rounded-xl px-5 py-3 shadow-[0_8px_25px_rgba(201,168,76,0.3)]">
              <div className="text-white text-[22px] font-bold font-serif">
                25+
              </div>
              <div className="text-[11px] text-white/80 font-semibold tracking-wider">
                Years of Excellence
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className={`
              transition-all duration-700 delay-200
              ${servicesInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
            `}
          >
            <div className="inline-flex items-center gap-2 bg-[#C9A84C1A] border border-[#C9A84C33] rounded-full px-4 py-1.5 mb-6">
              <span className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-[0.12em]">
                Why Choose Us
              </span>
            </div>

            <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] font-bold text-[#3D2B1F] mb-4 leading-[1.15]">
              Excellence in Every <br /> Detail of Your Home
            </h2>

            <p className="text-[16px] text-[#6B4C3B] leading-[1.75] mb-10">
              With over two decades of expertise, we bring together the finest
              materials, master craftsmen, and cutting-edge design sensibility
              to transform your home into a personal sanctuary.
            </p>

            {/* SERVICES LIST */}
            <div className="flex flex-col gap-6">
              {SERVICES.map((s) => (
                <div key={s.title} className="flex gap-4 items-start">

                  <div className="w-[50px] h-[50px] min-w-[50px] rounded-xl bg-[#C9A84C1A] border border-[#C9A84C33] flex items-center justify-center text-xl">
                    {s.icon}
                  </div>

                  <div>
                    <div className="text-[15px] font-bold text-[#3D2B1F] mb-1">
                      {s.title}
                    </div>

                    <div className="text-[14px] text-[#6B4C3B] leading-[1.6]">
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
  );
};

export default Services;