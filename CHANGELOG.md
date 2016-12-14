# Change Log

All notable changes to this project will be documented in this file.    This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased](https://github.com/CodingZeal/zeal-redux-utils/compare/v0.2.0...HEAD)

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
