export const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  const s = second.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const h = hours.toString().padStart(2, "0");

  if (days > 0) {
    return `${days}д ${h}:${m}:${s}`;
  } else if (hours > 0) {
    return `${h}:${m}:${s}`;
  } else {
    return `${m}:${s}`;
  }
};
