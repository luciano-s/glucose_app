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
  is_glucose_level_good: boolean;
}

export interface IMeal{
  
}