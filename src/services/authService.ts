import apiConnector from "./apiConnector";

// ✅ LOGIN
export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await apiConnector.post("/auth/signin", data);
  return res.data;
};

// ✅ SIGNUP
export const signupApi = async (data: any) => {
  const res = await apiConnector.post("/auth/signup", data);
  return res.data;
};

export const getUsersApi = async () => {
  const res = await apiConnector.get("/auth/users");
  return res.data;
};

// ✅ FORGOT PASSWORD
export const forgotPasswordApi = async (email: string) => {
  const res = await apiConnector.post("/auth/forgotPassword", { email });
  return res.data;
};

// ✅ RESET PASSWORD
export const resetPasswordApi = async (
  token: string,
  password: string
) => {
  const res = await apiConnector.patch(`/auth/resetPassword/${token}`, {
    password,
  });
  return res.data;
};

// ✅ GET PROFILE
export const getMeApi = async () => {
  const res = await apiConnector.get("/auth/me");
  return res.data;
};