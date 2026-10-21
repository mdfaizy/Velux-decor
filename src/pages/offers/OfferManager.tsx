import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import {
  Offer,
  getOffersApi,
  createOfferApi,
  updateOfferApi,
  toggleOfferApi,
  deleteOfferApi,
} from "../../services/offerApi";
import { getCategoriesApi } from "../../services/categoryApi";
import { OfferMarquee } from "../../screens/AiAgentMobile/OfferBanner";
import { OfferSpotlightCard } from "../../screens/AiAgentMobile/OfferSpotlight";

const emptyForm = {
  text: "",
  title: "",
  linkLabel: "",
  link: "",
  order: 0,
  isActive: true,
  startDate: "",
  endDate: "",
  showInBar: true,
  showOnHome: false,
  showOnProduct: false,
  category: "",
};

const PLACEMENTS = [
  { name: "showInBar", label: "Top moving bar", hint: "Scrolls above the navbar on every page" },
  { name: "showOnHome", label: "Home page card", hint: "Large card with image & countdown" },
  { name: "showOnProduct", label: "Product pages", hint: "Callout under the product price" },
] as const;

// ISO date → value for <input type="datetime-local"> in local time
const toLocalInput = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : "—";

const getStatus = (offer: Offer) => {
  const now = Date.now();
  if (!offer.isActive) return { label: "Off", cls: "bg-gray-100 text-gray-600" };
  if (offer.startDate && new Date(offer.startDate).getTime() > now)
    return { label: "Scheduled", cls: "bg-yellow-100 text-yellow-700" };
  if (offer.endDate && new Date(offer.endDate).getTime() < now)
    return { label: "Expired", cls: "bg-red-100 text-red-600" };
  return { label: "Live", cls: "bg-green-100 text-green-700" };
};

const categoryName = (offer: Offer) =>
  offer.category && typeof offer.category === "object" ? offer.category.name : "All categories";

