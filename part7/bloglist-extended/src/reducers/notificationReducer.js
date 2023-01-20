import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log('setting notification: ', action.payload)
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const showNotification = (content, type, duration = 5000) => {
  console.log('called')
  return (dispatch, getState) => {
    const notificationOnDisplay = getState().notification

    if (notificationOnDisplay) {
      console.log('another notification is on display')
      clearTimeout(notificationOnDisplay.id)
    }

    const notificationId = setTimeout(() => {
      dispatch(clearNotification())
    },
    duration)

    console.log('dispatching')
    dispatch(setNotification({ content, type, id: notificationId }))
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
