import dayjs from 'dayjs'

export function formatToHourMinutes(data: string): string {
  const date = dayjs(data)
  const formattedTime = date.format('HH:mm')
  return formattedTime
}
