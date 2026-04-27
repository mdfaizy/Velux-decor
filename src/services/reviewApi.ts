import apiConnector from "./apiConnector";

// CREATE
export const createReviewApi = async (data: any) => {
  const res = await apiConnector.post("/reviews", data, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ FIX
    },
  });
  return res.data;
};

// GET ALL
export const getReviewsApi = async () => {
  const res = await apiConnector.get("/reviews");
  return res.data;
};

// DELETE
export const deleteReviewApi = async (id: string) => {
  const res = await apiConnector.delete(`/reviews/${id}`);
  return res.data;
};