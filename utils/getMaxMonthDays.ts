export default function getMaxMonthDays(month: number): number {
  if (month === 2) {
    return 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
}