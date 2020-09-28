import { combineReducers } from 'redux'
import customizer from './customizer/customizer'
import auth from './auth/'
import navbar from './navbar/'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'

const rootReducer = (appReducer) =>
  combineReducers({
    customizer,
    auth: persistReducer(
      {
        storage: sessionStorage,
        key: 'root'
      },
      auth
    ),
    navbar,
    app: appReducer
  })

export default rootReducer
