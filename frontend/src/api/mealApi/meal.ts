import axios from "axios";
import { axiosConfig } from "../axios/settings";
import { IFilters, IListMeal, IPacient, IPaginatedListMeal } from "../../types";
import { formatDateTimeFromApiStdToBRS } from "../../utils";

const api = axios.create({
  ...axiosConfig,
  baseURL: `${axiosConfig.baseURL}/meal/`,
});


interface ICreateMeal {
  type: string;
  cho: number;
  timestamp: string;
  glycemia: number;
  ui: number;
}

interface IMealFilters extends IFilters{
  cho?: string;
  date?: string;
  date__lt?: string;
  date__gt?: string;
  date_bewteen?: string;
  glycemia_between?: string;
  type?: string;
}

interface IGetMeals {
  pacient: IPacient;
  filters?: IMealFilters;
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
  }: IGetMeals): Promise<IPaginatedListMeal> {
    api.defaults.headers.common["Authorization"] =
      `Token ${pacient.token}` || "";
    const response = await api.get("", {
      params: { ...filters, pacient: pacient.id },
    });

    const data = response.data.results.map((item: IListMeal) => ({
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
    return {
      results: data,
      total: response.data.count,
      totalPages: response.data.total_pages,
      pageSize: response.data.page_size,
    };
  }
}
