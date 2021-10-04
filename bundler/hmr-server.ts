import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import CONF from './configs/client.debug'
import * as express from 'express'
import cors from 'cors'

export const hmrServer = (hmr = false, watch = false): void => {
  const compiler = webpack({ ...CONF, watch: !!watch }, () => {})
  const app = express.default()
  app.use(cors())
  app.use(
    middleware(compiler, {
      stats: CONF.stats,
      publicPath: (CONF.output as any).publicPath
    })
  )
  if (hmr) {
    app.use(
      require('webpack-hot-middleware')(compiler, {
        stats: 'none',
        path: '/__webpack_hmr'
      })
    )
  }

  app.listen(4141)
}

export default hmrServer
