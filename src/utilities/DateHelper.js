
export const getDateInfo = (timestamp) => {
  const birthday = new Date(timestamp * 1000);
  const now = new Date();

  // Calculate age
  let age = now.getFullYear() - birthday.getFullYear() + 1;
  const monthDiff = now.getMonth() - birthday.getMonth();
  const dayDiff = now.getDate() - birthday.getDate();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Set the birthday to the current year
  birthday.setFullYear(now.getFullYear());

  // If the birthday has already passed this year, set it to the next year
  if (birthday < now) {
    birthday.setFullYear(now.getFullYear() + 1);
  }

  // Calculate the difference in time
  const diffTime = birthday - now;

  // Convert the difference from milliseconds to days
  const daysToBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formattedBirthDate = birthday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return { formattedBirthDate, daysToBirthday, age };
};

export function compareFn(a, b) {
  return a.daysToBirthday - b.daysToBirthday;
}
