import 'base-app/dist/index.css'
import React, { lazy, Suspense, useEffect } from 'react'

import { HttpClient, FallbackSpinner, FormattedMessage, useWindowDimensions } from 'base-app'
import navigationConfig from './navigationConfig'
import emails from './redux/reducers/calendar/index'

import { createBrowserHistory } from 'history'
export let history = createBrowserHistory({ basename: '' })

const App = () => {

  const {width , height} = useWindowDimensions()

  const message = {
    en: {
      AppName: 'Home Page'
    },
    vi: {
      AppName: 'Trang chủ'
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  const fetchApi = async () => {
    const res = await HttpClient.get(
      'https://jsonplaceholder.typicode.com/photos'
    )
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
        <FormattedMessage id={'AppName'} />
      </BaseApp>
    </Suspense>
  )
}

export default App
