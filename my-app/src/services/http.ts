// Single shared Axios instance for the whole app (client + server).
// Point NEXT_PUBLIC_API_URL at a real backend in a later phase — nothing else changes.
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export default http;
