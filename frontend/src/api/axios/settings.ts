export const basename = `http://127.0.0.1:8000`;

interface IAxionsConfig {
  baseURL: string;
  timeout: number;
  headers: {
    "Content-Type": string;
  }
};

export const axiosConfig: IAxionsConfig = {
  baseURL: `${basename}/api/v1`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
};