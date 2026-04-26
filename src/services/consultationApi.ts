import apiConnector from "./apiConnector";

// CREATE
export const createConsultationApi = async (data: any) => {
  const res = await apiConnector.post("/consultations", data);
  return res.data;
};

// GET ALL
export const getConsultationsApi = async () => {
  const res = await apiConnector.get("/consultations");
  return res.data;
};

// DELETE
export const deleteConsultationApi = async (id: string) => {
  const res = await apiConnector.delete(`/consultations/${id}`);
  return res.data;
};