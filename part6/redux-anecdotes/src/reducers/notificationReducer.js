import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: '', id: 0 },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return { content: '', id: 0 }
    }
  }
})

export const showNotification = (content, duration) => {
  return async (dispatch, getState) => {

    const notificationOnDisplay = getState().notification

    if (notificationOnDisplay) {
      clearTimeout(notificationOnDisplay.id)
    }

    const id = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)

    dispatch(setNotification({ content, id }))
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer