import Axios from 'axios'
import React from 'react'
import { AlertTriangle } from 'react-feather'
import { toast } from 'react-toastify'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

const HttpClient = Axios.create({
  timeout: 5000,
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(Axios.defaults.adapter, { threshold: 15 * 60 * 1000 })
  )
})

const errorMessage = (message) => {
  return (
    <div className='d-flex align-items-center'>
      <AlertTriangle /> <span className='ml-1'>{message}</span>
    </div>
  )
}

export const setUpHttpClient = (store) => {
  HttpClient.interceptors.request.use((config) => {
    store.dispatch({ type: 'SHOW_LOADING_BAR' })
    return config
  })

  HttpClient.interceptors.response.use(
    (response) => {
      store.dispatch({ type: 'HIDE_LOADING_BAR' })
      return response
    },
    (e) => {
      store.dispatch({ type: 'HIDE_LOADING_BAR' })
      switch (e.response.status) {
        case 404:
          toast.error(errorMessage('API Not Found !'))
          break
        case 400:
          toast.error(errorMessage('Bad Request !'))
          break
        case 408:
          toast.error(errorMessage('Request Timeout !'))
          break
        case 500:
          toast.error(errorMessage('Server error !'))
          break
        default:
          return e.response
      }
    }
  )
}

export default HttpClient
