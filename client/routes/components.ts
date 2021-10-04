import { FC, lazy } from 'preact/compat'
import { RouteId } from '../routes'

type RoutesComponents = {
  [key in RouteId]: FC<Record<string, never>>
}
const lazyProxy = <T>(p: () => Promise<{ default: FC<T> }>): FC<T> =>
  lazy(() => p())

export const routesComponents: RoutesComponents = {
  HOME: lazyProxy(() =>
    import('@client/views/home').then(({ Home }) => ({
      default: Home
    }))
  )
}
