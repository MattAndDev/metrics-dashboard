import merge from 'webpack-merge'
import baseConf from './client.base'
import { Configuration } from 'webpack'

const conf: Configuration = {
  mode: 'production',
  devtool: false,
  stats: 'normal'
}

export default merge(baseConf, conf)
