export const addDays = (date: Date, days: number): void => {
  date.setDate(date.getDate() + days);
};

export const createNextDayDate = (date: Date): Date => {
  const newDate = new Date(date);

  addDays(newDate, 1);

  return newDate;
};
