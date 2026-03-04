import { formatarDataUTC } from "./convertHourUtc";

export function formattedDate(date: string) {
  return new Date(formatarDataUTC(date)).toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})}
