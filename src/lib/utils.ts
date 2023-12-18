import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeStringToNumber(time: string) {
  const timeArray = time.split(":");
  const hours = parseInt(timeArray[0]!, 10);
  const minutes = parseInt(timeArray[1]!, 10);

  return hours + minutes / 60;
}

export function convertNumberToTimeString(value: number) {
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
