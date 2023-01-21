import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    }
  }
})

export const checkForLoggedInUser = () => {
  return dispatch => {
    const loggedInUser = userService.getUserFromLocal()

    if (loggedInUser)
      dispatch(setUser(loggedInUser))
  }
}

export const setLoggedInUser = user =>
  dispatch => dispatch(setUser(user))

export const logoutUser = () => {
  return dispatch => {
    userService.removeUserFromLocal()
    dispatch(removeUser())
  }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer