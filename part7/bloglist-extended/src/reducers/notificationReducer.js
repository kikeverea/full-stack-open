import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const showSuccessNotification = (content, duration) => {
  return showNotification(content, 'success', duration)
}

export const showFailNotification = (content, duration) => {
  return showNotification(content, 'fail', duration)
}

const showNotification = (content, type, duration = 5000) => {
  return (dispatch, getState) => {
    const notificationOnDisplay = getState().notification

    if (notificationOnDisplay) {
      clearTimeout(notificationOnDisplay.id)
    }

    const notificationId = setTimeout(() => {
      dispatch(clearNotification())
    },
    duration)

    dispatch(setNotification({ content, type, id: notificationId }))
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
