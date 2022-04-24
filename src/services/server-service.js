import axios from "axios";

export const BACKEND_SERVER = process.env.SERVER_IP || "http://localhost:4000"

const api = axios.create({
    withCredentials: true
});

export default api;
