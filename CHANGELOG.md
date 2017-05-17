# Change Log

All notable changes to this project will be documented in this file.    This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased](https://github.com/CodingZeal/zeal-redux-utils/compare/v1.0.0...HEAD)

## [1.0.0](https://github.com/CodingZeal/zeal-redux-utils/compare/v0.3.2...v1.0.0) - 2017-05-17

Releasing 0.3.2 as 1.0.0 with no changes.

## [0.3.2](https://github.com/CodingZeal/zeal-redux-utils/compare/v0.3.1...v0.3.2) - 2017-05-16

### Added

* Add documentation for the each of the utility functions to the README. ([#11](https://github.com/CodingZeal/zeal-redux-utils/pull/11))

## [0.3.1](https://github.com/CodingZeal/zeal-redux-utils/compare/v0.3.0...v0.3.1) - 2017-05-12

### Changed

* `createReducer` now allows the caller to specify a whitelist function that can bypass the [flux standard action](https://github.com/acdlite/flux-standard-action) (FSA) check.  Some external libraries dispatch actions that do not conform to the FSA spec and we don't want those to trigger the `NonStandardAction` exception. The whitelist function should take an action and return `true` if it should bypass the FSA check, or false if it should be checked. Use it as follows: `createReducer(initialState, actionHandlers, { allowNonStandardActionIf: whitelistFunction })`. ([#9](https://github.com/CodingZeal/zeal-redux-utils/pull/9))

## [0.3.0](https://github.com/CodingZeal/zeal-redux-utils/compare/v0.2.0...v0.3.0) - 2016-12-14

### Changed

* Check for flux standard actions (FSAs) in reducers created by `createReducer`.  The check is performed only in development mode.  Non-FSA actions raise a `NonStandardAction` exception. See [flux-standard-action](https://github.com/acdlite/flux-standard-action) for a definition of what is an FSA. ([#6](https://github.com/CodingZeal/zeal-redux-utils/pull/6))

### Added

* Add `nullAction` for use in reducer specs.  A `nullAction` is a flux-standard-action-compliant action that shouldn't match any of your normal actions.  It can be used to initialize the state in a reducer spec.  e.g `const initialState = reducer(undefined, nullAction)` ([#7](https://github.com/CodingZeal/zeal-redux-utils/pull/7))

### Removed

* Cleaned non-essential files out of the npm package to reduce package size. ([#8](https://github.com/CodingZeal/zeal-redux-utils/pull/8))

### Internal

* Use [yarn](https://yarnpkg.com/) for all building and scripting tasks. ([#8](https://github.com/CodingZeal/zeal-redux-utils/pull/8))

## [0.2.0](https://github.com/CodingZeal/zeal-redux-utils/compare/v0.1.1...v0.2.0) - 2016-12-14

### Added

* Add `globalizeSelectors` for adapting selectors that work on a slice of the state tree to allow them to work on the entire state tree.  See [Globalizing Redux Selectors](http://randycoulman.com/blog/2016/11/29/globalizing-redux-selectors/) for more information. ([#2](https://github.com/CodingZeal/zeal-redux-utils/pull/2), [#5](https://github.com/CodingZeal/zeal-redux-utils/pull/5))

## [0.1.1](https://github.com/CodingZeal/zeal-redux-utils/compare/v0.1.0...v0.1.1) - 2016-12-01

### Added

* [Internal only] Tests for `createActionTypes` and `createReducer`

## 0.1.0 - 2016-11-30

### Added

* Welcome to the world!
* Add `createActionTypes` for creating namespaced Redux action type constants.
* Add `createReducer` for creating Redux reducers without using case statements.
