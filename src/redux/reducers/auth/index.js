import { LOGIN_ACTION, LOOUT_ACTION } from '../../actions/auth'

const authInitialState = {
  authToken: '',
  username: '',
  name: '',
  role: ''
}

export const authReducers = (state = { ...authInitialState }, action) => {
  switch (action.type) {
    case LOGIN_ACTION: {
      return { ...state, ...action.payload }
    }
    case LOOUT_ACTION: {
      return { ...authInitialState }
    }
    default:
      return state
  }
}

export default authReducers
