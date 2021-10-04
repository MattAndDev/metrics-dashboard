import { h } from 'preact'
import { template } from './template'
import { Head } from '../client/head'
import { App } from '../client/app'
import { render } from 'preact-render-to-string'
import { Request } from 'express'
import prePass from 'preact-ssr-prepass'

export const renderView = (req: Request): Promise<string> => {
  return new Promise((resolve) => {
    const head = render(<Head url={req.url} />, { pretty: true })
    prePass(<App url={req.url} />).then(() => {
      resolve(template(head, render(<App url={req.url} />, { pretty: true })))
    })
  })
}
