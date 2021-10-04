import { h, FunctionalComponent, Fragment } from 'preact'
import { MetricsType, useAlerts, useI18n } from '@client/providers'
import { Input, Fieldset } from '@client/ui'

export const AlertForm: FunctionalComponent<{ metric: MetricsType }> = ({
  metric
}) => {
  const { alertsConfig, setAlertsConfig } = useAlerts()
  const { trans } = useI18n()
  const config = alertsConfig[metric]
  if (!config) return null
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Fieldset legend={trans[`form.legend.${metric}.monitors`]}>
        {Object.entries(config).map(([key, { duration, threshold }]) => (
          <Fragment key={key}>
            <Input
              id={`${metric}-${key}`}
              label={
                trans[`label.${metric}.${key as 'alert' | 'warn'}.threshold`]
              }
              inputProps={{
                type: 'number',
                step: 0.0001,
                value: threshold === null ? '' : threshold,
                max: 1,
                min: 0,
                onChange: (e) => {
                  // skip parsing 0.0+
                  if ((e.target as HTMLInputElement).value.match(/0\.0+$/))
                    return
                  setAlertsConfig({
                    ...alertsConfig,
                    [metric]: {
                      ...config,
                      [key]: {
                        duration,
                        threshold: parseFloat(
                          (e.target as HTMLInputElement).value
                        )
                      }
                    }
                  })
                }
              }}
            />
            <Input
              id={`${metric}-${key}`}
              label={
                trans[`label.${metric}.${key as 'alert' | 'warn'}.timeWindow`]
              }
              inputProps={{
                type: 'number',
                step: '1',
                value: duration === null ? '' : duration,
                min: 0,
                onChange: (e) =>
                  setAlertsConfig({
                    ...alertsConfig,
                    [metric]: {
                      ...config,
                      [key]: {
                        threshold,
                        duration: parseInt(
                          (e.target as HTMLInputElement).value || '0',
                          10
                        )
                      }
                    }
                  })
              }}
            />
          </Fragment>
        ))}
      </Fieldset>
    </form>
  )
}
