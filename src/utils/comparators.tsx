export const numericComparator = (valueA: any, valueB: any) => {
  const numA = valueA !== null && valueA !== undefined && valueA !== "" ? parseFloat(valueA) : Number.MIN_VALUE;
  const numB = valueB !== null && valueB !== undefined && valueB !== "" ? parseFloat(valueB) : Number.MIN_VALUE;
  return numA - numB;
};