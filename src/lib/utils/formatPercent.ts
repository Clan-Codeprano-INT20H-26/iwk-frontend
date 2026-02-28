export const formatPercent = (percent: number) => {
  const percentageValue = (percent * 100).toFixed(2);
  return `${percentageValue}%`;
};
