export type MetricsType = 'cpu' | 'memory'

export type MetricsValuesType = 'percentage' // | 'absolute'

export type Metrics = {
  [key in MetricsType]: {
    value: number
    timestamp: number
  }[]
}

export type MetricsConfig = {
  [key in MetricsType]: {
    sampleTime: number
    totalTime: number
  }
}
