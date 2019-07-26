import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
const API_BASE_URL = isDev
  ? "http://localhost:3001"
  : "https://www.api.todo.diogocardoso.me";

const instance = axios.create({
  baseURL: API_BASE_URL
});

export default instance;
