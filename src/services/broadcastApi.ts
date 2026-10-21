import apiConnector from "./apiConnector";

export interface BroadcastMessage {
  templateName: string;
  language: string;
  params: string[];
  headerImage?: string;
}

export interface Broadcast extends BroadcastMessage {
  _id: string;
  status: "sending" | "completed" | "failed";
  total: number;
  sent: number;
  failed: number;
  delivered: number;
  read: number;
  failures: { phone: string; error: string }[];
  createdBy?: { name: string };
  createdAt: string;
  completedAt?: string;
}

export interface TemplateSummary {
  name: string;
  language: string;
  category: string;
  header?: string;
  headerFormat?: string;
  body: string;
  footer?: string;
  variableCount: number;
}

// data is null when the business account ID isn't configured
export const getTemplatesApi = async () => {
  const res = await apiConnector.get("/broadcasts/templates");
  return res.data;
};

export const getWhatsAppStatusApi = async () => {
  const res = await apiConnector.get("/broadcasts/status");
  return res.data;
};

export const sendTestMessageApi = async (data: BroadcastMessage & { phone: string }) => {
  const res = await apiConnector.post("/broadcasts/test", data);
  return res.data;
};

// delivery status reported by Meta's webhook
export const getMessageStatusApi = async (wamid: string) => {
  const res = await apiConnector.get(`/broadcasts/message/${encodeURIComponent(wamid)}`);
  return res.data;
};

export const createBroadcastApi = async (data: BroadcastMessage) => {
  const res = await apiConnector.post("/broadcasts", data);
  return res.data;
};

export const getBroadcastsApi = async () => {
  const res = await apiConnector.get("/broadcasts");
  return res.data;
};
