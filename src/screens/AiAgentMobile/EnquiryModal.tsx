import { useState } from "react";
import { toast } from "react-toastify";
import { createEnquiryApi } from "../../services/enquiryApi";

const EnquiryModal = ({ open, setOpen, product }: any) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      return toast.error("All fields required ❌");
    }

    try {
      setLoading(true);

      await createEnquiryApi({
        productId: product.id,
        ...form,
      });

      toast.success("Enquiry Sent ✅");
      setOpen(false);

      setForm({ name: "", phone: "", message: "" });

    } catch (err) {
      toast.error("Error sending enquiry ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white w-[92%] max-w-md rounded-2xl p-6 shadow-2xl animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#3D2B1F]">
            Enquiry Form
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* PRODUCT */}
        <div className="bg-gray-100 p-3 rounded-lg text-sm mb-4">
          <p className="font-semibold">{product?.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <textarea
            placeholder="Message (optional)"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Sending..." : "Submit Enquiry"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;