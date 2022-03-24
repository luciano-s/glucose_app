import axios from "axios";
import { axiosConfig } from "./settings";

export const API = axios.create({
  ...axiosConfig,
  baseURL: axiosConfig.baseURL,
});
