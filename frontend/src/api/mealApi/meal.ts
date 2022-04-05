import axios from "axios";
import { axiosConfig } from "../axios/settings";
import { IListMeal, IPacient } from "../../types";
import { formatDateTimeFromApiStdToBRS } from "../../utils";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/meal/`,
});

interface IMeasurementData {
  glycemia: number;
  timestamp: string;
}

interface ICreateMeal {
  type: string;
  cho: number;
  timestamp: string;
  glycemia: number;
  ui: number;
}

interface IMeasurementsFilters {
  pacient: number;
}

interface IGetMeasurements {
  pacient: IPacient;
  filters?: IMeasurementsFilters;
}

export class MealApi {
  async createMeal(
    data: ICreateMeal,
    pacient: IPacient
  ): Promise<{ status: number; msg: string }> {
    api.defaults.headers.common["Authorization"] =
      `Token ${pacient.token}` || "";
    const requestData = {
      ...data,
      pacient: pacient.id,
    };
    console.log(requestData);
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

  async getAllMeals({
    pacient,
    filters,
  }: IGetMeasurements): Promise<IListMeal[]> {
    api.defaults.headers.common["Authorization"] =
      `Token ${pacient.token}` || "";
    const response = await api.get("", { params: filters });
    return response.data.map((item: IListMeal) => ({
      ...item,
      measurement: {
        ...item.measurement,
        timestamp: formatDateTimeFromApiStdToBRS(item.measurement.timestamp),
      },
      injection: {
        ...item.injection,
        timestamp: formatDateTimeFromApiStdToBRS(item.injection.timestamp),
      },
    }));
  }
}
