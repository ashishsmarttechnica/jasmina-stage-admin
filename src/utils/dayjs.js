// src/utils/dayjs.js
import dayjs from "dayjs";

// ✅ API ke liye format (DD-MM-YYYY)
export const formatToApiDate = (date) => {
  if (!date) return null;
  return dayjs(date).format("YYYY-MM-DD");
};

// ✅ UI ke liye format (DD/MM/YYYY)
export const formatToUIDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};

// ✅ Date string ko parse karke dayjs object banao
export const parseDate = (dateString) => {
  return dayjs(dateString);
};

// ✅ Expiry check (true/false)
export const isExpired = (date) => {
  return dayjs(date).isBefore(dayjs(), "day");
};

// ✅ Days add karna (e.g., 30 din baad ki date)
export const addDays = (date, days) => {
  return dayjs(date).add(days, "day").format("YYYY-MM-DD");
};

// ✅ Aaj ki date
export const today = () => {
  return dayjs().format("YYYY-MM-DD");
};

export default dayjs;
