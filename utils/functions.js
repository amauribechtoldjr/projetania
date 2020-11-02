import { format, fromUnixTime } from "date-fns";

import pt from "date-fns/locale/pt";

export const formatDate = (
  date,
  errorMessage = "",
  formatPattern = "dd/MM/yyyy"
) => {
  if (date)
    return format(fromUnixTime(date / 1000), formatPattern, { locale: pt });
  return errorMessage;
};
