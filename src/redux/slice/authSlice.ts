import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../utils/authTypes";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");
const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // ✅ set user
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // ✅ set token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    // ✅ loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // ✅ error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // ✅ logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
       localStorage.removeItem("user");
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } =
  authSlice.actions;

export default authSlice.reducer;