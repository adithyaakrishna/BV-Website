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

var React = require('react');

function EntryPointContainer(_ref) {
  var entryPointReference = _ref.entryPointReference,
      props = _ref.props;
  var getComponent = entryPointReference.getComponent,
      queries = entryPointReference.queries,
      entryPoints = entryPointReference.entryPoints,
      extraProps = entryPointReference.extraProps;
  var Component = getComponent();
  return /*#__PURE__*/React.createElement(Component, {
    entryPoints: entryPoints,
    extraProps: extraProps,
    props: props,
    queries: queries
  });
}

module.exports = EntryPointContainer;