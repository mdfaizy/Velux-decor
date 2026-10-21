import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createReviewApi } from "../../services/reviewApi";

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
}

const emptyForm = {
  reviewerName: "",
  location: "",
  project: "",
  title: "",
  rating: 0,
  website: "", // honeypot, hidden from people
};

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

const labelCls =
  "block text-[11px] font-bold text-[#3D2B1F] tracking-[0.08em] uppercase mb-2";
const inputCls =
  "w-full px-4 py-3 rounded-lg border border-[#E0D8CC] text-[14px] text-[#3D2B1F] bg-[#FDFAF6] outline-none transition focus:border-[#C9A84C]";

/* Customer review form, opened from the "Customer Stories" section */
export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState(emptyForm);
  const [hoverRating, setHoverRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const set = (key: keyof typeof emptyForm, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Photo must be under 5 MB");
      return;
    }
    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    if (submitted) {
      setForm(emptyForm);
      setImage(null);
      setPreview("");
      setSubmitted(false);
    }
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.rating) return setError("Please choose a star rating");
    if (!form.reviewerName.trim() || !form.location.trim() || !form.project.trim() || !form.title.trim()) {
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
      if (image) data.append("image", image);

      await createReviewApi(data);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  const shownRating = hoverRating || form.rating;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(26,18,12,0.6)", backdropFilter: "blur(4px)" }}
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-review-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 p-1 text-[#8A8278] hover:text-[#3D2B1F]"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="text-5xl mb-4">🙏</div>
            <h3
              className="text-2xl font-bold text-[#3D2B1F] mb-3"
              style={{ fontFamily: "'Playfair Display',serif" }}
            >
              Thank you for your review!
            </h3>
            <p className="text-[#6B4C3B] mb-6">
              It will appear on our website once our team has checked it.
            </p>
            <button
              onClick={handleClose}
              className="bg-gradient-to-br from-[#C9A84C] to-[#8B6914] rounded-[10px] px-8 py-3 text-[13px] font-bold text-white uppercase tracking-[0.07em]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <h3
                id="write-review-title"
                className="text-2xl font-bold text-[#3D2B1F]"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                Share your experience
              </h3>
              <p className="text-sm text-[#8A8278] mt-1">
                Tell other homeowners how Velux Decor transformed your space.
              </p>
            </div>

            {/* STARS */}
            <div>
              <span className={labelCls}>Your rating</span>
              <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => set("rating", star)}
                    onMouseEnter={() => setHoverRating(star)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    className="text-3xl leading-none transition-transform hover:scale-110"
                    style={{ color: star <= shownRating ? "#C9A84C" : "#E0D8CC" }}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-3 text-sm text-[#8A8278]">{RATING_LABELS[shownRating]}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="rv-name">Your name</label>
                <input
                  id="rv-name"
                  value={form.reviewerName}
                  onChange={(e) => set("reviewerName", e.target.value)}
                  maxLength={60}
                  placeholder="Rahul Sharma"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="rv-location">City</label>
                <input
                  id="rv-location"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  maxLength={80}
                  placeholder="Delhi"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="rv-project">What did we do for you?</label>
              <input
                id="rv-project"
                value={form.project}
                onChange={(e) => set("project", e.target.value)}
                maxLength={100}
                placeholder="e.g. Living room curtains & blinds"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="rv-text">Your review</label>
              <textarea
                id="rv-text"
                rows={4}
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                maxLength={1000}
                placeholder="How was the quality, service and installation?"
                className={`${inputCls} resize-y font-sans`}
              />
              <p className="text-right text-[11px] text-[#8A8278] mt-1">{form.title.length}/1000</p>
            </div>

            {/* PHOTO */}
            <div>
              <span className={labelCls}>Your photo (optional)</span>
              {preview ? (
                <div className="flex items-center gap-4">
                  <img src={preview} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A84C]/40" />
                  <button
                    type="button"
                    onClick={() => { setImage(null); setPreview(""); }}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-[#C9A84C] text-sm text-[#8B6914] cursor-pointer hover:bg-[#FDFAF6]">
                  Upload photo
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
              )}
            </div>

            {/* honeypot — hidden from people, bots fill it in */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-br from-[#C9A84C] to-[#8B6914] rounded-[10px] py-4 text-[14px] font-bold text-white uppercase tracking-[0.07em] shadow-[0_6px_20px_rgba(201,168,76,0.3)] transition ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-[2px]"
              }`}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
