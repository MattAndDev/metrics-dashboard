import { h, FunctionalComponent } from 'preact'
import { MetricsType, useI18n, useMetrics } from '@client/providers'
import { useState } from 'preact/hooks'
import cn from 'classnames'
import styles from './chart.css'

export type ChartProps = {
  metric: MetricsType
}

const mapPos = (
  [a, b, c]: [number, number, number],
  [x, y]: [number, number]
) => {
  return ((c - a) / (b - a)) * (y - x) + x
}
export const Chart: FunctionalComponent<ChartProps> = ({ metric }) => {
  const { metrics, config } = useMetrics()
  const { currentLocale } = useI18n()
  const HEIGHT = 90
  const WIDTH = 160
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null)
  const { totalTime, sampleTime } = config[metric]
  const data = metrics[metric]
  if (data.length <= 1) {
    return (
      <div className={styles.loading}>
        <p className={styles.loadingText}>Data is loading</p>
      </div>
    )
  }
  const ticks = new Array(Math.ceil(totalTime / sampleTime))
    .fill(null)
    .map((_, i) => data[0].timestamp + i * sampleTime + sampleTime / 2)
  return (
    <svg style={{ width: '100%' }} viewBox="0 0 160 100">
      {data.map(({ timestamp, value }, index) => {
        const x = mapPos(
          [
            data[0].timestamp,
            data[0].timestamp + totalTime,
            timestamp + sampleTime / 2
          ],
          [0, WIDTH]
        )
        const y = mapPos([0, 1, value], [HEIGHT, 0])
        const moreThenHalfX = x > WIDTH / 2
        const moreThenHalfY = y > HEIGHT / 2
        return (
          <g key={timestamp} className={styles.info}>
            <rect
              x={x - WIDTH / ticks.length / 2}
              y={0}
              width={WIDTH / ticks.length}
              height={HEIGHT}
              className={styles.rect}
              onMouseEnter={() => setHighlightIndex(index)}
              onMouseLeave={() => setHighlightIndex(null)}
            ></rect>
            {highlightIndex === index && (
              <>
                <rect
                  x={0}
                  y={0}
                  width={160}
                  height={HEIGHT}
                  className={styles.rectBg}
                  pointerEvents="none"
                ></rect>
                <text
                  x={moreThenHalfX ? x - 1 : x + 1}
                  y={
                    mapPos([0, 1, value], [HEIGHT, 0]) +
                    (moreThenHalfY ? -5 : 5)
                  }
                  className={styles.infoText}
                  textAnchor={x > WIDTH / 2 ? 'end' : 'start'}
                  pointerEvents="none"
                >
                  <tspan x={moreThenHalfX ? x - 3 : x + 3} dy="-0.5em">
                    {new Intl.DateTimeFormat(currentLocale, {
                      hour: '2-digit',
                      hour12: false,
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(
                      new Date(
                        timestamp +
                          new Date().getTimezoneOffset() * 60 * 1000 * -1
                      )
                    )}
                  </tspan>
                  <tspan x={x > WIDTH / 2 ? x - 3 : x + 3} dy="1.2em">
                    {Math.round((value + Number.EPSILON) * 10000) / 10000}
                  </tspan>
                </text>
                <circle
                  className={styles.circle}
                  key={timestamp}
                  cx={x}
                  cy={y}
                  r={1}
                  pointerEvents="none"
                ></circle>
              </>
            )}
          </g>
        )
      })}
      {data.map(({ timestamp, value }, index) => {
        if (!data[index + 1]) return null
        return (
          <line
            className={cn(styles.lineMetric, {
              [styles.lineMetricOpaque]: highlightIndex !== null
            })}
            key={timestamp}
            x1={mapPos(
              [
                data[0].timestamp,
                data[0].timestamp + totalTime,
                timestamp + sampleTime / 2
              ],
              [0, WIDTH]
            )}
            x2={mapPos(
              [
                data[0].timestamp,
                data[0].timestamp + totalTime,
                data[index + 1].timestamp + sampleTime / 2
              ],
              [0, WIDTH]
            )}
            y1={mapPos([0, 1, value], [HEIGHT, 0])}
            y2={mapPos([0, 1, data[index + 1].value], [HEIGHT, 0])}
            r={0.5}
          ></line>
        )
      })}
      {ticks.map((t) => (
        <line
          key={t}
          x1={mapPos(
            [data[0].timestamp, data[0].timestamp + totalTime, t],
            [0, WIDTH]
          )}
          y1={HEIGHT}
          x2={mapPos(
            [data[0].timestamp, data[0].timestamp + totalTime, t],
            [0, WIDTH]
          )}
          y2={HEIGHT + 2}
          stroke="black"
          strokeWidth={0.1}
        ></line>
      ))}
    </svg>
  )
}
