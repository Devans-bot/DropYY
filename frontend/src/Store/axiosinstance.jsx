import axios from "axios";
import React from "react";

export const axiosinstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5002/api"
      : "/api",
  withCredentials: true,
});