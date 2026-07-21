
// import apiConnector from "./apiConnector";



// export const createContactApi = async (data: any) => {
//   try {
//     const res = await apiConnector.post("/contact/contact", data);
//     return res.data;
//   } catch (error: any) {
//     throw error;
//   }
// };


import apiConnector from "./apiConnector";

// CREATE
export const createContactApi = async (data: any) => {
  const res = await apiConnector.post("/contact/contact", data);
  return res.data;
};

// GET ALL
export const getContactsApi = async () => {
  const res = await apiConnector.get("/contact");
  return res.data;
};

// DELETE
export const deleteContactApi = async (id: string) => {
  const res = await apiConnector.delete(`/contact/${id}`);
  return res.data;
};

// UPDATE STATUS
export const updateContactApi = async (
  id: string,
  status: string
) => {
  const res = await apiConnector.put(`/contact/${id}/status`, {
    status,
  });

  return res.data;
};