import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import updateBlogsState from './reducers/updateBlogsState'
<<<<<<< HEAD
=======
import loggedInUser from './reducers/loggedInUserReducer'
import login from './reducers/loginReducer'

>>>>>>> part7
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
<<<<<<< HEAD
    updateBlogsState: updateBlogsState
=======
    updateBlogsState: updateBlogsState,
    loggedInUser: loggedInUser,
    login: login
>>>>>>> part7
  }
})

export default store