import { usePersistState } from '@client/hooks'
import { ComponentChildren, createContext, FunctionComponent, h } from 'preact'
import { StateUpdater, useContext, useState } from 'preact/hooks'
import { Metrics, MetricsConfig } from './types'
import { useCreateMetrics } from './use-create-metrics'

export type MetricsContextType = {
  metrics: Metrics
  config: MetricsConfig
  configure: StateUpdater<MetricsConfig>
}
export const MetricsContext = createContext<MetricsContextType>({
  metrics: {
    cpu: [],
    memory: []
  },
  config: {
    cpu: {
      sampleTime: 0,
      totalTime: 0
    },
    memory: {
      sampleTime: 0,
      totalTime: 0
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  configure: () => {}
})

export const MetricsProvider: FunctionComponent<{
  children: ComponentChildren
}> = ({ children }) => {
  const [config, configure] = usePersistState<MetricsConfig>(
    {
      cpu: {
        sampleTime: 10000,
        totalTime: 600000
      },
      memory: {
        sampleTime: 10000,
        totalTime: 600000
      }
    },
    'METRICS_CONFIG'
  )
  const metrics = useCreateMetrics(config)
  return (
    <MetricsContext.Provider value={{ metrics, config, configure }}>
      {children}
    </MetricsContext.Provider>
  )
}

export const useMetrics = (): MetricsContextType => useContext(MetricsContext)
