import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createDebounce from 'redux-debounced'
import thunk from 'redux-thunk'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { setUpHttpClient } from './utility/HttpClient'
import { ToastContainer } from 'react-toastify'
import rootReducer from './redux/reducers/rootReducer'
import AppRouter from './layouts/AppRouter'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import './index.scss'
import 'react-toastify/dist/ReactToastify.css'
import LoadingSpinner from './components/Loading-spinner'

const App = ({ children, navigationConfig, appReducer, message }) => {
  const middlewares = [thunk, createDebounce()]
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    rootReducer(appReducer),
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  )

  const persistor = persistStore(store)

  setUpHttpClient(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingSpinner />
        <AppRouter
          message={message}
          navigationConfig={navigationConfig}
          children={children}
        />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  )
}

export default App