const OfferManager = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await getOffersApi();
      setOffers(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load offers ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
    getCategoriesApi()
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false);
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview("");
    if (editingId) setRemoveImage(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImage(null);
    setImagePreview("");
    setRemoveImage(false);
  };

  const handleEdit = (offer: Offer) => {
    setEditingId(offer._id);
    setForm({
      text: offer.text,
      title: offer.title || "",
      linkLabel: offer.linkLabel || "",
      link: offer.link || "",
      order: offer.order ?? 0,
      isActive: offer.isActive,
      startDate: toLocalInput(offer.startDate),
      endDate: toLocalInput(offer.endDate),
      showInBar: offer.showInBar ?? true,
      showOnHome: offer.showOnHome ?? false,
      showOnProduct: offer.showOnProduct ?? false,
      category:
        offer.category && typeof offer.category === "object"
          ? offer.category._id
          : offer.category || "",
    });
    setImage(null);
    setImagePreview(offer.image || "");
    setRemoveImage(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.text.trim()) {
      toast.warning("Offer text is required ⚠️");
      return;
    }
    if (!form.showInBar && !form.showOnHome && !form.showOnProduct) {
      toast.warning("Choose at least one place to show the offer ⚠️");
      return;
    }
    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      toast.warning("End date must be after start date ⚠️");
      return;
    }

    const data = new FormData();
    data.append("text", form.text.trim());
    data.append("title", form.title.trim());
    data.append("linkLabel", form.linkLabel.trim());
    data.append("link", form.link.trim());
    data.append("order", String(form.order));
    data.append("isActive", String(form.isActive));
    data.append("startDate", form.startDate ? new Date(form.startDate).toISOString() : "");
    data.append("endDate", form.endDate ? new Date(form.endDate).toISOString() : "");
    data.append("showInBar", String(form.showInBar));
    data.append("showOnHome", String(form.showOnHome));
    data.append("showOnProduct", String(form.showOnProduct));
    data.append("category", form.showOnProduct ? form.category : "");
    if (image) data.append("image", image);
    if (removeImage) data.append("removeImage", "true");

    try {
      setSaving(true);
      if (editingId) {
        await updateOfferApi(editingId, data);
        toast.success("Offer updated ✅");
      } else {
        await createOfferApi(data);
        toast.success("Offer created ✅");
      }
      resetForm();
      fetchOffers();
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to save offer ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleOfferApi(id);
      fetchOffers();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status ❌");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOfferApi(id);
      toast.success("Offer deleted ✅");
      if (editingId === id) resetForm();
      setConfirmDeleteId(null);
      fetchOffers();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete offer ❌");
    }
  };

  const liveBarOffers = offers.filter((o) => getStatus(o).label === "Live" && o.showInBar);
  const draft = {
    text: form.text || "Your offer text appears here",
    title: form.title,
    link: form.link,
    linkLabel: form.linkLabel,
    image: imagePreview,
    endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
  };
  const inputCls =
    "w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ===== FORM ===== */}
      <div className="bg-white p-8 rounded-2xl shadow border">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingId ? "Edit Offer" : "Create Offer"}
          </h2>
          <p className="text-gray-500 text-sm">
            Choose where the offer appears: the moving top bar, the home page card, and/or product pages
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Offer Text <span className="text-red-500">*</span>
              </label>
              <input
                name="text"
                value={form.text}
                onChange={handleChange}
                maxLength={200}
                placeholder="e.g. Flat 20% off on all curtains this Diwali"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Headline <span className="text-gray-400 font-normal">(home card & product pages)</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={60}
                placeholder="e.g. Diwali Sale"
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Button Label</label>
                <input
                  name="linkLabel"
                  value={form.linkLabel}
                  onChange={handleChange}
                  maxLength={30}
                  placeholder="Shop now"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Button Link</label>
                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="/categories"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Start Date <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                End Date <span className="text-gray-400 font-normal">(optional — shows a countdown)</span>
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            {/* PLACEMENTS */}
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Show this offer on</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {PLACEMENTS.map((p) => (
                  <label
                    key={p.name}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      form[p.name] ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={p.name}
                      checked={form[p.name]}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5"
                    />
                    <span>
                      <span className="block text-sm font-medium text-gray-800">{p.label}</span>
                      <span className="block text-xs text-gray-500">{p.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {form.showOnProduct && (
              <div>
                <label className="text-sm font-medium text-gray-700">Product category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}

            {form.showOnHome && (
              <div className={form.showOnProduct ? "" : "md:col-span-2"}>
                <label className="text-sm font-medium text-gray-700">
                  Card Image <span className="text-gray-400 font-normal">(optional, home card)</span>
                </label>
                <div className="mt-1 border-2 border-dashed p-4 rounded-xl text-center">
                  {!imagePreview ? (
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  ) : (
                    <div className="relative">
                      <img src={imagePreview} className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Display Order <span className="text-gray-400 font-normal">(lower shows first)</span>
              </label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <label className="flex items-center gap-3 mt-6 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">Offer is on</span>
            </label>
          </div>

          {/* PREVIEWS */}
          {(form.showInBar || form.showOnHome) && (
            <div className="mt-8 space-y-4">
              <p className="text-sm font-medium text-gray-700">Preview</p>
              {form.showInBar && (
                <div className="rounded-lg overflow-hidden">
                  <OfferMarquee
                    offers={editingId ? [draft] : [...liveBarOffers, draft]}
                  />
                </div>
              )}
              {form.showOnHome && <OfferSpotlightCard offer={draft} />}
            </div>
          )}

          <div className="mt-8 flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Offer" : "Create Offer"}
            </Button>
          </div>
        </form>
      </div>

      {/* ===== LIST ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold text-gray-800">All Offers</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3">Offer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Shown on</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Loading...</td></tr>
              ) : offers.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">No offers yet</td></tr>
              ) : (
                offers.map((offer) => {
                  const status = getStatus(offer);
                  return (
                    <tr key={offer._id} className="border-t align-top">
                      <td className="px-4 py-3 max-w-xs">
                        <div className="flex gap-3">
                          {offer.image && (
                            <img src={offer.image} className="w-12 h-12 rounded object-cover shrink-0" />
                          )}
                          <div>
                            {offer.title && <p className="font-semibold text-gray-800">{offer.title}</p>}
                            <p className="text-gray-700">{offer.text}</p>
                            {offer.link && (
                              <p className="text-xs text-gray-500 mt-1">
                                {offer.linkLabel || "Shop now"} → {offer.link}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.cls}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                        {(offer.showInBar ?? true) && <div>Top bar</div>}
                        {offer.showOnHome && <div>Home card</div>}
                        {offer.showOnProduct && <div>Products: {categoryName(offer)}</div>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                        <div>From: {formatDate(offer.startDate)}</div>
                        <div>To: {formatDate(offer.endDate)}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end items-center gap-2">
                          {confirmDeleteId === offer._id ? (
                            <>
                              <span className="text-xs text-gray-600">Delete?</span>
                              <button
                                onClick={() => handleDelete(offer._id)}
                                className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-3 py-1 text-xs rounded border hover:bg-gray-50"
                              >
                                No
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleToggle(offer._id)}
                                className={`px-3 py-1 text-xs rounded border whitespace-nowrap ${
                                  offer.isActive
                                    ? "hover:bg-gray-50"
                                    : "bg-green-500 text-white border-green-500 hover:bg-green-600"
                                }`}
                              >
                                {offer.isActive ? "Turn off" : "Turn on"}
                              </button>
                              <button
                                onClick={() => handleEdit(offer)}
                                className="p-2 rounded hover:bg-blue-50 text-blue-600"
                                aria-label="Edit offer"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(offer._id)}
                                className="p-2 rounded hover:bg-red-50 text-red-600"
                                aria-label="Delete offer"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OfferManager;
