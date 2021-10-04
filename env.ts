type Env = {
  NODE_ENV: 'development' | 'production'
  BUNDLE_MODE: 'debug' | 'production'
  SERVER_PORT: string
  BODY_ASSETS: string
  HMR_ENABLED: boolean
  DEV_SERVER: boolean
  WATCH: boolean
  OUT_DIR: string
  SCRIPTS: string
  STYLES: string
}

const env: Env = {
  NODE_ENV: (process.env.NODE_ENV as Env['NODE_ENV']) || 'production',
  SERVER_PORT: process.env.SERVER_PORT as string,
  HMR_ENABLED: process.env.HMR_ENABLED === 'true',
  DEV_SERVER: process.env.DEV_SERVER === 'true',
  WATCH: process.env.WATCH === 'true',
  BUNDLE_MODE: process.env.BUNDLE_MODE as Env['BUNDLE_MODE'],
  BODY_ASSETS: process.env.BODY_ASSETS || '',
  OUT_DIR: process.env.OUT_DIR || './app',
  STYLES:
    process.env.HMR_ENABLED !== 'true'
      ? '<link href="/css/styles.css" rel="stylesheet">'
      : '',
  SCRIPTS: `
    <script type="text/javascript" src="${
      process.env.HMR_ENABLED === 'true' ? 'http://localhost:4141' : ''
    }/js/lib.js"></script>
    <script type="text/javascript" src="${
      process.env.HMR_ENABLED === 'true' ? 'http://localhost:4141' : ''
    }/js/app.js"></script>
    `
}

export default env
