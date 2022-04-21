import axios from "axios";
import { axiosConfig } from "../axios/settings";
import {
  IFilters,
  IMeasurement,
  IPacient,
  IPaginatedMeasurement,
} from "../../types";
import { formatDateTimeFromApiStdToBRS } from "../../utils";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/measurement/`,
});

interface IMeasurementData {
  glycemia: number;
  timestamp: string;
}

interface ICreateMeasurement {
  data: IMeasurementData;
  pacient: IPacient;
}

interface IGetMeasurements {
  pacient: IPacient;
  filters?: IFilters;
}

export class MeasurementApi {
  async createMeasurement({
    data,
    pacient,
  }: ICreateMeasurement): Promise<{ status: number; msg: string }> {
    api.defaults.headers.common["Authorization"] =
      `Token ${pacient.token}` || "";
    const requestData = {
      ...data,
      pacient: pacient.id,
    };

    return api
      .post("", { ...requestData })
      .then((response) => ({ status: response.status, msg: response.data }))
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

  async getAllMeasurements({
    pacient,
    filters,
  }: IGetMeasurements): Promise<IPaginatedMeasurement> {
    api.defaults.headers.common["Authorization"] =
      `Token ${pacient.token}` || "";
    const response = await api.get("", {
      params: { ...filters, pacient: pacient.id },
    });
    const data = response.data.results.map((item: IMeasurement) => ({
      ...item,
      timestamp: formatDateTimeFromApiStdToBRS(item.timestamp),
    }));
    return {
      results: data,
      total: response.data.count,
      totalPages: response.data.total_pages,
      pageSize: response.data.page_size,
    };
  }
}
