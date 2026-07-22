import api from "../api/axios";

export const loginUser = (data: {
  email: string;
  password: string;
}) => api.post("/login", data);

export const registerUser = (data: unknown) =>
  api.post("/register", data);