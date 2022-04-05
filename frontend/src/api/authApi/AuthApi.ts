import axios from "axios";
import { axiosConfig, axiosUnauthConfig } from "../axios/settings";
import { IPacient } from "../../types";
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

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/auth/`,
});


export class AuthApi {

  async login(
    data: ILogin
  ): Promise<{
    status: number;
    data?: { pacient: IPacient; token: string };
    errorMsg?: string;
  }> {
    return api
      .post(`login/`, data)
      .then((response) => ({ status: response.status, data: response.data }))
      .catch((error) => {
        {
          if (error.response) {
            return {
              status: error.response.status,
              errorMsg: error.response.data.message,
            };
          } else {
            return { status: 400, errorMsg: "Error" };
          }
        }
      });
  }

  async logout(pacient: IPacient): Promise<{ status: number; data: string }> {
    api.defaults.headers.common["Authorization"] =
      `Token ${pacient.token}` || "";
    return api
      .get(`logout/`)
      .then((response) => ({
        status: response.status,
        data: response.data.message,
      }))
      .catch((error) => {
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data.message,
          };
        } else {
          return {
            status: 400,
            data: "",
          };
        }
      });
  }
}
