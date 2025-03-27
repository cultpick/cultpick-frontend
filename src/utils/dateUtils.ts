export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}월 ${day}일`;
};

export const transformPerformanceDates = (performance: any) => ({
  ...performance,
  startDate: formatDate(performance.startDate),
  endDate: formatDate(performance.endDate),
});
