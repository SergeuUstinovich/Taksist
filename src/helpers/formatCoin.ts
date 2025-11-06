export function formatCoins(value: number) {
  const units = [
    { suffix: "T", value: 1_000_000_000_000 },
    { suffix: "B", value: 1_000_000_000 },
    { suffix: "M", value: 1_000_000 },
    { suffix: "K", value: 1_000 },
  ];

  for (const unit of units) {
    if (value >= unit.value) {
      const formatted = (value / unit.value).toFixed(1);
      return `${formatted}${unit.suffix}`;
    }
  }

  return value.toString();
}
