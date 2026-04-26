// import React from "react";

// interface BookingModalProps {
//   bookingOpen: boolean;
//   setBookingOpen: (open: boolean) => void;
// }

// export const BookingModal: React.FC<BookingModalProps> = ({
//   bookingOpen,
//   setBookingOpen,
// }) => {
//   if (!bookingOpen) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 1000,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px",
//         background: "rgba(61,43,31,0.65)",
//         backdropFilter: "blur(8px)",
//       }}
//     >
//       <div
//         style={{
//           background: "#FAF7F2",
//           borderRadius: 24,
//           padding: "48px",
//           maxWidth: 540,
//           width: "100%",
//           boxShadow: "0 40px 100px rgba(61,43,31,0.3)",
//           position: "relative",
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//       >
//         <button
//           onClick={() => setBookingOpen(false)}
//           style={{
//             position: "absolute",
//             top: 20,
//             right: 20,
//             width: 36,
//             height: 36,
//             borderRadius: "50%",
//             background: "rgba(61,43,31,0.08)",
//             border: "none",
//             cursor: "pointer",
//             fontSize: 18,
//             color: "#3D2B1F",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           ×
//         </button>
//         <div
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 8,
//             background: "rgba(201,168,76,0.1)",
//             borderRadius: 30,
//             padding: "5px 14px",
//             marginBottom: 20,
//             border: "1px solid rgba(201,168,76,0.2)",
//           }}
//         >
//           <span
//             style={{
//               fontSize: 11,
//               fontWeight: 700,
//               color: "#C9A84C",
//               letterSpacing: "0.1em",
//               textTransform: "uppercase",
//             }}
//           >
//             Free Service
//           </span>
//         </div>
//         <h3
//           style={{
//             fontFamily: "'Playfair Display',serif",
//             fontSize: 28,
//             fontWeight: 700,
//             color: "#3D2B1F",
//             marginBottom: 8,
//           }}
//         >
//           Book Your Free Consultation
//         </h3>
//         <p
//           style={{
//             fontSize: 14,
//             color: "#8A8278",
//             marginBottom: 32,
//             lineHeight: 1.6,
//           }}
//         >
//           Our expert designer will visit your home at your convenience —
//           completely free, no obligation.
//         </p>
//         <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//           {[
//             { lbl: "Full Name", ph: "Your full name", type: "text" },
//             { lbl: "Mobile Number", ph: "+91 98765 43210", type: "tel" },
//             { lbl: "Email Address", ph: "your@email.com", type: "email" },
//             {
//               lbl: "City",
//               ph: "Mumbai, Delhi, Bangalore...",
//               type: "text",
//             },
//           ].map((f) => (
//             <div key={f.lbl}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#3D2B1F",
//                   letterSpacing: "0.08em",
//                   textTransform: "uppercase",
//                   marginBottom: 8,
//                 }}
//               >
//                 {f.lbl}
//               </label>
//               <input
//                 type={f.type}
//                 placeholder={f.ph}
//                 style={{
//                   width: "100%",
//                   padding: "12px 16px",
//                   borderRadius: 8,
//                   border: "1px solid #E0D8CC",
//                   fontSize: 14,
//                   color: "#3D2B1F",
//                   background: "#fff",
//                   outline: "none",
//                   boxSizing: "border-box",
//                   transition: "border-color 0.2s",
//                 }}
//                 onFocus={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
//                 onBlur={(e) => (e.currentTarget.style.borderColor = "#E0D8CC")}
//               />
//             </div>
//           ))}
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 fontSize: 11,
//                 fontWeight: 700,
//                 color: "#3D2B1F",
//                 letterSpacing: "0.08em",
//                 textTransform: "uppercase",
//                 marginBottom: 8,
//               }}
//             >
//               Preferred Date
//             </label>
//             <input
//               type="date"
//               style={{
//                 width: "100%",
//                 padding: "12px 16px",
//                 borderRadius: 8,
//                 border: "1px solid #E0D8CC",
//                 fontSize: 14,
//                 color: "#3D2B1F",
//                 background: "#fff",
//                 outline: "none",
//                 boxSizing: "border-box",
//                 transition: "border-color 0.2s",
//               }}
//               onFocus={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
//               onBlur={(e) => (e.currentTarget.style.borderColor = "#E0D8CC")}
//             />
//           </div>
//           <button
//             style={{
//               marginTop: 8,
//               background: "linear-gradient(135deg,#C9A84C,#8B6914)",
//               border: "none",
//               borderRadius: 10,
//               padding: "16px",
//               fontSize: 14,
//               fontWeight: 700,
//               color: "#fff",
//               cursor: "pointer",
//               letterSpacing: "0.07em",
//               textTransform: "uppercase",
//               boxShadow: "0 6px 20px rgba(201,168,76,0.3)",
//               transition: "all 0.3s",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.transform = "translateY(-1px)")
//             }
//             onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
//           >
//             Confirm Free Consultation →
//           </button>
//           <p
//             style={{ fontSize: 12, color: "#8A8278", textAlign: "center" }}
//           >
//             ✓ No charges &nbsp; ✓ No obligation &nbsp; ✓ Cancel anytime
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };





