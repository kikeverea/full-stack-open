import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import updateBlogsState from './reducers/updateBlogsState'

import loggedInUser from './reducers/loggedInUserReducer'
import login from './reducers/loginReducer'

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    updateBlogsState: updateBlogsState,
    loggedInUser: loggedInUser,
    login: login
  }
})

export default store