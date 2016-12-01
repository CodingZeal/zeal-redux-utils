import { prop } from 'ramda'

import globalizeSelectors from '../globalizeSelectors'

describe('globalizeSelectors', () => {
  const globalState = {
    section: {
      numbers: [2, 3, 4]
    }
  }

  const localState = prop('section')

  const selectors = {
    numbers: prop('numbers'),
    numberAt: (index, state) => state.numbers[index]
  }

  const globalized = globalizeSelectors(localState, selectors)

  context('with a single-argument selector', () => {
    test('allows the selector to work from the global state', () => {
      expect(globalized.numbers(globalState)).toEqual([2, 3, 4])
    })
  })

  context('with a multi-argument selector', () => {
    test('allows the selector to work from the global state', () => {
      expect(globalized.numberAt(1, globalState)).toEqual(3)
    })
  })
})
