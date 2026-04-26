
import apiConnector from "./apiConnector";



export const createContactApi = async (data: any) => {
  try {
    const res = await apiConnector.post("/contact/contact", data);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};