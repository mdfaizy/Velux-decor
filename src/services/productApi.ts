import apiConnector from "./apiConnector";

// 🔥 CREATE PRODUCT
export const createProductApi = async (data: FormData) => {
  return apiConnector.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProductByIdApi = async (id: any) => {
  const res = await apiConnector.get(`/products/${id}`);
  return res.data;
};
// 🔥 GET ALL PRODUCTS
export const getProductsApi = async () => {
  const res = await apiConnector.get("/products");
  return res.data;
};

// 🔥 DELETE PRODUCT
export const deleteProductApi = async (id: string) => {
  const res = await apiConnector.delete(`/product/${id}`);
  return res.data;
};

// 🔥 UPDATE PRODUCT
export const updateProductApi = async (id: string, data: any) => {
  const res = await apiConnector.put(`/products/${id}`, data);
  return res.data;
};

export const toggleProductApi = async (id: string, status: boolean) => {
  try {
    const res = await apiConnector.patch(`/products/toggle/${id}`, {
      isAvailable: status,
    });

    return res.data;
  } catch (error: any) {
    throw error;
  }
};