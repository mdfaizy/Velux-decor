import apiConnector from "./apiConnector";

// 🔥 CREATE
export const createSubCategoryApi = async (data: FormData) => {
  return apiConnector.post("/subcategory", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const updateSubCategoryApi = async (
  id: string,
  data: FormData
) => {
  const res = await apiConnector.put(`/subcategory/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
// 🔥 GET BY CATEGORY SLUG
export const getSubCategoryBySlugApi = async (slug: string) => {
  const res = await apiConnector.get(`/subcategory/slug/${slug}`);
  return res.data;
};
// 🔥 GET ALL (IMPORTANT FIX NAME)
export const getSubCategoriesApi = async () => {
  const res = await apiConnector.get("/subcategory");
  return res.data;
};

// 🔥 DELETE
export const deleteSubCategoryApi = async (id: string) => {
  const res = await apiConnector.delete(`/subcategory/${id}`);
  return res.data;
};

// 🔥 TOGGLE STATUS
export const toggleSubCategoryApi = async (
  id: string,
  status: boolean
) => {
  const res = await apiConnector.patch(
    `/subcategory/toggle/${id}`,
    { isActive: status }
  );
  return res.data;
};