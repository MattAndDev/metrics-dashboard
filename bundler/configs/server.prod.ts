import merge from 'webpack-merge'
import baseConf from './server.base'

import { Configuration } from 'webpack'

const conf: Configuration = {
  mode: 'production',
  stats: 'normal'
}

export default merge(baseConf, conf)
