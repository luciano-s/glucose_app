import axios from "axios";
import { config } from "process";
import { axiosConfig } from "../axios/settings";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/measurement`,
});

interface ICreateMeasurement {
  glicemy: number;
  date: string;
}

interface IMeasurementsFilters{
  
}

export class MeasurementApi {
  async createMeasurement(data: ICreateMeasurement) {
    await api.post("", {
      data,
    });
  }

  async getAllMeasurements(filters?: IMeasurementsFilters) {
    const response = await api.get("", { params: filters });
    return response.data;
  }
}
