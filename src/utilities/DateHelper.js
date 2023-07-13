export const getDateInfo = (seconds) => {
  const dateObj = new Date(card.birthDate.seconds * 1000);
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const monthDay = `${month}-${day}`;

  return { monthDay };
};
