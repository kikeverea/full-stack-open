import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import updateBlogsState from './reducers/updateBlogsState'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    updateBlogsState: updateBlogsState
  }
})

export default store