import axios from "axios";
import { axiosConfig } from "../axios/settings";

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
  baseURL: `${axiosConfig.baseURL}/`,
});

export class AuthApi {
  async createUser(data: ICreateUser) {
    await api.post("user", {
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
    });
  }

  async login(data: ILogin) {
    const response = await api.post("login/",  data);
    console.log(response.data);
  }
}
