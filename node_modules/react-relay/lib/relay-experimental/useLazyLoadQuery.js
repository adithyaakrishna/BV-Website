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

var useLazyLoadQueryNode = require('./useLazyLoadQueryNode');

var useMemoOperationDescriptor = require('./useMemoOperationDescriptor');

var _require = require('./loadQuery'),
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

function useLazyLoadQuery(gqlQuery, variables, options) {
  // We need to use this hook in order to be able to track if
  // loadQuery was called during render
  useTrackLoadQueryInRender();
  var query = useMemoOperationDescriptor(gqlQuery, variables);
  var data = useLazyLoadQueryNode({
    componentDisplayName: 'useLazyLoadQuery()',
    fetchKey: options === null || options === void 0 ? void 0 : options.fetchKey,
    fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
    networkCacheConfig: options === null || options === void 0 ? void 0 : options.networkCacheConfig,
    query: query,
    renderPolicy: options === null || options === void 0 ? void 0 : options.UNSTABLE_renderPolicy
  });
  return data;
}

module.exports = useLazyLoadQuery;