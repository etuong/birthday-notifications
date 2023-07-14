import { months } from "./constants";

export const getDateInfo = (seconds) => {
  const dateObj = new Date(seconds * 1000);
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const monthDay = `${month} ${day}`;
  const dateNow = new Date(Date.now());
  const diff = new Date(dateNow - dateObj);
  const yearDifference = Math.abs(diff.getUTCFullYear() - 1970) + 1;
  let daysToBirthday = daysIntoYear(dateObj) - daysIntoYear(dateNow);
  if (daysToBirthday < 0) {
    daysToBirthday = 365 + daysToBirthday;
  }
  return { monthDay, yearDifference, daysToBirthday };
};

const daysIntoYear = (date) => {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
};

export function compareFn(a, b) {
  if (a.daysToBirthday < b.daysToBirthday) {
    return -1;
  }

  if (a.daysToBirthday > b.daysToBirthday) {
    return 1;
  }

  return 0;
}
