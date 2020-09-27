import { combineReducers } from 'redux'
import customizer from './customizer/customizer'
import auth from './auth/'
import navbar from './navbar/'
import { persistReducer } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

const rootReducer = (appReducer) =>
  combineReducers({
    customizer,
    auth: persistReducer(
      {
        storage: new CookieStorage(Cookies),
        key: 'root'
      },
      auth
    ),
    navbar,
    app: appReducer
  })

export default rootReducer
