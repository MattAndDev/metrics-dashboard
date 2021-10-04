import nodemon from 'nodemon'
import { resolve } from 'path'
import env from '@env'

export const devServer = (): typeof nodemon =>
  nodemon({
    script: resolve(
      `${process.cwd()}`,
      String(env.OUT_DIR),
      'server/js/index.js'
    ),
    ext: 'js,jsx,ts,tsx,css,json',
    quiet: true
  })
