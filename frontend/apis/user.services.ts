import apiClient from "./api-client";

export const getUsers = async () => {
  const res = await apiClient.get("/users");
  return res.data;
};

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await apiClient.post("/users/signup", data);
  console.log(res);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await apiClient.post("/users/login", data);
  return res.data;
};
