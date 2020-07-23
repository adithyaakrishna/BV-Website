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

var _require = require('relay-runtime'),
    createOperationDescriptor = _require.createOperationDescriptor,
    Environment = _require.Environment,
    getRequest = _require.getRequest,
    getRequestIdentifier = _require.getRequestIdentifier,
    Observable = _require.Observable,
    PreloadableQueryRegistry = _require.PreloadableQueryRegistry,
    ReplaySubject = _require.ReplaySubject;

// Expire results by this delay after they resolve.
var DEFAULT_PREFETCH_TIMEOUT = 30 * 1000; // 30 seconds

var WEAKMAP_SUPPORTED = typeof WeakMap === 'function';
var STORE_OR_NETWORK_DEFAULT = 'store-or-network';
var pendingQueriesByEnvironment = WEAKMAP_SUPPORTED ? new WeakMap() : new Map();

function preloadQuery(environment, preloadableRequest, variables, options, environmentProviderOptions) {
  !(environment instanceof Environment) ? process.env.NODE_ENV !== "production" ? invariant(false, 'preloadQuery(): Expected a RelayModernEnvironment') : invariant(false) : void 0;

  var _pendingQueries = pendingQueriesByEnvironment.get(environment);

  if (_pendingQueries == null) {
    _pendingQueries = new Map();
    pendingQueriesByEnvironment.set(environment, _pendingQueries);
  }

  var pendingQueries = _pendingQueries; // store in a const for flow

  var queryEntry = preloadQueryDeduped(environment, pendingQueries, preloadableRequest, variables, options);
  var source = queryEntry.kind === 'network' ? Observable.create(function (sink) {
    var subscription = queryEntry.subject.subscribe(sink);
    return function () {
      subscription.unsubscribe();
      cleanup(pendingQueries, queryEntry);
    };
  }) : null;
  return {
    kind: 'PreloadedQuery_DEPRECATED',
    environment: environment,
    environmentProviderOptions: environmentProviderOptions,
    fetchKey: queryEntry.fetchKey,
    fetchPolicy: queryEntry.fetchPolicy,
    networkCacheConfig: options === null || options === void 0 ? void 0 : options.networkCacheConfig,
    id: queryEntry.id,
    name: queryEntry.name,
    source: source,
    variables: variables,
    status: queryEntry.status
  };
}

function preloadQueryDeduped(environment, pendingQueries, preloadableRequest, variables, options) {
  var _options$fetchPolicy;

  var params;
  var query;

  if (preloadableRequest.kind === 'PreloadableConcreteRequest') {
    var preloadableConcreteRequest = preloadableRequest;
    params = preloadableConcreteRequest.params;
    query = params.id != null ? PreloadableQueryRegistry.get(params.id) : null;
  } else {
    query = getRequest(preloadableRequest);
    params = query.params;
  }

  var network = environment.getNetwork();
  var fetchPolicy = (_options$fetchPolicy = options === null || options === void 0 ? void 0 : options.fetchPolicy) !== null && _options$fetchPolicy !== void 0 ? _options$fetchPolicy : STORE_OR_NETWORK_DEFAULT;
  var fetchKey = options === null || options === void 0 ? void 0 : options.fetchKey;

  var networkCacheConfig = _objectSpread({
    force: true
  }, options === null || options === void 0 ? void 0 : options.networkCacheConfig);

  var cacheKey = "".concat(getRequestIdentifier(params, variables)).concat(fetchKey != null ? "-".concat(fetchKey) : '');
  var prevQueryEntry = pendingQueries.get(cacheKey);
  var availability = fetchPolicy === STORE_OR_NETWORK_DEFAULT && query != null && query != null ? environment.check(createOperationDescriptor(query, variables)) : {
    status: 'missing'
  };
  var nextQueryEntry;

  if (availability.status === 'available' && query != null) {
    var _availability$fetchTi;

    nextQueryEntry = prevQueryEntry && prevQueryEntry.kind === 'cache' ? prevQueryEntry : {
      cacheKey: cacheKey,
      fetchKey: fetchKey,
      fetchPolicy: fetchPolicy,
      kind: 'cache',
      id: params.id,
      name: params.name,
      status: {
        cacheConfig: networkCacheConfig,
        source: 'cache',
        fetchTime: (_availability$fetchTi = availability === null || availability === void 0 ? void 0 : availability.fetchTime) !== null && _availability$fetchTi !== void 0 ? _availability$fetchTi : null
      }
    };

    if (!environment.isServer() && prevQueryEntry == null) {
      setTimeout(function () {
        // Clear the cache entry after the default timeout
        // null-check for Flow
        if (nextQueryEntry != null) {
          cleanup(pendingQueries, nextQueryEntry);
        }
      }, DEFAULT_PREFETCH_TIMEOUT);
    }
  } else if (prevQueryEntry == null || prevQueryEntry.kind !== 'network') {
    // Should fetch but we're not already fetching: fetch!
    var _environment$__create = environment.__createLogObserver(params, variables),
        logObserver = _environment$__create[0],
        logRequestInfo = _environment$__create[1];

    var source = network.execute(params, variables, networkCacheConfig, null, logRequestInfo);
    var subject = new ReplaySubject();
    nextQueryEntry = {
      cacheKey: cacheKey,
      fetchKey: fetchKey,
      fetchPolicy: fetchPolicy,
      kind: 'network',
      id: params.id,
      name: params.name,
      status: {
        cacheConfig: networkCacheConfig,
        source: 'network',
        fetchTime: null
      },
      subject: subject,
      subscription: source["finally"](function () {
        if (environment.isServer()) {
          return;
        }

        setTimeout(function () {
          // Clear the cache entry after the default timeout
          // null-check for Flow
          if (nextQueryEntry != null) {
            cleanup(pendingQueries, nextQueryEntry);
          }
        }, DEFAULT_PREFETCH_TIMEOUT);
      })["do"](logObserver).subscribe({
        complete: function complete() {
          subject.complete();
        },
        error: function error(_error) {
          subject.error(_error);
        },
        next: function next(response) {
          subject.next(response);
        }
      })
    };
  } else {
    nextQueryEntry = prevQueryEntry;
  }

  pendingQueries.set(cacheKey, nextQueryEntry);
  return nextQueryEntry;
}

function cleanup(pendingQueries, entry) {
  // Reload the entry by its cache key and only invalidate if its the identical
  // entry instance. This ensures that if the same query/variables are fetched
  // successively that a timeout/expiration from an earlier fetch doesn't clear
  // a subsequent fetch.
  var currentEntry = pendingQueries.get(entry.cacheKey);

  if (currentEntry != null && currentEntry === entry) {
    if (currentEntry.kind === 'network') {
      currentEntry.subscription.unsubscribe();
    }

    pendingQueries["delete"](currentEntry.cacheKey);
  }
}

module.exports = preloadQuery;