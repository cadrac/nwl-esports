// 18:00 -> ["18", "00"] -> [18, 0] -> 1080

export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number)

  const minutesAmounts = hours * 60 + minutes

  return minutesAmounts
}