export function getDateRangeFromToday(daysToAdd: number = 3): { startDate: string, endDate: string } {
  const today = new Date();
  const future = new Date(today);
  future.setDate(today.getDate() + daysToAdd);

  const formatDate = (date: Date): string =>
    date.toISOString().split('T')[0]; // yyyy-MM-dd

  return {
    startDate: formatDate(today),
    endDate: formatDate(future),
  };
}