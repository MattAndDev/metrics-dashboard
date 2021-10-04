/// <reference no-default-lib="true"/>
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope

import { precacheAndRoute } from 'workbox-precaching'
import { version } from '../package.json'
// ensure to not load any tsx or css otherwise webpack child compiler will break
import { routesConfig } from '@client/routes/config'

const routes = Object.values(routesConfig)

// pre-cache all webpack assets
precacheAndRoute(
  (self as any).__WB_MANIFEST.concat(
    routes.map(({ path }) => ({
      url: path,
      revision: version
    }))
  )
)

self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})
