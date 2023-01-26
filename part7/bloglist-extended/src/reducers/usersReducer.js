import { createSlice } from '@reduxjs/toolkit'
import repositoryActions from './repositoryReducerActions'

import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: repositoryActions()
})

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.fetchAllUsers()
    dispatch(setAll(users))
  }
}

export const editUser = (updatedUser) => {
  return async dispatch => {
    const updated = await usersService.updateUser(updatedUser)

    if (updated)
      dispatch(update(updatedUser))
  }
}

export const { setAll, add, update, remove } = usersSlice.actions
export default usersSlice.reducer