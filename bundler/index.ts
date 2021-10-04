import { hmrServer } from './hmr-server'
import { devServer } from './dev-server'
import webpack from 'webpack'
import serverDebugConf from './configs/server.debug'
import serverProdConf from './configs/server.prod'
import clientDebugConf from './configs/client.debug'
import clientProdConf from './configs/client.prod'
import nodemon from 'nodemon'
import env from '@env'

// pick configs
const serverConf =
  env.BUNDLE_MODE === 'debug' ? serverDebugConf : serverProdConf

const clientConf =
  env.BUNDLE_MODE === 'debug' ? clientDebugConf : clientProdConf

let localDevServer: typeof nodemon

// bundle server
webpack({ ...serverConf, watch: !!env.WATCH }, (err, stats) => {
  if (!!env.DEV_SERVER && !localDevServer) {
    localDevServer = devServer()
  }
  if (err || (stats?.hasErrors() && !env.WATCH)) {
    err && console.error(err)
    stats?.hasErrors() && console.error(stats?.compilation.errors)
  }
})

// bundle | serve client code
if (env.HMR_ENABLED) {
  hmrServer(true, !!env.WATCH)
} else {
  webpack({ ...clientConf, watch: !!env.WATCH }, (err, stats) => {
    if (err || stats?.hasErrors()) {
      const error = err || stats?.compilation.errors
      console.error(error)
    }
  })
}
