/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @emails oncall+relay
 * @format
 */
// flowlint ambiguous-object-type:error
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LRUCache = require('./LRUCache');

var invariant = require("fbjs/lib/invariant");

var mapObject = require("fbjs/lib/mapObject");

var warning = require("fbjs/lib/warning");

var _require = require('relay-runtime'),
    getPromiseForActiveRequest = _require.__internal.getPromiseForActiveRequest,
    getFragmentIdentifier = _require.getFragmentIdentifier,
    getSelector = _require.getSelector,
    isPromise = _require.isPromise,
    recycleNodesInto = _require.recycleNodesInto;

var WEAKMAP_SUPPORTED = typeof WeakMap === 'function';
// TODO: Fix to not rely on LRU. If the number of active fragments exceeds this
// capacity, readSpec() will fail to find cached entries and break object
// identity even if data hasn't changed.
var CACHE_CAPACITY = 1000000;

function isMissingData(snapshot) {
  if (Array.isArray(snapshot)) {
    return snapshot.some(function (s) {
      return s.isMissingData;
    });
  }

  return snapshot.isMissingData;
}

function getFragmentResult(cacheKey, snapshot) {
  if (Array.isArray(snapshot)) {
    return {
      cacheKey: cacheKey,
      snapshot: snapshot,
      data: snapshot.map(function (s) {
        return s.data;
      })
    };
  }

  return {
    cacheKey: cacheKey,
    snapshot: snapshot,
    data: snapshot.data
  };
}

function getPromiseForPendingOperationAffectingOwner(environment, request) {
  return environment.getOperationTracker().getPromiseForPendingOperationsAffectingOwner(request);
}

