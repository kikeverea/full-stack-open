import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import { setLoggedInUser } from './loggedInUserReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLoginResult(state, action) {
      return action.payload
    }
  }
})

export const logInUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login(username, password)

    if (user) {
      userService.saveUserInLocal(user)
      dispatch(setLoggedInUser(user))
      dispatch(setLoginResult('success'))
    }
    else {
      dispatch(setLoginResult('fail'))
    }
  }
}

export const consumeLoginResult = () => {
  return dispatch => {
    dispatch(setLoginResult(null))
  }
}

export const { setLoginResult } = loginSlice.actions
export default loginSlice.reducer