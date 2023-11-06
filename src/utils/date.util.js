import { format } from "date-fns";

export const DateUtil = {
  toString(text) {
    const date = new Date(text);
    return format(date, "dd MMMM yyyy 'at' HH:mm:ss");
  },
  toDate(text) {
    return new Date(text).toISOString().slice(0, 16);
  },
};
