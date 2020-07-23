/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */
'use strict';

var _require = require('./loadQuery'),
    loadQuery = _require.loadQuery;

function loadEntryPoint(environmentProvider, entryPoint, entryPointParams) {
  // Start loading the code for the entrypoint
  var loadingPromise = null;

  if (entryPoint.root.getModuleIfRequired() == null) {
    loadingPromise = entryPoint.root.load();
  }

  var preloadProps = entryPoint.getPreloadProps(entryPointParams);
  var queries = preloadProps.queries,
      entryPoints = preloadProps.entryPoints,
      extraProps = preloadProps.extraProps;
  var preloadedQueries = {};
  var preloadedEntryPoints = {};

  if (queries != null) {
    var queriesPropNames = Object.keys(queries);
    queriesPropNames.forEach(function (queryPropName) {
      var _queries$queryPropNam = queries[queryPropName],
          environmentProviderOptions = _queries$queryPropNam.environmentProviderOptions,
          options = _queries$queryPropNam.options,
          parameters = _queries$queryPropNam.parameters,
          variables = _queries$queryPropNam.variables;
      var environment = environmentProvider.getEnvironment(environmentProviderOptions);
      preloadedQueries[queryPropName] = loadQuery(environment, parameters, variables, {
        fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
        networkCacheConfig: options === null || options === void 0 ? void 0 : options.networkCacheConfig
      }, environmentProviderOptions);
    });
  }

  if (entryPoints != null) {
    var entryPointPropNames = Object.keys(entryPoints);
    entryPointPropNames.forEach(function (entryPointPropName) {
      var entryPointDescription = entryPoints[entryPointPropName];

      if (entryPointDescription == null) {
        return;
      }

      var nestedEntryPoint = entryPointDescription.entryPoint,
          nestedParams = entryPointDescription.entryPointParams;
      preloadedEntryPoints[entryPointPropName] = loadEntryPoint(environmentProvider, nestedEntryPoint, nestedParams);
    });
  }

  var dispose = function dispose() {
    if (preloadedQueries != null) {
      Object.values(preloadedQueries).forEach(function (_ref) {
        var innerDispose = _ref.dispose;
        innerDispose();
      });
    }
  };

  return {
    dispose: dispose,
    entryPoints: preloadedEntryPoints,
    extraProps: extraProps !== null && extraProps !== void 0 ? extraProps : null,
    getComponent: function getComponent() {
      var component = entryPoint.root.getModuleIfRequired();

      if (component == null) {
        var _loadingPromise;

        loadingPromise = (_loadingPromise = loadingPromise) !== null && _loadingPromise !== void 0 ? _loadingPromise : entryPoint.root.load();
        throw loadingPromise;
      } // $FlowFixMe[incompatible-cast] - trust me Flow, its entryPoint component


      return component;
    },
    queries: preloadedQueries
  };
}

module.exports = loadEntryPoint;