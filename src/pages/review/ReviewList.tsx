import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Check, Trash2, X } from "lucide-react";
import {
  getAllReviewsAdminApi,
  updateReviewStatusApi,
  deleteReviewApi,
} from "../../services/reviewApi";

type ReviewStatus = "pending" | "approved" | "rejected";

interface Review {
  _id: string;
  reviewerName: string;
  title: string;
  location: string;
  project: string;
  rating: number;
  image?: string;
  status?: ReviewStatus; // missing on older reviews = approved
  createdAt: string;
}

const STATUS_STYLE: Record<ReviewStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

const FILTERS: { key: "" | ReviewStatus; label: string }[] = [
  { key: "", label: "All" },
  { key: "pending", label: "Waiting for approval" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const ReviewList = () => {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"" | ReviewStatus>("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getAllReviewsAdminApi();
      setData(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load reviews ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const statusOf = (r: Review): ReviewStatus => r.status || "approved";

  const setStatus = async (id: string, status: ReviewStatus) => {
    try {
      await updateReviewStatusApi(id, status);
      toast.success(status === "approved" ? "Review is now on the website ✅" : "Review hidden");
      fetchReviews();
    } catch {
      toast.error("Failed to update review ❌");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReviewApi(id);
      toast.success("Review deleted ✅");
      setConfirmDeleteId(null);
      fetchReviews();
    } catch {
      toast.error("Failed to delete review ❌");
    }
  };

  const pendingCount = data.filter((r) => statusOf(r) === "pending").length;
  const shown = filter ? data.filter((r) => statusOf(r) === filter) : data;

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <p className="text-gray-500 text-sm">
          Customers write reviews on the website. Approve them to show them in "Customer Stories".
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg border text-sm ${
              filter === f.key ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white hover:bg-gray-50"
            }`}
          >
            {f.label}
            {f.key === "pending" && pendingCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-400 text-white text-xs font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow border divide-y">
        {loading && !data.length ? (
          <p className="p-6 text-center text-gray-500">Loading...</p>
        ) : shown.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No reviews here</p>
        ) : (
          shown.map((r) => {
            const status = statusOf(r);
            return (
              <div key={r._id} className="p-5 flex flex-col sm:flex-row gap-4">
                <img
                  src={r.image || "https://via.placeholder.com/56"}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover shrink-0 border"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-800">{r.reviewerName}</span>
                    <span className="text-sm text-gray-500">· {r.location}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[status]}`}>
                      {status === "pending" ? "Waiting for approval" : status}
                    </span>
                  </div>
                  <div className="text-yellow-500 text-sm">
                    {"★".repeat(r.rating)}
                    <span className="text-gray-300">{"★".repeat(Math.max(0, 5 - r.rating))}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line break-words">{r.title}</p>
                  <p className="text-xs text-gray-500">
                    Project: {r.project} · {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex sm:flex-col items-start sm:items-end gap-2 shrink-0">
                  {status !== "approved" && (
                    <button
                      onClick={() => setStatus(r._id, "approved")}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
                    >
                      <Check size={14} /> Approve
                    </button>
                  )}
                  {status !== "rejected" && (
                    <button
                      onClick={() => setStatus(r._id, "rejected")}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                    >
                      <X size={14} /> {status === "approved" ? "Hide" : "Reject"}
                    </button>
                  )}
                  {confirmDeleteId === r._id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Delete?</span>
                      <button
                        onClick={() => handleDelete(r._id)}
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
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(r._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReviewList;
