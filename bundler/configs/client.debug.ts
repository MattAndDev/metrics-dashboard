import merge from 'webpack-merge'
import baseConf from './client.base'
import * as webpack from 'webpack'

const conf: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  stats: 'errors-warnings'
}

export default merge(baseConf, conf)
