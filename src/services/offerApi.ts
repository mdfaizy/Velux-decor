import apiConnector from "./apiConnector";

export interface Offer {
  _id: string;
  text: string;
  title?: string;
  image?: string;
  link?: string;
  linkLabel?: string;
  isActive: boolean;
  order: number;
  startDate?: string | null;
  endDate?: string | null;
  showInBar: boolean;
  showOnHome: boolean;
  showOnProduct: boolean;
  // id string from /active, populated { _id, name } from the admin list
  category?: string | { _id: string; name: string } | null;
}

// PUBLIC: offers currently live on the website.
// Banner, home card and product strip share one request per page load.
let activeOffersRequest: Promise<Offer[]> | null = null;

export const getActiveOffersApi = (): Promise<Offer[]> => {
  if (!activeOffersRequest) {
    activeOffersRequest = apiConnector
      .get("/offers/active")
      .then((res) => res.data?.data || [])
      .catch((err) => {
        activeOffersRequest = null; // allow retry on next mount
        throw err;
      });
  }
  return activeOffersRequest;
};

// ADMIN
export const getOffersApi = async () => {
  const res = await apiConnector.get("/offers");
  return res.data;
};

export const createOfferApi = async (data: FormData) => {
  const res = await apiConnector.post("/offers", data);
  return res.data;
};

export const updateOfferApi = async (id: string, data: FormData) => {
  const res = await apiConnector.put(`/offers/${id}`, data);
  return res.data;
};

export const toggleOfferApi = async (id: string) => {
  const res = await apiConnector.patch(`/offers/toggle/${id}`);
  return res.data;
};

export const deleteOfferApi = async (id: string) => {
  const res = await apiConnector.delete(`/offers/${id}`);
  return res.data;
};
