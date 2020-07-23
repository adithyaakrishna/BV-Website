/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var invariant = require("fbjs/lib/invariant");

var warning = require("fbjs/lib/warning");

function getPaginationVariables(direction, count, cursor, baseVariables, extraVariables, paginationMetadata) {
  var _objectSpread3;

  var backwardMetadata = paginationMetadata.backward,
      forwardMetadata = paginationMetadata.forward;

  if (direction === 'backward') {
    var _objectSpread2;

    !(backwardMetadata != null && backwardMetadata.count != null && backwardMetadata.cursor != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected backward pagination metadata to be available. ' + "If you're seeing this, this is likely a bug in Relay.") : invariant(false) : void 0;
    process.env.NODE_ENV !== "production" ? warning(!extraVariables.hasOwnProperty(backwardMetadata.cursor), 'Relay: `UNSTABLE_extraVariables` provided by caller should not ' + 'contain cursor variable `%s`. This variable is automatically ' + 'determined by Relay.', backwardMetadata.cursor) : void 0;
    process.env.NODE_ENV !== "production" ? warning(!extraVariables.hasOwnProperty(backwardMetadata.count), 'Relay: `UNSTABLE_extraVariables` provided by caller should not ' + 'contain count variable `%s`. This variable is automatically ' + 'determined by Relay.', backwardMetadata.count) : void 0;

    var _paginationVariables = _objectSpread({}, baseVariables, {}, extraVariables, (_objectSpread2 = {}, (0, _defineProperty2["default"])(_objectSpread2, backwardMetadata.cursor, cursor), (0, _defineProperty2["default"])(_objectSpread2, backwardMetadata.count, count), _objectSpread2));

    if (forwardMetadata && forwardMetadata.cursor) {
      _paginationVariables[forwardMetadata.cursor] = null;
    }

    if (forwardMetadata && forwardMetadata.count) {
      _paginationVariables[forwardMetadata.count] = null;
    }

    return _paginationVariables;
  }

  !(forwardMetadata != null && forwardMetadata.count != null && forwardMetadata.cursor != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected forward pagination metadata to be available. ' + "If you're seeing this, this is likely a bug in Relay.") : invariant(false) : void 0;
  process.env.NODE_ENV !== "production" ? warning(!extraVariables.hasOwnProperty(forwardMetadata.cursor), 'Relay: `UNSTABLE_extraVariables` provided by caller should not ' + 'contain cursor variable `%s`. This variable is automatically ' + 'determined by Relay.', forwardMetadata.cursor) : void 0;
  process.env.NODE_ENV !== "production" ? warning(!extraVariables.hasOwnProperty(forwardMetadata.count), 'Relay: `UNSTABLE_extraVariables` provided by caller should not ' + 'contain count variable `%s`. This variable is automatically ' + 'determined by Relay.', forwardMetadata.count) : void 0;

  var paginationVariables = _objectSpread({}, baseVariables, {}, extraVariables, (_objectSpread3 = {}, (0, _defineProperty2["default"])(_objectSpread3, forwardMetadata.cursor, cursor), (0, _defineProperty2["default"])(_objectSpread3, forwardMetadata.count, count), _objectSpread3));

  if (backwardMetadata && backwardMetadata.cursor) {
    paginationVariables[backwardMetadata.cursor] = null;
  }

  if (backwardMetadata && backwardMetadata.count) {
    paginationVariables[backwardMetadata.count] = null;
  }

  return paginationVariables;
}

module.exports = getPaginationVariables;