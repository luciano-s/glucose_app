import moment from "moment";

export const formatDateTimeFromBRStdToApi = (dateTime: string) =>
  moment(dateTime, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");

export const formatDateTimeFromApiStdToBRS = (dateTime: string) =>
  moment(dateTime, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm");

export const getColor = (obj: { is_glycemia_good: boolean }): string =>
  obj.is_glycemia_good ? "#1bf20d" : "#CC3333";

export const formatOrder = (order: { field: string; order: string }) =>
  order.field && order.order
    ? `${order.order === "ascend" ? "" : "-"}${getField(order)}`
    : undefined;

export const getField = (obj: { field: string }) => {
  return (
    {
      timestamp: "date",
      uiTimestamp: "injection_date",
    }[obj.field] || obj.field
  );
};
