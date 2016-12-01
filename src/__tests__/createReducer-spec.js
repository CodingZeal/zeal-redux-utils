import createReducer from '../createReducer'

describe('createReducer', () => {
  const mockHandler = jest.fn()
  const initialState = { candy: 10 }
  const handlers = {
    ['ACTION_MATCH']: mockHandler
  }
  const reducer = createReducer(initialState, handlers)
  const state = reducer(undefined, { type: 'NULL_ACTION' })

  test('the reducer returns unchanged state with no match', () => {
    expect(reducer(state, { type: 'FOO' })).toEqual({ candy: 10 })
  })

  test('the reducer calls the matched hander with state', () => {
    const action = { type: 'ACTION_MATCH' }

    reducer(state, action)

    expect(mockHandler).toBeCalledWith(state, action)
  })
})
