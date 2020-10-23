import {format, fromUnixTime} from 'date-fns';

export const formatDate = (date, errorMessage = '') => {
  if (date) return format(fromUnixTime(date/1000), 'dd/MM/yyyy');
  return errorMessage;
}