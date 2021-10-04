import { MetricsType, useI18n, useMetrics } from '@client/providers'
import { Input, Fieldset, Button } from '@client/ui'
import { h, FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'

export const MetricForm: FunctionalComponent<{ metric: MetricsType }> = ({
  metric
}) => {
  const { config, configure } = useMetrics()
  const { trans } = useI18n()
  const [localConfig, setLocalConfig] = useState(config)
  const metricConfig = localConfig[metric]
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        configure(localConfig)
      }}
    >
      <Fieldset legend={trans[`form.legend.${metric}.metrics`]}>
        {Object.entries(metricConfig).map(([key, val]) => (
          <Input
            key={`${metric}-${key}`}
            id={`${metric}-${key}`}
            label={
              trans[
                `label.${metric}.metric.${key as 'totalTime' | 'sampleTime'}`
              ]
            }
            inputProps={{
              type: 'number',
              step: '1',
              value: val,
              min: 0,
              onChange: (e) => {
                const value = parseInt(
                  (e.target as HTMLInputElement).value || '0',
                  10
                )
                setLocalConfig({
                  ...localConfig,
                  [metric]: {
                    ...metricConfig,
                    [key]: value
                  }
                })
              }
            }}
          />
        ))}
        <div>
          {(metricConfig.sampleTime !== config[metric].sampleTime ||
            metricConfig.totalTime !== config[metric].totalTime) && (
            <Button type="submit">{trans['label.metrics.restart']}</Button>
          )}
        </div>
      </Fieldset>
    </form>
  )
}
