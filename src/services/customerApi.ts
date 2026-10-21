import apiConnector from "./apiConnector";

export interface Customer {
  _id: string;
  name?: string;
  phone: string;
  email?: string;
  source: "contact" | "manual" | "import";
  whatsappOptIn: boolean;
  optInAt?: string;
  createdAt: string;
}

export interface CustomerImportRow {
  name?: string;
  phone: string;
  email?: string;
}

export const getCustomersApi = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  optIn?: "" | "yes" | "no";
}) => {
  const res = await apiConnector.get("/customers", { params });
  return res.data;
};

export const createCustomerApi = async (data: {
  name?: string;
  phone: string;
  email?: string;
  whatsappOptIn: boolean;
}) => {
  const res = await apiConnector.post("/customers", data);
  return res.data;
};

export const importCustomersApi = async (
  customers: CustomerImportRow[],
  whatsappOptIn: boolean
) => {
  const res = await apiConnector.post("/customers/import", { customers, whatsappOptIn });
  return res.data;
};

export const updateCustomerApi = async (
  id: string,
  data: Partial<Pick<Customer, "name" | "email" | "whatsappOptIn">>
) => {
  const res = await apiConnector.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomerApi = async (id: string) => {
  const res = await apiConnector.delete(`/customers/${id}`);
  return res.data;
};
