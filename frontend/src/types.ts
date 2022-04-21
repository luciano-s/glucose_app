export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
}

export interface IPacient {
  id: number;
  user: IUser;
  token?: string;
}

export interface IMeasurement {
  id: number;
  glycemia: number;
  timestamp: string;
  is_glycemia_good: boolean;
}

export interface IPaginatedMeasurement {
  results: IMeasurement[];
  totalPages: number;
  total: number;
  pageSize: number;
}

interface IMeasurementMeal extends IMeasurement {
  pacient: number;
}

interface IInjectionMeal {
  ui: number;
  timestamp: string;
  pacient: number;
}

export interface IListMeal {
  id: number;
  cho: number;
  type: string;
  measurement: IMeasurementMeal;
  injection: IInjectionMeal;
}

export interface IPaginatedListMeal {
  results: IListMeal[];
  totalPages: number;
  total: number;
  pageSize: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface IAntdPagination {
  current: number;
  pageSize: number;
  total: number;
}

export interface ISorter {
  field: string;
  order: string;
}

export interface IFilters {
  pacient?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}
