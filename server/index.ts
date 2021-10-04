import { resolve } from 'path'
import express, { Request } from 'express'
import { renderView } from './renderer'
import env from '@env'
import compression from 'compression'
import { routesConfig } from '@client/routes'
import { cpuLoadAverage } from './service/cpu-load-average'
import { memoryLoadAverage } from './service/memory-load-average'
import { utcMsTimestamp } from './service/utc-ms-timestamp'
const app = express()
app.use(compression())

// mount static
app.use(express.static(resolve(env.OUT_DIR, 'client')))

// router routes
const routes = Object.values(routesConfig)
routes.forEach(({ path }) => {
  app.get(path, async (req, res) => {
    const view = await renderView(req)
    return res.send(view)
  })
})

app.get(
  '/cpu-load-avg',
  async (req: Request<any, any, null, { interval: number }>, res) => {
    const average = await cpuLoadAverage(req.query.interval)
    return res.send({
      average,
      timestamp: utcMsTimestamp()
    })
  }
)
app.get(
  '/memory-avg',
  async (req: Request<any, any, null, { interval: number }>, res) => {
    const average = await memoryLoadAverage(req.query.interval)
    return res.send({
      average: average,
      timestamp: utcMsTimestamp()
    })
  }
)

// inspection routes
// eslint-disable-next-line no-console
app.listen(env.SERVER_PORT, () =>
  console.log(`Ssr server started on port: ${env.SERVER_PORT}!`)
)
