import { ComponentChildren, createContext, FunctionComponent, h } from 'preact'
import { StateUpdater, useContext, useState } from 'preact/hooks'
import { useMonitorAlerts } from './use-monitor-alters'
import { AlertsConfig, Alerts } from './types'
import { usePersistState } from '@client/hooks'

export type AlertsContextType = {
  alertsConfig: AlertsConfig
  setAlertsConfig: StateUpdater<AlertsConfig>
  alerts: Alerts
}

export const AlertsContext = createContext<AlertsContextType>({
  alertsConfig: {},
  alerts: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlertsConfig: () => {}
})

const defaultConfig: AlertsConfig = {
  cpu: {
    warn: {
      duration: null,
      threshold: null
    },
    alert: {
      duration: null,
      threshold: null
    }
  },
  memory: {
    warn: {
      duration: null,
      threshold: null
    },
    alert: {
      duration: null,
      threshold: null
    }
  }
}

export const AlertsProvider: FunctionComponent<{
  children: ComponentChildren
}> = ({ children }) => {
  const [alertsConfig, setAlertsConfig] = usePersistState<AlertsConfig>(
    defaultConfig,
    'ALERTS_CONFIG',
    (prevConfig) => ({
      ...defaultConfig,
      ...prevConfig
    })
  )
  const [alerts, setAlerts] = usePersistState<Alerts>({}, 'ALERTS')
  useMonitorAlerts(alertsConfig, setAlerts)
  return (
    <AlertsContext.Provider value={{ alerts, alertsConfig, setAlertsConfig }}>
      {children}
    </AlertsContext.Provider>
  )
}

export const useAlerts = (): AlertsContextType => useContext(AlertsContext)
