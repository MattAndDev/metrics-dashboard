import env from '@env'
if (env.BUNDLE_MODE === 'debug') require('preact/debug')
import { h, hydrate, render } from 'preact'
import { App } from './app'
import { Head } from './head'

// skip hydrating if HMR is enabled
const renderFunc = env.HMR_ENABLED ? render : hydrate

renderFunc(<App />, document.querySelector('#app')!)

renderFunc(<Head />, document.head)

if (module.hot) {
  module.hot.accept()
}

// register sw is HMR is not enabled, otherwise cleanup
if (!env.HMR_ENABLED && 'serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
  })
} else {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}
