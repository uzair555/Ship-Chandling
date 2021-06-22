import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const CREATE = (url, body) => instance.post(url, body)
export const UPDATE = (url, body) => instance.patch(url, body)
export const DELETE = (url) => instance.delete(url)
export const GET = (url) => instance.get(url);