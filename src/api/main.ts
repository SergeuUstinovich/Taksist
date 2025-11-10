import axios from "axios";
import { validateResponse } from "./validateResponse";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: `${api_url}/api`,
  withCredentials: true,
});

export function createSession(initData: string | undefined) {
  return api
    .get(`/create_session/`, {
      headers: {
        Authorization: initData,
      },
    })
    .then((response) => response.data)
    // .catch(validateResponse);
}

export function mainInfo() {
  return api
    .get(`/main_page/`)
    .then((response) => response.data)
    // .catch(validateResponse);
}

export function goToLine() {
  return api
    .post(`/go_to_line/`)
    .then((response) => response.data)
    .catch(validateResponse);
}