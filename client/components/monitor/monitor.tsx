import { h, FunctionalComponent } from 'preact'
import { AlertStatus, MetricsType, useAlerts, useI18n } from '@client/providers'
import { Tag, TagProps } from '@client/ui'
import { useEffect, useRef } from 'preact/hooks'

export const Monitor: FunctionalComponent<{ metric: MetricsType }> = ({
  metric
}) => {
  const appearance: { [key in AlertStatus]: TagProps['appearance'] } = {
    ok: 'success',
    alert: 'fail',
    warn: 'warn',
    'no-data': 'plain'
  }
  const { alerts } = useAlerts()
  const { trans } = useI18n()
  const monitorRef = useRef<AlertStatus>()
  useEffect(() => {
    monitorRef.current = alerts[metric]
  }, [alerts])
  const status = alerts[metric]
  return (
    <div>
      {status && (
        <Tag appearance={appearance[status]}>
          {trans[`label.monitor.${status}`]}
        </Tag>
      )}
      {!status && (
        <Tag appearance="plain">{trans[`label.monitor.no-monitor`]}</Tag>
      )}
    </div>
  )
}
