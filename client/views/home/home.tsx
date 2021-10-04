import { h, FunctionalComponent } from 'preact'
import {
  AlertsProvider,
  MetricsProvider,
  I18nProvider
} from '@client/providers'
import { Dashboard } from '@client/components'
import { Grid, GridItem } from '@client/ui'

export const Home: FunctionalComponent = () => {
  return (
    <main>
      <I18nProvider>
        <MetricsProvider>
          <AlertsProvider>
            <Grid>
              <GridItem>
                <Dashboard metric="cpu" />
              </GridItem>
              <GridItem>
                <Dashboard metric="memory" />
              </GridItem>
            </Grid>
          </AlertsProvider>
        </MetricsProvider>
      </I18nProvider>
    </main>
  )
}
