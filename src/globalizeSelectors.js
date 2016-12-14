import { adjust, curryN, length, map } from 'ramda'

/*
Take a local state transform and an object containing selector functions.

* The local state transform is a function that takes the global state and
  returns the appropriate sub-section of the state tree (aka local state).

* The selector functions are written to work with the local state.

Return a new object of selector functions.  The output selector functions now
work with the global state instead.

To do this, we map a `globalize` function over the selectors.

We assume that the state argument is always the last one, and we want to
transform it by applying the local state.  We use Ramda's `adjust` function
to do that.

The result of `globalize` is a function that takes the global state as its last
argument, transforms that state into local state, and then calls the original,
localized, selector.
*/

const globalize = transform => selector =>
  curryN(length(selector),
    (...args) => selector(...adjust(transform, -1, args))
  )

export default (localStateTransform, selectors) =>
  map(globalize(localStateTransform), selectors)
