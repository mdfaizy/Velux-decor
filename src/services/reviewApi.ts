import apiConnector from "./apiConnector";

// PUBLIC: customer submits a review (pending until admin approves)
export const createReviewApi = async (data: FormData) => {
  const res = await apiConnector.post("/reviews", data, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ FIX
    },
  });
  return res.data;
};

// PUBLIC: approved reviews only
export const getReviewsApi = async () => {
  const res = await apiConnector.get("/reviews");
  return res.data;
};

// ADMIN: all reviews, pending first
export const getAllReviewsAdminApi = async () => {
  const res = await apiConnector.get("/reviews/admin/all");
  return res.data;
};

// ADMIN: approve / reject
export const updateReviewStatusApi = async (
  id: string,
  status: "approved" | "rejected" | "pending"
) => {
  const res = await apiConnector.patch(`/reviews/${id}/status`, { status });
  return res.data;
};

// ADMIN: delete
export const deleteReviewApi = async (id: string) => {
  const res = await apiConnector.delete(`/reviews/${id}`);
  return res.data;
};
