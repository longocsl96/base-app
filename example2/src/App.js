import 'base-app/dist/index.css'
import React, { lazy, Suspense, useEffect } from 'react'

import { HttpClient, FallbackSpinner } from 'base-app'
import navigationConfig from './navigationConfig'
import emails from './redux/reducers/calendar/index'

import { createBrowserHistory } from 'history'
export let history = createBrowserHistory({ basename: '' })

const App = () => {
  const message = {
    en: {},
    vi: {}
  }

  const BaseApp = lazy(() => import('./BasePage'))

  return (
    <Suspense fallback={<FallbackSpinner />}>
      <BaseApp
        history={history}
        appReducer={emails}
        message={message}
        navigationConfig={navigationConfig}
      >
        App 1
      </BaseApp>
    </Suspense>
  )
}

export default App
