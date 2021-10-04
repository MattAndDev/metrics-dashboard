export type I18nLocale = 'en'

export type I18nKeys =
  | 'dashboard.cpu.title'
  | 'dashboard.memory.title'
  | 'form.legend.cpu.monitors'
  | 'form.legend.cpu.metrics'
  | 'form.legend.memory.monitors'
  | 'form.legend.memory.metrics'
  | 'label.cpu.warn.threshold'
  | 'label.cpu.warn.timeWindow'
  | 'label.cpu.alert.threshold'
  | 'label.cpu.alert.timeWindow'
  | 'label.memory.warn.threshold'
  | 'label.memory.warn.timeWindow'
  | 'label.memory.alert.threshold'
  | 'label.memory.alert.timeWindow'
  | 'label.cpu.metric.sampleTime'
  | 'label.cpu.metric.totalTime'
  | 'label.memory.metric.sampleTime'
  | 'label.memory.metric.totalTime'
  | 'label.monitor.ok'
  | 'label.monitor.warn'
  | 'label.monitor.alert'
  | 'label.monitor.no-data'
  | 'label.monitor.no-monitor'
  | 'alert.ok'
  | 'alert.warn'
  | 'alert.alert'
  | 'monitor.label'
  | 'label.metrics.restart'

export type I18nContextType = {
  trans: {
    [key in I18nKeys]: string
  }
  locales: I18nLocale[]
  currentLocale: I18nLocale
}
