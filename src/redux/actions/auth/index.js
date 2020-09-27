import { API_R_200 } from '../../../configs/app-configs'
import { history } from '../../../history'
import { AuthService } from '../../../services/authService'

export const LOGIN_ACTION = 'LOGIN_ACTION'
export const LOOUT_ACTION = 'LOGOUT_ACTION'

export const checkLoginStatus = (code) => {
  return async (dispatch) => {
    if (!code) {
      return
    }
    try {
      const respone = await AuthService.checkLoginByToken(code)
      if (respone.status === API_R_200) {
        dispatch({ type: LOGIN_ACTION, payload: respone.data })
      } else {
        dispatch({ type: LOOUT_ACTION })
      }
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
}

export const loginAction = (user) => {
  return async (dispatch) => {
    try {
      const respone = await AuthService.login(user)
      if (respone.status === API_R_200) {
        dispatch({ type: LOGIN_ACTION, payload: respone.data })
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const logoutAction = (user) => {
  return async (dispatch) => {
    try {
      const respone = await AuthService.logout(user)
      if (respone.status === API_R_200) {
        dispatch({ type: LOOUT_ACTION })
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
