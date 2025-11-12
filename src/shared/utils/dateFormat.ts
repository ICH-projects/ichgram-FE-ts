import { DateTime } from "luxon";

export const toNotificationFormat = (date: string) => {
  const nowDate = DateTime.now();
  const inputDate = DateTime.fromISO(date);
  const diff = nowDate.diff(inputDate);
  let result;
  if (diff.as("years") > 1) {
    result = nowDate.diff(inputDate, "years").toObject();
  } else if (diff.as("months") > 1) {
    result = nowDate.diff(inputDate, "months").toObject();
  } else if (diff.as("weeks") > 1) {
    result = nowDate.diff(inputDate, "weeks").toObject();
  } else if (diff.as("days") > 1) {
    result = nowDate.diff(inputDate, "days").toObject();
  } else if (diff.as("hours") > 1) {
    result = nowDate.diff(inputDate, "hours").toObject();
  } else if (diff.as("minutes") > 1) {
    result = nowDate.diff(inputDate, "minutes").toObject();
  } else {
    return `less than a minute ago`;
  }

  return `${Object.values(result)[0].toFixed(0)} ${Object.keys(result)[0]} ago`;
};
