import { AveragesResponse } from '@server/types'
import { MetricsType } from '.'

export const getMetric = (
  metric: MetricsType,
  sampleTime: number
): Promise<{ value: number; timestamp: number }> => {
  switch (metric) {
    case 'cpu':
      return fetch(`/cpu-load-avg?interval=${sampleTime}`)
        .then((res) => res.json())
        .then(({ average, timestamp }: AveragesResponse) => ({
          value: average,
          timestamp
        }))
    case 'memory':
      return fetch(`/memory-avg?interval=${sampleTime}`)
        .then((res) => res.json())
        .then(({ average, timestamp }: AveragesResponse) => ({
          value: average,
          timestamp
        }))
  }
}
