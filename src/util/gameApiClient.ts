import axios from "axios";
import { config } from "../config";

export const gameApi = axios.create({
  baseURL: config.apiUrl,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const setGameApiAuth = (apiKey: string) => {
  gameApi.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
};
