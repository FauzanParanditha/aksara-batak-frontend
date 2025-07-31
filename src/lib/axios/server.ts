import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
  timeout: 30000,
});

export default serverAxios;
