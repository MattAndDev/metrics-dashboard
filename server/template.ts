import env from '@env'

export const template = (head: string, app: string): string =>
  `
    <head>
      ${head}
      ${env.STYLES}
    </head>
    <body>
      <div id="app">${app}</div>
      ${env.SCRIPTS}
    </body>
  `
