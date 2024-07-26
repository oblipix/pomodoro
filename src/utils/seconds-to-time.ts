/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { zeroLeft } from './zero-left';
export function secondsToTime(seconds: number): string {
  const hours = zeroLeft(seconds / 3600);
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${hours}h${min}m${sec}s`;
}
