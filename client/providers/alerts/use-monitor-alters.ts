import { StateUpdater, useEffect } from 'preact/hooks'
import { AlertsConfig, MetricsType, useMetrics } from '@client/providers'
import { Alerts, AlertLevel } from './types'

export const useMonitorAlerts = (
  alertsConfig: AlertsConfig,
  setAlerts: StateUpdater<Alerts>
): void => {
  const { metrics } = useMetrics()
  useEffect(() => {
    const alertsStatus: Alerts = {}
    const allAlerts = Object.entries(alertsConfig)
    for (let i = 0; i < allAlerts.length; i++) {
      const alertTypesWeighted: AlertLevel[] = ['warn', 'alert']
      const [id, types] = allAlerts[i]
      const alertsSet = Object.values(types).reduce(
        (acc, { threshold, duration }) => (threshold && duration ? true : acc),
        false
      )
      const metric = metrics[id as MetricsType]
      if (metric.length <= 1 && alertsSet) {
        alertsStatus[id as MetricsType] = 'no-data'
        continue
      }
      if (alertsSet) alertsStatus[id as MetricsType] = 'ok'
      for (let y = 0; y < alertTypesWeighted.length; y++) {
        const alertType = alertTypesWeighted[y]
        const { duration, threshold } = types[alertType]
        if (threshold && duration) {
          const { started, ongoing } = metric.reduce<{
            started: false | number
            ongoing: boolean
          }>(
            ({ started, ongoing }, { value, timestamp }) => {
              // value exceeds threshold start
              if (threshold && value > threshold && !started) {
                return { started: timestamp, ongoing: false }
              }
              // value still exceeds threshold
              if (
                threshold &&
                value > threshold &&
                started &&
                timestamp - started > duration
              ) {
                return {
                  started,
                  ongoing: true
                }
              }
              // value no more exceeds threshold
              if (threshold && value < threshold && started) {
                return {
                  started: false,
                  ongoing: false
                }
              }
              return { started, ongoing }
            },
            { started: false, ongoing: false }
          )
          if (started && ongoing) {
            alertsStatus[id as MetricsType] = alertType
          }
        }
      }
    }
    setAlerts(alertsStatus)
  }, [alertsConfig, metrics])
}
