
export const formatTime = (time) => {
  if (!time) return "00:00:00";

  // If time is already in HH:MM:SS format, return as is
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) return time;

  // If time is in seconds (number), convert to HH:MM:SS
  const totalSeconds = parseInt(time, 10);
  if (isNaN(totalSeconds)) return "00:00:00";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
};

