import { createSlice } from '@reduxjs/toolkit'
import repositoryActions from './repositoryReducerActions'

import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: repositoryActions()
})

const sortByBlogsAmount = users =>
  users.sort((user1, user2) => user2.blogs.length - user1.blogs.length)

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.fetchAllUsers()
    sortByBlogsAmount(users)
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