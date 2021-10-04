import { cpus } from 'os'

export const cpuLoadAverage = (time = 10000): Promise<number> => {
  return new Promise((resolve) => {
    const [u1, s1, i1] = getTotalTimes()
    setTimeout(() => {
      const [u2, s2, i2] = getTotalTimes()
      const totalU = u2 - u1
      const totalS = s2 - s1
      const totalI = i2 - i1
      const totalTime = totalU + totalS + totalI
      resolve((u2 - u1 + (s2 - s1)) / totalTime)
    }, time)
  })
}

const getTotalTimes = () => {
  return cpus()
    .reduce(
      ([user, system, idle], { times }) => {
        return [user + times.user, system + times.sys, idle + times.idle]
      },
      [0, 0, 0]
    )
    .map((n) => n / cpus().length)
}
