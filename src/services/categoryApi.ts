import apiConnector from "./apiConnector";

// 🔥 CREATE CATEGORY
export const createCategoryApi = async (data: { name: string }) => {
  const res = await apiConnector.post("/category", data);
  return res.data;
};

// 🔥 GET ALL CATEGORIES
export const getCategoriesApi = async () => {
  const res = await apiConnector.get("/category");
  return res.data;
};

// 🔥 GET SINGLE CATEGORY
export const getCategoryByIdApi = async (id: string) => {
  const res = await apiConnector.get(`/category/${id}`);
  return res.data;
};

// 🔥 UPDATE CATEGORY
export const updateCategoryApi = async (
  id: string,
  data: { name: string }
) => {
  const res = await apiConnector.put(`/category/${id}`, data);
  return res.data;
};

// 🔥 DELETE CATEGORY
export const deleteCategoryApi = async (id: string) => {
  const res = await apiConnector.delete(`/category/${id}`);
  return res.data;
};

// 🔥 TOGGLE CATEGORY STATUS (ACTIVE/INACTIVE)
export const toggleCategoryApi = async (id: string) => {
  const res = await apiConnector.patch(`/category/toggle/${id}`);
  return res.data;
};