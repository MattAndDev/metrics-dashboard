import { h, FunctionalComponent, Fragment } from 'preact'
import Router, { RouterProps } from 'preact-router'
import { routesConfig, RouteId } from '@client/routes'

export const Head: FunctionalComponent<RouterProps> = (props) => (
  <Fragment>
    <Router {...props}>
      {Object.values(RouteId).map((key: RouteId) => (
        <Fragment key={RouteId} path={routesConfig[key].path}>
          <title>{routesConfig[key].head.title}</title>
        </Fragment>
      ))}
    </Router>
    <link rel="manifest" href="/static/manifest.json" />
  </Fragment>
)
