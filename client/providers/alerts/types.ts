import { MetricsType } from '@client/providers'

export type AlertLevel = 'alert' | 'warn'
export type AlertStatus = AlertLevel | 'ok' | 'no-data'

export type AlertsConfig = {
  [key in MetricsType]?: {
    [key in AlertLevel]: {
      duration: number | null
      threshold: number | null
    }
  }
}

export type Alerts = {
  [key in MetricsType]?: AlertStatus
}
