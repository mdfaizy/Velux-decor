import apiConnector from "./apiConnector";

export const getShowroomsApi = async () => {
  const res = await apiConnector.get("/showrooms");
  return res.data;
};