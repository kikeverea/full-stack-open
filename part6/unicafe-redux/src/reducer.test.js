import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const testAction = (action, expectedState) => {
    const state = initialState
    deepFreeze(state)

    const newState = counterReducer(state, action)
    expect(newState).toEqual(expectedState)
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    testAction(
      { type: 'GOOD' },
      {
        good: 1,
        ok: 0,
        bad: 0
      })
  })

  test('ok is incremented', () => {
    testAction(
      { type: 'OK' },
      {
        good: 0,
        ok: 1,
        bad: 0
      })
  })

  test('bad is incremented', () => {
    testAction(
      { type: 'BAD' },
      {
        good: 0,
        ok: 0,
        bad: 1
      })
  })

  test('zero resets feedbacks to "0"', () => {
    testAction(
      { type: 'ZERO' },
      {
        good: 0,
        ok: 0,
        bad: 0
      })
  })

  test('invalid action returns current state', () => {
    testAction(
      { type: 'INVALID' },
      initialState)
  })
})