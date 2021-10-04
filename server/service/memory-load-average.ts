import { totalmem, freemem } from 'os'

export const memoryLoadAverage = (time = 10000): Promise<number> => {
  return new Promise((resolve) => {
    const t = totalmem()
    const f1 = freemem()
    setTimeout(() => {
      const f2 = freemem()
      resolve((t - (f1 + f2) / 2) / t)
    }, time)
  })
}
