import { getUtcMs } from '@client/fns'
import { usePersistState } from '@client/hooks'
import { useRef, useEffect, Ref, StateUpdater } from 'preact/hooks'
import { Metrics, MetricsConfig, MetricsType } from '.'
import { getMetric } from './get-metric'

const cleanupOldMetrics = (config: MetricsConfig) => {
  return (m: Metrics) => {
    return Object.entries(m).reduce((acc, [key, data]) => {
      acc[key as MetricsType] = data.filter(
        ({ timestamp }) =>
          timestamp > getUtcMs() - config[key as MetricsType].totalTime
      )
      return acc
    }, {} as Metrics)
  }
}

const updateMetrics = ({
  metric,
  sampleTime,
  prevSample,
  totalTime,
  prevTotal,
  setMetrics
}: {
  metric: MetricsType
  sampleTime: number
  prevSample: Ref<number>
  totalTime: number
  prevTotal: Ref<number>
  setMetrics: StateUpdater<Metrics>
}) => {
  getMetric(metric as MetricsType, sampleTime).then((r) => {
    if (prevSample.current === sampleTime && prevTotal.current === totalTime) {
      setMetrics((prevMetrics) => ({
        ...prevMetrics,
        [metric]: [
          // simple "queue" with max length timeWindow / span
          // prevents metrics size to grow beyond what's needed for ui
          ...prevMetrics[metric as MetricsType]
            .slice(
              prevMetrics[metric as MetricsType].length ===
                Math.ceil(totalTime / sampleTime)
                ? 1
                : 0
            )
            // make sure to remove elements out of range
            .filter(({ timestamp }) => timestamp > getUtcMs() - totalTime),
          r
        ]
      }))
    }
  })
}

export const useCreateMetrics = (config: MetricsConfig): Metrics => {
  const [metrics, setMetrics] = usePersistState<Metrics>(
    {
      cpu: [],
      memory: []
    },
    'METRICS',
    cleanupOldMetrics(config)
  )
  const m = Object.entries(config)
  for (let i = 0; i < m.length; i++) {
    const [metric, { totalTime, sampleTime }] = m[i]
    const prevSample = useRef(sampleTime)
    const prevTotal = useRef(totalTime)
    useEffect(() => {
      // if new sample rate, reset dataset
      if (prevSample.current !== sampleTime) {
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          [metric]: []
        }))
      }
      updateMetrics({
        metric: metric as MetricsType,
        sampleTime,
        prevSample,
        totalTime,
        prevTotal,
        setMetrics
      })
      const fetcher = setInterval(
        () =>
          updateMetrics({
            metric: metric as MetricsType,
            sampleTime,
            prevSample,
            totalTime,
            prevTotal,
            setMetrics
          }),
        sampleTime
      )
      return () => clearInterval(fetcher)
    }, [sampleTime, totalTime])
    useEffect(() => {
      prevSample.current = sampleTime
    }, [sampleTime])

    useEffect(() => {
      prevTotal.current = totalTime
    }, [totalTime])
  }

  return metrics
}
