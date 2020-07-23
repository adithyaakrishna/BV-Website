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

var ProfilerContext = require('./ProfilerContext');

var React = require('react');

var useFetchTrackingRef = require('./useFetchTrackingRef');

var useFragmentNode = require('./useFragmentNode');

var useRelayEnvironment = require('./useRelayEnvironment');

var _require = require('./QueryResource'),
    getQueryResourceForEnvironment = _require.getQueryResourceForEnvironment;

var _require2 = require('relay-runtime'),
    fetchQuery = _require2.__internal.fetchQuery;

var useContext = React.useContext,
    useEffect = React.useEffect,
    useState = React.useState,
    useRef = React.useRef;

function useLazyLoadQueryNode(args) {
  var _args$fetchObservable, _args$networkCacheCon;

  var environment = useRelayEnvironment();
  var profilerContext = useContext(ProfilerContext);
  var QueryResource = getQueryResourceForEnvironment(environment);
  var query = args.query,
      componentDisplayName = args.componentDisplayName,
      fetchKey = args.fetchKey,
      fetchPolicy = args.fetchPolicy,
      renderPolicy = args.renderPolicy;
  var fetchObservable = (_args$fetchObservable = args.fetchObservable) !== null && _args$fetchObservable !== void 0 ? _args$fetchObservable : fetchQuery(environment, query, {
    networkCacheConfig: (_args$networkCacheCon = args.networkCacheConfig) !== null && _args$networkCacheCon !== void 0 ? _args$networkCacheCon : {
      force: true
    }
  });

  var _useFetchTrackingRef = useFetchTrackingRef(),
      startFetch = _useFetchTrackingRef.startFetch,
      completeFetch = _useFetchTrackingRef.completeFetch;

  var preparedQueryResult = profilerContext.wrapPrepareQueryResource(function () {
    return QueryResource.prepare(query, fetchObservable, fetchPolicy, renderPolicy, {
      start: startFetch,
      complete: completeFetch,
      error: completeFetch
    }, fetchKey, profilerContext);
  });

  var _forceUpdate;

  var _maybeFastRefresh;

  if (process.env.NODE_ENV !== "production") {
    /* eslint-disable react-hooks/rules-of-hooks */
    var _useState = useState(0);

    _forceUpdate = _useState[1];
    _maybeFastRefresh = useRef(false);
    useEffect(function () {
      return function () {
        // Detect fast refresh, only runs multiple times in fast refresh
        _maybeFastRefresh.current = true;
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* eslint-enable react-hooks/rules-of-hooks */
  }

  useEffect(function () {
    if (process.env.NODE_ENV !== "production") {
      if (_maybeFastRefresh && _maybeFastRefresh.current) {
        /**
         * This block only runs during fast refresh, the current resource and
         * it's cache is disposed in the previous cleanup. Stop retaining and
         * force a re-render to restart fetchObservable and retain correctly.
         */
        _maybeFastRefresh.current = false;
        _forceUpdate && _forceUpdate(function (n) {
          return n + 1;
        });
        return;
      }
    }

    var disposable = QueryResource.retain(preparedQueryResult, profilerContext);
    return function () {
      disposable.dispose();
    }; // NOTE: We disable react-hooks-deps warning because the `environment`
    // and `query` identities are capturing all information about whether
    // the effect should be re-ran and the query re-retained.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environment, query]);
  var fragmentNode = preparedQueryResult.fragmentNode,
      fragmentRef = preparedQueryResult.fragmentRef;

  var _useFragmentNode = useFragmentNode(fragmentNode, fragmentRef, componentDisplayName),
      data = _useFragmentNode.data;

  return data;
}

module.exports = useLazyLoadQueryNode;