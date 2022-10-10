export const percentageOf = (value: number, ofValue: number) =>
  100 / (ofValue / value);

export const leadWithZero = (value: number) =>
  value >= 10 ? value.toString() : "0" + value;

export const toFixed = (value: number, decimals: number) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
