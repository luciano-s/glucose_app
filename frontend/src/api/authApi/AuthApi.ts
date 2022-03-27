import axios from "axios";
import { axiosConfig, axiosUnauthConfig } from "../axios/settings";
import { Navigate } from "react-router-dom";

export interface ICreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

const authenticatedApi = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/auth/`,
});

const unauthenticatedApi = axios.create({
  ...axiosUnauthConfig,
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: `${axiosConfig.baseURL}/auth/`,
});
export class AuthApi {
  async createUser(data: ICreateUser) {
    await unauthenticatedApi.post("user", {
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
    });
  }

  async login(data: ILogin): Promise<{ status: number; msg: string }> {
    return unauthenticatedApi
      .post(`login/`, data)
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        console.log(response.data.token)
        return { status: response.status, msg: response.data };
      })
      .catch((error) => {
        {
          if (error.response) {
            return {
              status: error.response.status,
              msg: error.response.data.message,
            };
          } else {
            return { status: 400, msg: "" };
          }
        }
      });
  }

  async logout(): Promise<{ status: number; msg: string }> {
    return authenticatedApi
      .get(`logout/`)
      .then((response) => {
        sessionStorage.removeItem("token");
        return { status: response.status, msg: response.data.message };
      })
      .catch((error) => {
        if (error.response) {
          return {
            status: error.response.status,
            msg: error.response.data.message,
          };
        } else {
          return {
            status: 400,
            msg: "",
          };
        }
      });
  }
}
