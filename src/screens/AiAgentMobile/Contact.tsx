import React, { useState } from "react";
import { createContactApi } from "../../services/contactApi";

interface ContactProps {
  setBookingOpen: (open: boolean) => void;
}

export const Contact: React.FC<ContactProps> = ({ setBookingOpen }) => {


  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (key: string, value: string) => {
  setForm((prev) => ({ ...prev, [key]: value }));
};

  // const [form, setForm] = useState({

  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   service: "",
  //   message: "",
  // });

  // const [loading, setLoading] = useState(false);

  // // 🔹 handle change
  // const handleChange = (key: string, value: string) => {
  //   setForm((prev) => ({ ...prev, [key]: value }));
  // };

  // 🔹 submit
// const handleSubmit = async () => {
//   try {
//     if (!form.firstName || !form.email || !form.message) {
//       alert("Please fill required fields ❌");
//       return;
//     }

//     setLoading(true);

//     const res = await createContactApi(form); // ✅ FIXED

//     if (res.success) { // ✅ FIXED
//       alert("Message sent successfully ✅");

//       setForm({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         service: "",
//         message: "",
//       });
//     }

//   } catch (error) {
//     console.log(error);
//     alert("Something went wrong ❌");
//   } finally {
//     setLoading(false);
//   }
// };


const handleSubmit = async () => {
  setError("");

  if (!form.firstName || !form.email || !form.message) {
    setError("Please fill required fields ❌");
    return;
  }

  try {
    setLoading(true);

    const res = await createContactApi(form);

    if (res.success) {
      // ✅ Success UI
      alert("Message sent successfully ✅");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }

  } catch (error: any) {
    console.error(error);

    setError(
      error?.response?.data?.message || "Something went wrong ❌"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <section
      id="contact"
      style={{ padding: "110px 0", background: "#FAF7F2" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
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

          {/* <div
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
              <div className="grid gap-4 sm:grid-cols-2">
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
                        (e.currentTarget.style.borderColor = "#C9A84C")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "#E0D8CC")
                      }
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
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#C9A84C")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "#E0D8CC")
                    }
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
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#C9A84C")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#E0D8CC")
                  }
                >
                  <option value="">Select a service...</option>
                  <option value="curtains">Curtains</option>
                  <option value="wallpaper">Wallpaper</option>
                  <option value="blinds">Blinds</option>
                  <option value="automation">Home Automation</option>
                  <option value="tracks">Curtain Tracks</option>
                  <option value="flooring">Wooden Flooring</option>
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
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#C9A84C")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#E0D8CC")
                  }
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
          </div> */}

<div className="bg-white rounded-[24px] p-12 shadow-[0_8px_48px_rgba(61,43,31,0.08)] border border-[rgba(201,168,76,0.1)]">
{error && (
  <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
    {error}
  </div>
)}
      {/* Heading */}
      <h3 className="font-serif text-[26px] font-bold text-[#3D2B1F] mb-2">
        Send Us a Message
      </h3>

      <p className="text-[14px] text-[#8A8278] mb-8">
        We'll get back to you within 24 hours.
      </p>

      <div className="flex flex-col gap-5">

        {/* First + Last Name */}
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { lbl: "First Name", key: "firstName", ph: "Rahul" },
            { lbl: "Last Name", key: "lastName", ph: "Sharma" },
          ].map((f) => (
            <div key={f.lbl}>
              <label className="block text-[11px] font-bold text-[#3D2B1F] tracking-[0.08em] uppercase mb-2">
                {f.lbl}
              </label>

              <input
                value={form[f.key as keyof typeof form]}
                onChange={(e) =>
                  handleChange(f.key, e.target.value)
                }
                placeholder={f.ph}
                className="w-full px-4 py-3 rounded-lg border border-[#E0D8CC] text-[14px] text-[#3D2B1F] bg-[#FDFAF6] outline-none transition focus:border-[#C9A84C]"
              />
            </div>
          ))}
        </div>

        {/* Email + Phone */}
        {[
          {
            lbl: "Email Address",
            key: "email",
            ph: "rahul@example.com",
            type: "email",
          },
          {
            lbl: "Phone Number",
            key: "phone",
            ph: "+91 98765 43210",
            type: "tel",
          },
        ].map((f) => (
          <div key={f.lbl}>
            <label className="block text-[11px] font-bold text-[#3D2B1F] tracking-[0.08em] uppercase mb-2">
              {f.lbl}
            </label>

            <input
              type={f.type}
              value={form[f.key as keyof typeof form]}
              onChange={(e) =>
                handleChange(f.key, e.target.value)
              }
              placeholder={f.ph}
              className="w-full px-4 py-3 rounded-lg border border-[#E0D8CC] text-[14px] text-[#3D2B1F] bg-[#FDFAF6] outline-none transition focus:border-[#C9A84C]"
            />
          </div>
        ))}

        {/* Service */}
        <div>
          <label className="block text-[11px] font-bold text-[#3D2B1F] tracking-[0.08em] uppercase mb-2">
            Service Interested In
          </label>

          <select
            value={form.service}
            onChange={(e) =>
              handleChange("service", e.target.value)
            }
            className="w-full px-4 py-3 rounded-lg border border-[#E0D8CC] text-[14px] text-[#3D2B1F] bg-[#FDFAF6] outline-none cursor-pointer focus:border-[#C9A84C]"
          >
            <option value="">Select a service...</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Office Setup">Office Setup</option>
            <option value="Renovation">Renovation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] font-bold text-[#3D2B1F] tracking-[0.08em] uppercase mb-2">
            Message
          </label>

          <textarea
            rows={4}
            value={form.message}
            onChange={(e) =>
              handleChange("message", e.target.value)
            }
            placeholder="Tell us about your project, style preferences, and any specific requirements..."
            className="w-full px-4 py-3 rounded-lg border border-[#E0D8CC] text-[14px] text-[#3D2B1F] bg-[#FDFAF6] outline-none resize-y font-sans transition focus:border-[#C9A84C]"
          />
        </div>

        {/* Button */}
       <button
  onClick={handleSubmit}
  disabled={loading}
  className={`bg-gradient-to-br from-[#C9A84C] to-[#8B6914] rounded-[10px] py-4 text-[14px] font-bold text-white uppercase tracking-[0.07em] shadow-[0_6px_20px_rgba(201,168,76,0.3)] transition ${
    loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-[2px]"
  }`}
>
  {loading ? "Sending..." : "Send Message →"}
</button>

      </div>
    </div>
        </div>
      </div>
    </section>
  );
};