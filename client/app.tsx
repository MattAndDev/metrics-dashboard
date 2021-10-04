import { h, FunctionalComponent, Fragment } from 'preact'
import Router, { RouterProps } from 'preact-router'
import { Suspense } from 'preact/compat'
import { routesConfig, RouteId, routesComponents } from '@client/routes'

import './styles/variables.css'
import './styles/global.css'

export const App: FunctionalComponent<RouterProps> = (props: RouterProps) => {
  return (
    <Router {...props}>
      {Object.values(RouteId).map((key: RouteId) => {
        const Component = routesComponents[key]
        return (
          <Fragment path={routesConfig[key].path} key={key}>
            <Suspense fallback="">
              <Component />
            </Suspense>
          </Fragment>
        )
      })}
    </Router>
  )
}
