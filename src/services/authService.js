import { API_LOGIN_URL, API_LOGOUT_URL } from '../configs/app-configs'
import HttpClient from '../utility/HttpClient'

export class AuthService {
  static login = (user) => {
    return HttpClient.post(API_LOGIN_URL, user)
  }

  static logout = (user) => {
    return HttpClient.post(API_LOGOUT_URL, user)
  }

  static checkLoginByToken = (authToken) => {
    return HttpClient.post(API_LOGIN_URL, authToken)
  }
}