import React, { useState } from "react";
import { createConsultationApi } from "../../services/consultationApi";

interface BookingModalProps {
  bookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
}

interface FormData {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  city: string;
  preferredDate: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  bookingOpen,
  setBookingOpen,
}) => {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    city: "",
    preferredDate: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  if (!bookingOpen) return null;

  // 🔥 HANDLE CHANGE
  const handleChange = (key: keyof FormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 🔥 FORM SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!form.fullName || !form.mobileNumber) {
        alert("Please fill required fields (Full Name & Mobile Number)");
        return;
      }

      setLoading(true);

      await createConsultationApi(form);

      alert("Consultation Booked ✅");

      setBookingOpen(false);

      // Reset form
      setForm({
        fullName: "",
        mobileNumber: "",
        emailAddress: "",
        city: "",
        preferredDate: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // Input focus styles (inline handlers)
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#C9A84C";
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#E0D8CC";
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "none";
  };

  return (
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
      onClick={() => setBookingOpen(false)}
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
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
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
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(61,43,31,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(61,43,31,0.08)")}
        >
          ×
        </button>

        {/* Free Service Badge */}
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

        {/* Heading */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#3D2B1F",
            marginBottom: 8,
          }}
        >
          Book Your Free Consultation
        </h3>

        {/* Subheading */}
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

        {/* FORM START */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Full Name */}
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
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Mobile Number */}
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
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={form.mobileNumber}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Email Address */}
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
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.emailAddress}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* City */}
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
              City
            </label>
            <input
              type="text"
              placeholder="Mumbai, Delhi, Bangalore..."
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Preferred Date */}
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
              value={form.preferredDate}
              onChange={(e) => handleChange("preferredDate", e.target.value)}
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8,
              background: loading
                ? "#B8943E"
                : "linear-gradient(135deg, #C9A84C, #8B6914)",
              border: "none",
              borderRadius: 10,
              padding: "16px",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              boxShadow: loading ? "none" : "0 6px 20px rgba(201,168,76,0.3)",
              transition: "all 0.3s",
              opacity: loading ? 0.8 : 1,
            }}
            onMouseEnter={!loading ? handleButtonHover : undefined}
            onMouseLeave={!loading ? handleButtonLeave : undefined}
          >
            {loading ? "Booking..." : "Confirm Free Consultation →"}
          </button>

          {/* Footer Note */}
          <p
            style={{
              fontSize: 12,
              color: "#8A8278",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            ✓ No charges &nbsp; ✓ No obligation &nbsp; ✓ Cancel anytime
          </p>
        </form>
        {/* FORM END */}
      </div>
    </div>
  );
};