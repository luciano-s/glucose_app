import moment from "moment";

export const formatDateTimeFromBRStdToApi = (dateTime: string) =>
  moment(dateTime, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");

export const formatDateTimeFromApiStdToBRS = (dateTime: string) =>
  moment(dateTime, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm");

export const getColor = (measurement: {
  is_glucose_level_good: boolean;
}): string => (measurement.is_glucose_level_good ? "#1bf20d" : "#CC3333");
