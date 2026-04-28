import apiConnector from "./apiConnector";

// CREATE ENQUIRY
export const createEnquiryApi = async (data: any) => {
  const res = await apiConnector.post("/enquiry/create", data);
  return res.data;
};

// GET ALL ENQUIRIES (admin)
export const getEnquiryApi = async () => {
  const res = await apiConnector.get("/enquiry");
  return res.data;
};

// DELETE
export const deleteEnquiryApi = async (id: string) => {
  const res = await apiConnector.delete(`/enquiry/${id}`);
  return res.data;
};