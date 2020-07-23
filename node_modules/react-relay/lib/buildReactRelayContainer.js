/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = require('react');

var ReactRelayContext = require('./ReactRelayContext');

var assertFragmentMap = require('./assertFragmentMap');

var invariant = require("fbjs/lib/invariant");

var mapObject = require("fbjs/lib/mapObject");

var readContext = require('./readContext');

var _require = require('./ReactRelayContainerUtils'),
    getComponentName = _require.getComponentName,
    getContainerName = _require.getContainerName;

var _require2 = require('relay-runtime'),
    getFragment = _require2.getFragment;

/**
 * Helper to create the Relay HOCs with ref forwarding, setting the displayName
 * and reading the React context.
 */
function buildReactRelayContainer(ComponentClass, fragmentSpec, createContainerWithFragments) {
  // Sanity-check user-defined fragment input
  var containerName = getContainerName(ComponentClass);
  assertFragmentMap(getComponentName(ComponentClass), fragmentSpec);
  var fragments = mapObject(fragmentSpec, getFragment);
  var Container = createContainerWithFragments(ComponentClass, fragments);
  Container.displayName = containerName;

  function forwardRef(props, ref) {
    var context = readContext(ReactRelayContext);
    !(context != null) ? process.env.NODE_ENV !== "production" ? invariant(false, '`%s` tried to render a context that was not valid this means that ' + '`%s` was rendered outside of a query renderer.', containerName, containerName) : invariant(false) : void 0;
    return /*#__PURE__*/React.createElement(Container, (0, _extends2["default"])({}, props, {
      __relayContext: context,
      componentRef: props.componentRef || ref
    }));
  }

  forwardRef.displayName = containerName;
  var ForwardContainer = React.forwardRef(forwardRef);

  if (process.env.NODE_ENV !== "production") {
    // Used by RelayModernTestUtils
    ForwardContainer.__ComponentClass = ComponentClass;
    ForwardContainer.displayName = containerName;
  } // $FlowFixMe[incompatible-return]


  return ForwardContainer;
}

module.exports = buildReactRelayContainer;