export const utcMsTimestamp = (): number => {
  const now = new Date()
  return now.getTime() + now.getTimezoneOffset() * 60 * 1000
}
