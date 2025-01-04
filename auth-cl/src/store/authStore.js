import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: false,
  authError: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      if (!email || !password || !name)
        throw new Error("Name, email and password are required");

      const resp = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await resp.json();
      if (!data.success)
        throw new Error(`Error ${resp.status}: ${data.message}`);

      set({ user: data.data.user, isAuthenticated: true });
    } catch (error) {
      console.log("error in authStore/signup", error.message);
      set({ error: error.message || "Error signing up" });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });

      if (!email || !password)
        throw new Error("Email and password are required");

      const resp = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await resp.json();

      if (!data.success)
        throw new Error(`Error ${resp.status}: ${data.message}`);

      set({ user: data.data.user, isAuthenticated: true });
    } catch (error) {
      console.log("error in authStore/login", error.message);
      set({ error: error.message || "Error loging in" });
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (code) => {
    try {
      set({ isLoading: true, error: null });

      const resp = await fetch(`${API_BASE_URL}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const data = await resp.json();
      if (!data.success)
        throw new Error(`Error ${resp.status}: ${data.message}`);
    } catch (error) {
      console.log("error in authStore/verifyEmail", error.message);
      set({ error: error.message || "Error in verifying email" });
    } finally {
      set({ isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    try {
      set({ isLoading: true, error: null });

      const resp = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await resp.json();

      if (!data.success)
        throw new Error(`Error ${resp.status}: ${data.message}`);
    } catch (error) {
      console.log("error in authStore/forgotPassword", error.message);
      set({ error: error.message || "Error in forgotting password" });
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (password, token) => {
    try {
      set({ isLoading: true, error: null });

      const resp = await fetch(`${API_BASE_URL}/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });
      const data = await resp.json();

      if (!data.success)
        throw new Error(`Error ${resp.status}: ${data.message}`);
    } catch (error) {
      console.log("error in authStore/resetPassword", error.message);
      set({ error: error.message || "Error in resetting password" });
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true, authError: null });
      const resp = await fetch(`${API_BASE_URL}/check-auth`, {
        credentials: "include",
      });

      const data = await resp.json();
      if (!data.success)
        throw new Error(`Error ${resp.status}: ${data.message}`);

      set({ user: data.data.user, isAuthenticated: true });
    } catch (error) {
      console.log("error in authStore/checkAuth", error.message);
      set({
        authError: error.message || "Error in checking auth",
        isAuthenticated: false,
        user: null,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const resp = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await resp.json();
      if (!data.success)
        throw new Error(`Error ${resp.status}: ${data.message}`);

      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.log("error in authStore/logout", error.message);
      set({ error: error.message || "Error in logging out" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
