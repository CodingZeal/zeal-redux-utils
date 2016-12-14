import { curry, prop } from 'ramda'

import globalizeSelectors from '../globalizeSelectors'

describe('globalizeSelectors', () => {
  const globalState = {
    section: {
      numbers: [2, 3, 4]
    }
  }
  const localState = prop('section')
  const numbers = prop('numbers')
  const numberAt = (index, state) => state.numbers[index]
  const globalized = globalizeSelectors(localState, {
    numbers,
    numberAt,
    curriedNumberAt: curry(numberAt)
  })

  context('with a single-argument selector', () => {
    it('allows the selector to work from the global state', () => {
      expect(globalized.numbers(globalState)).toEqual([2, 3, 4])
    })
  })

  context('with a multi-argument selector', () => {
    it('allows the selector to work from the global state', () => {
      expect(globalized.numberAt(1, globalState)).toBe(3)
    })
  })

  context('with a curried selector', () => {
    it('allows the selector to work from the global state', () => {
      expect(globalized.curriedNumberAt(2, globalState)).toBe(4)
    })

    it('can be called in a curried fashion', () => {
      expect(globalized.curriedNumberAt(2)(globalState)).toBe(4)
    })
  })
})
