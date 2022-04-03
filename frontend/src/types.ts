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
  glicemy: number;
  timestamp: string;
}
