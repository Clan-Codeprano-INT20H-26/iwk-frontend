export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const formattedDate = parsedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formattedDate;
};
