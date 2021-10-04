import merge from 'webpack-merge'
import baseConf from './server.base'
import { Configuration } from 'webpack'

const conf: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  stats: 'errors-warnings'
}

export default merge(baseConf, conf)
