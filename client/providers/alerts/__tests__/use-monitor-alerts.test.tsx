import { h } from 'preact'
import { render, act } from '@testing-library/preact'
import { useMonitorAlerts } from '../use-monitor-alters'
import { Metrics, useMetrics } from '../../metrics'
import { AlertsConfig, Alerts } from '@client/providers'
import { StateUpdater } from 'preact/hooks'

jest.mock('../../metrics', () => ({
  useMetrics: jest.fn()
}))

function setup(config: AlertsConfig, updater: StateUpdater<Alerts>) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useMonitorAlerts(config, updater))
    return null
  }
  render(<TestComponent />)
  return returnVal
}
export type MockMetric = ({ metrics }: { metrics: Metrics }) => void

// @ts-expect-error
const useMock = useMetrics.mockImplementation as (m: MockMetric) => void

test('Correctly warns when threshold is surpassed', async () => {
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.71
        },
        {
          timestamp: 2000,
          value: 0.71
        }
      ]
    }
  }))
  const up = jest.fn()
  setup(
    {
      cpu: {
        warn: {
          duration: 10,
          threshold: 0.5
        },
        alert: {
          duration: 10,
          threshold: 0.8
        }
      }
    },
    up
  )
  expect(up).toHaveBeenCalledWith({ cpu: 'warn' })
})

test('Correctly alerts when threshold is surpassed', async () => {
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.71
        },
        {
          timestamp: 2000,
          value: 0.71
        }
      ]
    }
  }))
  const up = jest.fn()
  setup(
    {
      cpu: {
        warn: {
          duration: 10,
          threshold: 0.5
        },
        alert: {
          duration: 10,
          threshold: 0.6
        }
      }
    },
    up
  )
  expect(up).toHaveBeenCalledWith({ cpu: 'alert' })
})

test('Correctly marks alert as "ok" when threshold are not surpassed', async () => {
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.1
        },
        {
          timestamp: 2000,
          value: 0.1
        }
      ]
    }
  }))
  const up = jest.fn()
  setup(
    {
      cpu: {
        warn: {
          duration: 10,
          threshold: 0.5
        },
        alert: {
          duration: 10,
          threshold: 0.6
        }
      }
    },
    up
  )
  expect(up).toHaveBeenCalledWith({ cpu: 'ok' })
})

test('Does not fire alert if duration is too short', async () => {
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.1
        },
        {
          timestamp: 2000,
          value: 0.1
        }
      ]
    }
  }))
  const up = jest.fn()
  setup(
    {
      cpu: {
        warn: {
          duration: 10000,
          threshold: 0.5
        },
        alert: {
          duration: 10000,
          threshold: 0.6
        }
      }
    },
    up
  )
  expect(up).toHaveBeenCalledWith({ cpu: 'ok' })
})

test('Does not setup any alert if config is empty', async () => {
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.1
        }
      ]
    }
  }))
  const up = jest.fn()
  setup({}, up)
  expect(up).toHaveBeenCalledWith({})
})

test('Does not setup any alert if config values are null', async () => {
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.1
        }
      ]
    }
  }))
  const up = jest.fn()
  setup(
    {
      cpu: {
        warn: {
          duration: null,
          threshold: null
        },
        alert: {
          duration: null,
          threshold: null
        }
      }
    },
    up
  )
  expect(up).toHaveBeenCalledWith({})
})

test('Does Alert even if warn is not set', async () => {
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.1
        },
        {
          timestamp: 2000,
          value: 0.1
        }
      ]
    }
  }))
  const up = jest.fn()
  setup(
    {
      cpu: {
        warn: {
          duration: null,
          threshold: null
        },
        alert: {
          duration: 10,
          threshold: 0.05
        }
      }
    },
    up
  )
  expect(up).toHaveBeenCalledWith({ cpu: 'alert' })
})

test('Does return to ok', async () => {
  const config = {
    cpu: {
      warn: {
        duration: null,
        threshold: null
      },
      alert: {
        duration: 10,
        threshold: 0.05
      }
    }
  }
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.1
        },
        {
          timestamp: 2000,
          value: 0.1
        }
      ]
    }
  }))
  const up = jest.fn()
  setup(config, up)
  expect(up).toHaveBeenLastCalledWith({ cpu: 'alert' })
  useMock(() => ({
    metrics: {
      cpu: [
        {
          timestamp: 1000,
          value: 0.1
        },
        {
          timestamp: 2000,
          value: 0.1
        },
        {
          timestamp: 3000,
          value: 0.005
        },
        {
          timestamp: 4000,
          value: 0.005
        }
      ]
    }
  }))
  setup(config, up)
  expect(up).toHaveBeenLastCalledWith({ cpu: 'ok' })
})
