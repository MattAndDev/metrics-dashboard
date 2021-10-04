import { MetricsType, useI18n } from '@client/providers'
import { h, FunctionalComponent } from 'preact'
import { AlertForm, MetricForm, Monitor, Chart } from '@client/components'
import { Heading } from '@client/ui'

export const Dashboard: FunctionalComponent<{ metric: MetricsType }> = ({
  metric
}) => {
  const { trans } = useI18n()
  return (
    <div>
      <Heading level="2">{trans[`dashboard.${metric}.title`]}</Heading>
      <AlertForm metric={metric} />
      <MetricForm metric={metric} />
      <Chart metric={metric} />
      <Monitor metric={metric} />
    </div>
  )
}
