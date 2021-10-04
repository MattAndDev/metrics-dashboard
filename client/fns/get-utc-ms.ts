export const getUtcMs = (): number => {
  const now = new Date()
  return now.getTime() + now.getTimezoneOffset() * 60 * 1000
}
