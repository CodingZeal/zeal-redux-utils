# zeal-redux-utils

Utility functions for working with Redux

[![npm version](https://img.shields.io/npm/v/zeal-redux-utils.svg)](https://www.npmjs.com/package/zeal-redux-utils)
[![CircleCI](https://circleci.com/gh/CodingZeal/zeal-redux-utils.svg?style=shield&circle-token=5a1df123336a821e7cb7e8b94350e41c1e7e07da)](https://circleci.com/gh/CodingZeal/zeal-redux-utils)

## Installation

```
npm install --save zeal-redux-utils
```

## Usage

zeal-redux-utils provides a number of utility functions that are useful in [Redux](http://redux.js.org/) applications, especially those that use a [modular or domain-style structure](https://jaysoo.ca/2016/02/28/organizing-redux-application/).

* [createActionTypes](#createActionTypes)
* [createReducer](#createReducer)
* [globalizeSelectors](#globalizeSelectors)

### createActionTypes

While not required, most Redux applications define constants for the action types in the project:

```js
const ADD_TODO = 'ADD_TODO'
```

In a modular project structure, there is a chance that actions defined in different modules could collide in a global namespace.  As well, the repetition of the action name as both the constant name and the value is somewhat tedious.

`createActionTypes` solves both of these problems.  It takes a namespace and a list of action type strings and produces an object whose keys are the action type constants and whose values combine the namespace and action name.

```js
// In modules/todos/constants/ActionType.js
import { createActionTypes } from 'zeal-redux-utils'

export default createActionTypes('todos', [
  'ADD_TODO',
  'REMOVE_TODO',
  'TOGGLE_TODO'
])

// In modules/todos/actions.js
import ActionType from './constants/ActionType'

export function addTodo(text) {
  return {
    type: ActionType.ADD_TODO,
    payload: text
  }
}

// ...etc...
```

The actual export will end up looking like the following (though the actual format of the string value is an implementation detail):

```js
{
  ADD_TODO: '~todos/ADD_TODO',
  REMOVE_TODO: '~todos/REMOVE_TODO',
  TOGGLE_TODO: '~todos/TOGGLE_TODO'
}
```

### createReducer

`createReducer` is an implementation of the approach described in the [Reducing Boilerplate](http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-reducers) section of the Redux docs.

It generates a reducer function by taking the initial state and an object containing handler functions.  Rather than hand-writing a `switch` statement, `createReducer` looks up the action type in the handler object and applies the function found there.  If no function is found, the state is returned unchanged.

```js
import { createReducer } from 'zeal-redux-utils'

export const createReducer([], {
  [ActionType.ADD_TODO]: (state, { payload }) => [state, ...payload],
  // ...
})
```

In development mode, `createReducer` verifies that all dispatched actions conform to the [flux-standard-action](https://github.com/acdlite/flux-standard-action) specification.  When an action is dispatched that does not conform, a `NonStandardAction` exception is raised, providing immediate notification of a problem.

This check is handy for catching the case where an action type is accidentally `null` or `undefined`, or when data is included directly rather than under a `payload` key.

**NOTE:** This check happens in development mode only; in production mode the check is not performed.

For projects that choose not to use the flux-standard-action spec, or that use a third-party library that doesn't conform, `createReducer` takes an optional whitelist function that specifies when to bypass the check for flux-standard-action conformance.

Example: Whitelisting actions from a library
```js
import { createReducer } from 'zeal-redux-utils'

function isApolloAction(action) {
  return /^APOLLO_/.test(action.type)
}

export const createReducer([], {
  [ActionType.ADD_TODO]: (state, { payload }) => [state, ...payload],
  // ...
}, {
  allowNonstandardActionIf: isApolloAction
})
```

Example: Disabling the FSA check entirely
```js
import { createReducer } from 'zeal-redux-utils'

export const createReducer([], {
  [ActionType.ADD_TODO]: (state, { payload }) => [state, ...payload],
  // ...
}, {
  allowNonstandardActionIf: () => true
})
```

In a modular Redux application, `createReducer` will be used several times.  In order to avoid duplicating the whitelist function everywhere, we recommend creating a local version of `createReducer` that applies the whitelist function, then using your local version of `createReducer` throughout your application.

```js
// In utils/createReducer.js

import { createReducer } from 'zeal-redux-utils'

function isApolloAction(action) {
  return /^APOLLO_/.test(action.type)
}

export default function(initialState, handlers) {
  createReducer(initialState, handlers, { allowNonstandardActionIf: isApolloAction })
}

// In your reducer file:

import createReducer from 'utils/createReducer'

export const createReducer([], {
  [ActionType.ADD_TODO]: (state, { payload }) => [state, ...payload],
  // ...
})
```

### globalizeSelectors

Many Redux applications use selector functions to provide access to the state tree.

In a modular Redux application, we sometimes need to have selectors that work on the module's local slice of the state tree, but in other cases, we need to have selectors that work on the global state tree.

One solution is to individually export the localized selectors and then default export the globalized selectors as a single object.  To use a localized selector, use `import { mySelector } from 'myModule/selectors'`.  To use a globalized selector, use `import MyModuleSelectors from 'myModule/selectors'` and then call `MyModuleSelectors.mySelector`.

`globalizeSelectors` is designed to facilitate this approach.  It takes a function that maps from the global state to the local state slice and an object of localized selector functions.  It returns an object of globalized selector functions.

```js
import { globalizeSelectors } from 'zeal-redux-utils'

function localState(state) {
  return state.todos
}

export function allTodos(state) {
  // return all todos from the local state slice
}

export default globalizeSelectors(localState, {
  allTodos
})
```

This approach to selectors is described in much more detail in a series of blog posts by Randy Coulman:

* [Encapsulating the Redux State Tree](http://randycoulman.com/blog/2016/09/13/encapsulating-the-redux-state-tree/)
* [Modular Reducers and Selectors](http://randycoulman.com/blog/2016/09/27/modular-reducers-and-selectors/)
* [Globalizing Redux Selectors](http://randycoulman.com/blog/2016/11/29/globalizing-redux-selectors/)
* [Globalizing Curried Selectors](http://randycoulman.com/blog/2016/12/27/globalizing-curried-selectors/)

## License

Authored by the Engineering Team of [Coding ZEAL](https://codingzeal.com?utm_source=github)

Copyright (c) 2017 Zeal, LLC.  Licensed under the [MIT license](LICENSE.md).