var FragmentResourceImpl = /*#__PURE__*/function () {
  function FragmentResourceImpl(environment) {
    this._environment = environment;
    this._cache = LRUCache.create(CACHE_CAPACITY);
  }
  /**
   * This function should be called during a Component's render function,
   * to read the data for a fragment, or suspend if the fragment is being
   * fetched.
   */


  var _proto = FragmentResourceImpl.prototype;

  _proto.read = function read(fragmentNode, fragmentRef, componentDisplayName, fragmentKey) {
    return this.readWithIdentifier(fragmentNode, fragmentRef, getFragmentIdentifier(fragmentNode, fragmentRef), componentDisplayName, fragmentKey);
  }
  /**
   * Like `read`, but with pre-computed fragmentIdentifier that should be
   * equal to `getFragmentIdentifier(fragmentNode, fragmentRef)` from the
   * arguments.
   */
  ;

  _proto.readWithIdentifier = function readWithIdentifier(fragmentNode, fragmentRef, fragmentIdentifier, componentDisplayName, fragmentKey) {
    var _fragmentNode$metadat, _fragmentOwner$node$p;

    var environment = this._environment; // If fragmentRef is null or undefined, pass it directly through.
    // This is a convenience when consuming fragments via a HOC api, when the
    // prop corresponding to the fragment ref might be passed as null.

    if (fragmentRef == null) {
      return {
        cacheKey: fragmentIdentifier,
        data: null,
        snapshot: null
      };
    } // If fragmentRef is plural, ensure that it is an array.
    // If it's empty, return the empty array direclty before doing any more work.


    if ((fragmentNode === null || fragmentNode === void 0 ? void 0 : (_fragmentNode$metadat = fragmentNode.metadata) === null || _fragmentNode$metadat === void 0 ? void 0 : _fragmentNode$metadat.plural) === true) {
      !Array.isArray(fragmentRef) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected fragment pointer%s for fragment `%s` to be ' + 'an array, instead got `%s`. Remove `@relay(plural: true)` ' + 'from fragment `%s` to allow the prop to be an object.', fragmentKey != null ? " for key `".concat(fragmentKey, "`") : '', fragmentNode.name, typeof fragmentRef, fragmentNode.name) : invariant(false) : void 0;

      if (fragmentRef.length === 0) {
        return {
          cacheKey: fragmentIdentifier,
          data: [],
          snapshot: []
        };
      }
    } // Now we actually attempt to read the fragment:
    // 1. Check if there's a cached value for this fragment


    var cachedValue = this._cache.get(fragmentIdentifier);

    if (cachedValue != null) {
      if (isPromise(cachedValue) || cachedValue instanceof Error) {
        throw cachedValue;
      }

      if (cachedValue.snapshot) {
        return cachedValue;
      }
    } // 2. If not, try reading the fragment from the Relay store.
    // If the snapshot has data, return it and save it in cache


    var fragmentSelector = getSelector(fragmentNode, fragmentRef);
    !(fragmentSelector != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected to receive an object where `...%s` was spread, ' + 'but the fragment reference was not found`. This is most ' + 'likely the result of:\n' + "- Forgetting to spread `%s` in `%s`'s parent's fragment.\n" + '- Conditionally fetching `%s` but unconditionally passing %s prop ' + 'to `%s`. If the parent fragment only fetches the fragment conditionally ' + '- with e.g. `@include`, `@skip`, or inside a `... on SomeType { }` ' + 'spread  - then the fragment reference will not exist. ' + 'In this case, pass `null` if the conditions for evaluating the ' + 'fragment are not met (e.g. if the `@include(if)` value is false.)', fragmentNode.name, fragmentNode.name, componentDisplayName, fragmentNode.name, fragmentKey == null ? 'a fragment reference' : "the `".concat(fragmentKey, "`"), componentDisplayName) : invariant(false) : void 0;
    var snapshot = fragmentSelector.kind === 'PluralReaderSelector' ? fragmentSelector.selectors.map(function (s) {
      return environment.lookup(s);
    }) : environment.lookup(fragmentSelector);
    var fragmentOwner = fragmentSelector.kind === 'PluralReaderSelector' ? fragmentSelector.selectors[0].owner : fragmentSelector.owner;
    var parentQueryName = (_fragmentOwner$node$p = fragmentOwner.node.params.name) !== null && _fragmentOwner$node$p !== void 0 ? _fragmentOwner$node$p : 'Unknown Parent Query';

    if (!isMissingData(snapshot)) {
      var fragmentResult = getFragmentResult(fragmentIdentifier, snapshot);

      this._cache.set(fragmentIdentifier, fragmentResult);

      return fragmentResult;
    } // 3. If we don't have data in the store, check if a request is in
    // flight for the fragment's parent query, or for another operation
    // that may affect the parent's query data, such as a mutation
    // or subscription. If a promise exists, cache the promise and use it
    // to suspend.


    var networkPromise = this._getAndSavePromiseForFragmentRequestInFlight(fragmentIdentifier, fragmentOwner);

    if (networkPromise != null) {
      throw networkPromise;
    } // 5. If a cached value still isn't available, raise a warning.
    // This means that we're trying to read a fragment that isn't available
    // and isn't being fetched at all.


    process.env.NODE_ENV !== "production" ? warning(false, 'Relay: Tried reading fragment `%s` declared in ' + '`%s`, but it has missing data and its parent query `%s` is not ' + 'being fetched.\n' + 'This might be fixed by by re-running the Relay Compiler. ' + ' Otherwise, make sure of the following:\n' + '* You are correctly fetching `%s` if you are using a ' + '"store-only" `fetchPolicy`.\n' + "* Other queries aren't accidentally fetching and overwriting " + 'the data for this fragment.\n' + '* Any related mutations or subscriptions are fetching all of ' + 'the data for this fragment.\n' + "* Any related store updaters aren't accidentally deleting " + 'data for this fragment.', fragmentNode.name, componentDisplayName, parentQueryName, parentQueryName) : void 0;
    return getFragmentResult(fragmentIdentifier, snapshot);
  };

  _proto.readSpec = function readSpec(fragmentNodes, fragmentRefs, componentDisplayName) {
    var _this = this;

    return mapObject(fragmentNodes, function (fragmentNode, fragmentKey) {
      var fragmentRef = fragmentRefs[fragmentKey];
      return _this.read(fragmentNode, fragmentRef, componentDisplayName, fragmentKey);
    });
  };

  _proto.subscribe = function subscribe(fragmentResult, callback) {
    var _this2 = this;

    var environment = this._environment;
    var cacheKey = fragmentResult.cacheKey;
    var renderedSnapshot = fragmentResult.snapshot;

    if (!renderedSnapshot) {
      return {
        dispose: function dispose() {}
      };
    } // 1. Check for any updates missed during render phase
    // TODO(T44066760): More efficiently detect if we missed an update


    var _this$checkMissedUpda = this.checkMissedUpdates(fragmentResult),
        didMissUpdates = _this$checkMissedUpda[0],
        currentSnapshot = _this$checkMissedUpda[1]; // 2. If an update was missed, notify the component so it updates with
    // latest data.


    if (didMissUpdates) {
      callback();
    } // 3. Establish subscriptions on the snapshot(s)


    var dataSubscriptions = [];

    if (Array.isArray(renderedSnapshot)) {
      !Array.isArray(currentSnapshot) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected snapshots to be plural. ' + "If you're seeing this, this is likely a bug in Relay.") : invariant(false) : void 0;
      currentSnapshot.forEach(function (snapshot, idx) {
        dataSubscriptions.push(environment.subscribe(snapshot, function (latestSnapshot) {
          _this2._updatePluralSnapshot(cacheKey, currentSnapshot, latestSnapshot, idx);

          callback();
        }));
      });
    } else {
      !(currentSnapshot != null && !Array.isArray(currentSnapshot)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected snapshot to be singular. ' + "If you're seeing this, this is likely a bug in Relay.") : invariant(false) : void 0;
      dataSubscriptions.push(environment.subscribe(currentSnapshot, function (latestSnapshot) {
        _this2._cache.set(cacheKey, getFragmentResult(cacheKey, latestSnapshot));

        callback();
      }));
    }

    return {
      dispose: function dispose() {
        dataSubscriptions.map(function (s) {
          return s.dispose();
        });

        _this2._cache["delete"](cacheKey);
      }
    };
  };

  _proto.subscribeSpec = function subscribeSpec(fragmentResults, callback) {
    var _this3 = this;

    var disposables = Object.keys(fragmentResults).map(function (key) {
      return _this3.subscribe(fragmentResults[key], callback);
    });
    return {
      dispose: function dispose() {
        disposables.forEach(function (disposable) {
          disposable.dispose();
        });
      }
    };
  };

  _proto.checkMissedUpdates = function checkMissedUpdates(fragmentResult) {
    var environment = this._environment;
    var cacheKey = fragmentResult.cacheKey;
    var renderedSnapshot = fragmentResult.snapshot;

    if (!renderedSnapshot) {
      return [false, null];
    }

    var didMissUpdates = false;

    if (Array.isArray(renderedSnapshot)) {
      var currentSnapshots = [];
      renderedSnapshot.forEach(function (snapshot, idx) {
        var currentSnapshot = environment.lookup(snapshot.selector);
        var renderData = snapshot.data;
        var currentData = currentSnapshot.data;
        var updatedData = recycleNodesInto(renderData, currentData);

        if (updatedData !== renderData) {
          currentSnapshot = _objectSpread({}, currentSnapshot, {
            data: updatedData
          });
          didMissUpdates = true;
        }

        currentSnapshots[idx] = currentSnapshot;
      });

      if (didMissUpdates) {
        this._cache.set(cacheKey, getFragmentResult(cacheKey, currentSnapshots));
      }

      return [didMissUpdates, currentSnapshots];
    }

    var currentSnapshot = environment.lookup(renderedSnapshot.selector);
    var renderData = renderedSnapshot.data;
    var currentData = currentSnapshot.data;
    var updatedData = recycleNodesInto(renderData, currentData);
    currentSnapshot = {
      data: updatedData,
      isMissingData: currentSnapshot.isMissingData,
      seenRecords: currentSnapshot.seenRecords,
      selector: currentSnapshot.selector
    };

    if (updatedData !== renderData) {
      this._cache.set(cacheKey, getFragmentResult(cacheKey, currentSnapshot));

      didMissUpdates = true;
    }

    return [didMissUpdates, currentSnapshot];
  };

  _proto.checkMissedUpdatesSpec = function checkMissedUpdatesSpec(fragmentResults) {
    var _this4 = this;

    return Object.keys(fragmentResults).some(function (key) {
      return _this4.checkMissedUpdates(fragmentResults[key])[0];
    });
  };

  _proto._getAndSavePromiseForFragmentRequestInFlight = function _getAndSavePromiseForFragmentRequestInFlight(cacheKey, fragmentOwner) {
    var _this5 = this;

    var _getPromiseForActiveR;

    var environment = this._environment;
    var networkPromise = (_getPromiseForActiveR = getPromiseForActiveRequest(environment, fragmentOwner)) !== null && _getPromiseForActiveR !== void 0 ? _getPromiseForActiveR : getPromiseForPendingOperationAffectingOwner(environment, fragmentOwner);

    if (!networkPromise) {
      return null;
    } // When the Promise for the request resolves, we need to make sure to
    // update the cache with the latest data available in the store before
    // resolving the Promise


    var promise = networkPromise.then(function () {
      _this5._cache["delete"](cacheKey);
    })["catch"](function (error) {
      _this5._cache.set(cacheKey, error);
    });

    this._cache.set(cacheKey, promise); // $FlowExpectedError[prop-missing] Expando to annotate Promises.


    promise.displayName = 'Relay(' + fragmentOwner.node.params.name + ')';
    return promise;
  };

  _proto._updatePluralSnapshot = function _updatePluralSnapshot(cacheKey, baseSnapshots, latestSnapshot, idx) {
    var currentFragmentResult = this._cache.get(cacheKey);

    if (isPromise(currentFragmentResult) || currentFragmentResult instanceof Error) {
      reportInvalidCachedData(latestSnapshot.selector.node.name);
      return;
    }

    var currentSnapshot = currentFragmentResult === null || currentFragmentResult === void 0 ? void 0 : currentFragmentResult.snapshot;

    if (currentSnapshot && !Array.isArray(currentSnapshot)) {
      reportInvalidCachedData(latestSnapshot.selector.node.name);
      return;
    }

    var nextSnapshots = currentSnapshot ? (0, _toConsumableArray2["default"])(currentSnapshot) : (0, _toConsumableArray2["default"])(baseSnapshots);
    nextSnapshots[idx] = latestSnapshot;

    this._cache.set(cacheKey, getFragmentResult(cacheKey, nextSnapshots));
  };

  return FragmentResourceImpl;
}();

function reportInvalidCachedData(nodeName) {
  !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected to find cached data for plural fragment `%s` when ' + 'receiving a subscription. ' + "If you're seeing this, this is likely a bug in Relay.", nodeName) : invariant(false) : void 0;
}

function createFragmentResource(environment) {
  return new FragmentResourceImpl(environment);
}

var dataResources = WEAKMAP_SUPPORTED ? new WeakMap() : new Map();

function getFragmentResourceForEnvironment(environment) {
  var cached = dataResources.get(environment);

  if (cached) {
    return cached;
  }

  var newDataResource = createFragmentResource(environment);
  dataResources.set(environment, newDataResource);
  return newDataResource;
}

module.exports = {
  createFragmentResource: createFragmentResource,
  getFragmentResourceForEnvironment: getFragmentResourceForEnvironment
};