import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const showNotification = (notification, duration) => {
  return async dispatch => {
    dispatch(setNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer