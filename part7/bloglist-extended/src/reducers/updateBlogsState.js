import { createSlice } from '@reduxjs/toolkit'

const updateBlogsState = createSlice({
  name: 'updateBlogsState',
  initialState: null,
  reducers: {
    setUpdateState(state, action) {
      return action.payload
    },
    clearUpdateState() {
      return null
    }
  }
})

export const blogsUpdateSucceededMessage = (content) => {
  return dispatch => {
    dispatch(setUpdateState({ content, result: 'success' }))
  }
}

export const blogsUpdateFailedMessage = (content) => {
  return dispatch => {
    dispatch(setUpdateState({ content, result: 'fail' }))
  }
}

export const consumeUpdateState = () => {
  return dispatch => {
    dispatch(clearUpdateState())
  }
}

export const { setUpdateState, clearUpdateState } = updateBlogsState.actions
export default updateBlogsState.reducer