export type Route = {
  path: string
  head: {
    title: string
  }
}

export enum RouteId {
  HOME = 'HOME'
}

type RoutesConfig = {
  [key in RouteId]: Route
}

const HOME: Route = {
  path: '/',
  head: {
    title: 'Dashboard'
  }
}

export const routesConfig: RoutesConfig = { HOME }
