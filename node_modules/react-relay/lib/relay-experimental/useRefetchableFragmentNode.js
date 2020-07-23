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

var ProfilerContext = require('./ProfilerContext'); // flowlint-next-line untyped-import:off


var Scheduler = require('scheduler');

var getRefetchMetadata = require('./getRefetchMetadata');

var getValueAtPath = require('./getValueAtPath');

var invariant = require("fbjs/lib/invariant");

var useFetchTrackingRef = require('./useFetchTrackingRef');

var useFragmentNode = require('./useFragmentNode');

var useIsMountedRef = require('./useIsMountedRef');

var useMemoVariables = require('./useMemoVariables');

var useRelayEnvironment = require('./useRelayEnvironment');

var warning = require("fbjs/lib/warning");

var _require = require('./FragmentResource'),
    getFragmentResourceForEnvironment = _require.getFragmentResourceForEnvironment;

var _require2 = require('./QueryResource'),
    getQueryResourceForEnvironment = _require2.getQueryResourceForEnvironment;

var _require3 = require('react'),
    useCallback = _require3.useCallback,
    useContext = _require3.useContext,
    useEffect = _require3.useEffect,
    useMemo = _require3.useMemo,
    useReducer = _require3.useReducer;

var _require4 = require('relay-runtime'),
    fetchQuery = _require4.__internal.fetchQuery,
    createOperationDescriptor = _require4.createOperationDescriptor,
    getFragmentIdentifier = _require4.getFragmentIdentifier,
    getSelector = _require4.getSelector;

function reducer(state, action) {
  switch (action.type) {
    case 'refetch':
      {
        var _action$environment;

        return _objectSpread({}, state, {
          refetchVariables: action.refetchVariables,
          refetchGeneration: state.refetchGeneration + 1,
          fetchPolicy: action.fetchPolicy,
          renderPolicy: action.renderPolicy,
          onComplete: action.onComplete,
          refetchEnvironment: action.environment,
          mirroredEnvironment: (_action$environment = action.environment) !== null && _action$environment !== void 0 ? _action$environment : state.mirroredEnvironment
        });
      }

    case 'reset':
      {
        return {
          fetchPolicy: undefined,
          renderPolicy: undefined,
          onComplete: undefined,
          refetchVariables: null,
          refetchGeneration: 0,
          mirroredEnvironment: action.environment,
          mirroredFragmentIdentifier: action.fragmentIdentifier
        };
      }

    default:
      {
        action.type;
        throw new Error('useRefetchableFragmentNode: Unexpected action type');
      }
  }
}

function useRefetchableFragmentNode(fragmentNode, parentFragmentRef, componentDisplayName) {
  var parentEnvironment = useRelayEnvironment();

  var _getRefetchMetadata = getRefetchMetadata(fragmentNode, componentDisplayName),
      refetchableRequest = _getRefetchMetadata.refetchableRequest,
      fragmentRefPathInResponse = _getRefetchMetadata.fragmentRefPathInResponse,
      identifierField = _getRefetchMetadata.identifierField;

  var fragmentIdentifier = getFragmentIdentifier(fragmentNode, parentFragmentRef);

  var _useReducer = useReducer(reducer, {
    fetchPolicy: undefined,
    renderPolicy: undefined,
    onComplete: undefined,
    refetchVariables: null,
    refetchGeneration: 0,
    refetchEnvironment: null,
    mirroredEnvironment: parentEnvironment,
    mirroredFragmentIdentifier: fragmentIdentifier
  }),
      refetchState = _useReducer[0],
      dispatch = _useReducer[1];

  var _useFetchTrackingRef = useFetchTrackingRef(),
      startFetch = _useFetchTrackingRef.startFetch,
      disposeFetch = _useFetchTrackingRef.disposeFetch,
      completeFetch = _useFetchTrackingRef.completeFetch;

  var refetchVariables = refetchState.refetchVariables,
      refetchGeneration = refetchState.refetchGeneration,
      refetchEnvironment = refetchState.refetchEnvironment,
      fetchPolicy = refetchState.fetchPolicy,
      renderPolicy = refetchState.renderPolicy,
      onComplete = refetchState.onComplete,
      mirroredEnvironment = refetchState.mirroredEnvironment,
      mirroredFragmentIdentifier = refetchState.mirroredFragmentIdentifier;
  var environment = refetchEnvironment !== null && refetchEnvironment !== void 0 ? refetchEnvironment : parentEnvironment;
  var QueryResource = getQueryResourceForEnvironment(environment);
  var profilerContext = useContext(ProfilerContext);
  var shouldReset = environment !== mirroredEnvironment || fragmentIdentifier !== mirroredFragmentIdentifier;

  var _useMemoVariables = useMemoVariables(refetchVariables),
      memoRefetchVariables = _useMemoVariables[0];

  var refetchQuery = useMemo(function () {
    return memoRefetchVariables != null ? createOperationDescriptor(refetchableRequest, memoRefetchVariables) : null;
  }, [memoRefetchVariables, refetchableRequest]);
  var refetchedQueryResult;
  var fragmentRef = parentFragmentRef;

  if (shouldReset) {
    dispatch({
      type: 'reset',
      environment: environment,
      fragmentIdentifier: fragmentIdentifier
    });
  } else if (refetchQuery != null) {
    // check __typename/id is consistent if refetch existing data on Node
    var debugPreviousIDAndTypename;

    if (process.env.NODE_ENV !== "production") {
      debugPreviousIDAndTypename = debugFunctions.getInitialIDAndType(memoRefetchVariables, fragmentRefPathInResponse, environment);
    } // If refetch has been called, we read/fetch the refetch query here. If
    // the refetch query hasn't been fetched or isn't cached, we will suspend
    // at this point.


    var _readQuery = readQuery(environment, refetchQuery, fetchPolicy, renderPolicy, refetchGeneration, componentDisplayName, {
      start: startFetch,
      complete: function complete(maybeError) {
        completeFetch();
        onComplete && onComplete(maybeError !== null && maybeError !== void 0 ? maybeError : null);

        if (process.env.NODE_ENV !== "production") {
          if (!maybeError) {
            debugFunctions.checkSameTypeAfterRefetch(debugPreviousIDAndTypename, environment, fragmentNode, componentDisplayName);
          }
        }
      }
    }, profilerContext),
        queryResult = _readQuery[0],
        queryData = _readQuery[1];

    refetchedQueryResult = queryResult; // After reading/fetching the refetch query, we extract from the
    // refetch query response the new fragment ref we need to use to read
    // the fragment. The new fragment ref will point to the refetch query
    // as its fragment owner.

    var refetchedFragmentRef = getValueAtPath(queryData, fragmentRefPathInResponse);
    fragmentRef = refetchedFragmentRef;

    if (process.env.NODE_ENV !== "production") {
      debugFunctions.checkSameIDAfterRefetch(debugPreviousIDAndTypename, fragmentRef, fragmentNode, componentDisplayName);
    }
  } // We read and subscribe to the fragment using useFragmentNode.
  // If refetch was called, we read the fragment using the new computed
  // fragment ref from the refetch query response; otherwise, we use the
  // fragment ref passed by the caller as normal.


  var _useFragmentNode = useFragmentNode(fragmentNode, fragmentRef, componentDisplayName),
      fragmentData = _useFragmentNode.data,
      disableStoreUpdates = _useFragmentNode.disableStoreUpdates,
      enableStoreUpdates = _useFragmentNode.enableStoreUpdates;

  useEffect(function () {
    // Retain the refetch query if it was fetched and release it
    // in the useEffect cleanup.
    var queryDisposable = refetchedQueryResult != null ? QueryResource.retain(refetchedQueryResult, profilerContext) : null;
    return function () {
      if (queryDisposable) {
        queryDisposable.dispose();
      }
    }; // NOTE: We disable react-hooks-deps warning because
    // refetchedQueryResult is captured by including refetchQuery, which is
    // already capturing if the query or variables changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QueryResource, fragmentIdentifier, refetchQuery, refetchGeneration]);
  var refetch = useRefetchFunction(fragmentNode, parentFragmentRef, fragmentIdentifier, fragmentRefPathInResponse, fragmentData, dispatch, disposeFetch, componentDisplayName, identifierField);
  return {
    fragmentData: fragmentData,
    fragmentRef: fragmentRef,
    refetch: refetch,
    disableStoreUpdates: disableStoreUpdates,
    enableStoreUpdates: enableStoreUpdates
  };
}

function useRefetchFunction(fragmentNode, parentFragmentRef, fragmentIdentifier, fragmentRefPathInResponse, fragmentData, dispatch, disposeFetch, componentDisplayName, identifierField) {
  var isMountedRef = useIsMountedRef();
  var identifierValue = identifierField != null && fragmentData != null && typeof fragmentData === 'object' ? fragmentData[identifierField] : null;
  return useCallback(function (providedRefetchVariables, options) {
    // Bail out and warn if we're trying to refetch after the component
    // has unmounted
    if (isMountedRef.current !== true) {
      process.env.NODE_ENV !== "production" ? warning(false, 'Relay: Unexpected call to `refetch` on unmounted component for fragment ' + '`%s` in `%s`. It looks like some instances of your component are ' + 'still trying to fetch data but they already unmounted. ' + 'Please make sure you clear all timers, intervals, ' + 'async calls, etc that may trigger a fetch.', fragmentNode.name, componentDisplayName) : void 0;
      return {
        dispose: function dispose() {}
      };
    }

    if (Scheduler.unstable_getCurrentPriorityLevel() < Scheduler.unstable_NormalPriority) {
      process.env.NODE_ENV !== "production" ? warning(false, 'Relay: Unexpected call to `refetch` at a priority higher than ' + 'expected on fragment `%s` in `%s`. It looks like you tried to ' + 'call `refetch` under a high priority update, but updates that ' + 'can cause the component to suspend should be scheduled at ' + 'normal priority. Make sure you are calling `refetch` inside ' + '`startTransition()` from the `useSuspenseTransition()` hook.', fragmentNode.name, componentDisplayName) : void 0;
    }

    if (parentFragmentRef == null) {
      process.env.NODE_ENV !== "production" ? warning(false, 'Relay: Unexpected call to `refetch` while using a null fragment ref ' + 'for fragment `%s` in `%s`. When calling `refetch`, we expect ' + "initial fragment data to be non-null. Please make sure you're " + 'passing a valid fragment ref to `%s` before calling ' + '`refetch`, or make sure you pass all required variables to `refetch`.', fragmentNode.name, componentDisplayName, componentDisplayName) : void 0;
    }

    var environment = options === null || options === void 0 ? void 0 : options.__environment;
    var fetchPolicy = options === null || options === void 0 ? void 0 : options.fetchPolicy;
    var renderPolicy = options === null || options === void 0 ? void 0 : options.UNSTABLE_renderPolicy;
    var onComplete = options === null || options === void 0 ? void 0 : options.onComplete;
    var fragmentSelector = getSelector(fragmentNode, parentFragmentRef);
    var parentVariables;
    var fragmentVariables;

    if (fragmentSelector == null) {
      parentVariables = {};
      fragmentVariables = {};
    } else if (fragmentSelector.kind === 'PluralReaderSelector') {
      var _fragmentSelector$sel, _fragmentSelector$sel2, _fragmentSelector$sel3, _fragmentSelector$sel4;

      parentVariables = (_fragmentSelector$sel = (_fragmentSelector$sel2 = fragmentSelector.selectors[0]) === null || _fragmentSelector$sel2 === void 0 ? void 0 : _fragmentSelector$sel2.owner.variables) !== null && _fragmentSelector$sel !== void 0 ? _fragmentSelector$sel : {};
      fragmentVariables = (_fragmentSelector$sel3 = (_fragmentSelector$sel4 = fragmentSelector.selectors[0]) === null || _fragmentSelector$sel4 === void 0 ? void 0 : _fragmentSelector$sel4.variables) !== null && _fragmentSelector$sel3 !== void 0 ? _fragmentSelector$sel3 : {};
    } else {
      parentVariables = fragmentSelector.owner.variables;
      fragmentVariables = fragmentSelector.variables;
    } // NOTE: A user of `useRefetchableFragment()` may pass a subset of
    // all variables required by the fragment when calling `refetch()`.
    // We fill in any variables not passed by the call to `refetch()` with the
    // variables from the original parent fragment owner.

    /* $FlowFixMe[cannot-spread-indexer] (>=0.123.0) This comment suppresses
     * an error found when Flow v0.123.0 was deployed. To see the error
     * delete this comment and run Flow. */


    var refetchVariables = _objectSpread({}, parentVariables, {}, fragmentVariables, {}, providedRefetchVariables); // If the query needs an identifier value ('id' or similar) and one
    // was not explicitly provided, read it from the fragment data.


    if (identifierField != null && !providedRefetchVariables.hasOwnProperty('id')) {
      // @refetchable fragments are guaranteed to have an `id` selection
      // if the type is Node, implements Node, or is @fetchable. Double-check
      // that there actually is a value at runtime.
      if (typeof identifierValue !== 'string') {
        process.env.NODE_ENV !== "production" ? warning(false, 'Relay: Expected result to have a string  ' + '`%s` in order to refetch, got `%s`.', identifierField, identifierValue) : void 0;
      }

      refetchVariables.id = identifierValue;
    }

    dispatch({
      type: 'refetch',
      refetchVariables: refetchVariables,
      fetchPolicy: fetchPolicy,
      renderPolicy: renderPolicy,
      onComplete: onComplete,
      environment: environment
    });
    return {
      dispose: disposeFetch
    };
  }, // NOTE: We disable react-hooks-deps warning because:
  //   - We know fragmentRefPathInResponse is static, so it can be omitted from
  //     deps
  //   - We know fragmentNode is static, so it can be omitted from deps.
  //   - fragmentNode and parentFragmentRef are also captured by including
  //     fragmentIdentifier
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [fragmentIdentifier, dispatch, disposeFetch, identifierValue]);
}

function readQuery(environment, query, fetchPolicy, renderPolicy, refetchGeneration, componentDisplayName, _ref, profilerContext) {
  var start = _ref.start,
      complete = _ref.complete;
  var QueryResource = getQueryResourceForEnvironment(environment);
  var FragmentResource = getFragmentResourceForEnvironment(environment);
  var queryResult = profilerContext.wrapPrepareQueryResource(function () {
    return QueryResource.prepare(query, fetchQuery(environment, query, {
      networkCacheConfig: {
        force: true
      }
    }), fetchPolicy, renderPolicy, {
      start: start,
      error: complete,
      complete: complete
    }, // NOTE: QueryResource will keep a cache entry for a query for the
    // entire lifetime of this component. However, every time refetch is
    // called, we want to make sure we correctly attempt to fetch the query
    // (taking into account the fetchPolicy), even if we're refetching the exact
    // same query (e.g. refreshing it).
    // To do so, we keep track of every time refetch is called with
    // `refetchGenerationRef`, which we can use as a key for the query in
    // QueryResource.
    refetchGeneration);
  });
  var queryData = FragmentResource.read(queryResult.fragmentNode, queryResult.fragmentRef, componentDisplayName).data;
  !(queryData != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Relay: Expected to be able to read refetch query response. ' + "If you're seeing this, this is likely a bug in Relay.") : invariant(false) : void 0;
  return [queryResult, queryData];
}

var debugFunctions;

if (process.env.NODE_ENV !== "production") {
  debugFunctions = {
    getInitialIDAndType: function getInitialIDAndType(memoRefetchVariables, fragmentRefPathInResponse, environment) {
      var _require5 = require('relay-runtime'),
          Record = _require5.Record;

      var id = memoRefetchVariables === null || memoRefetchVariables === void 0 ? void 0 : memoRefetchVariables.id;

      if (fragmentRefPathInResponse.length !== 1 || fragmentRefPathInResponse[0] !== 'node' || id == null) {
        return null;
      }

      var recordSource = environment.getStore().getSource();
      var record = recordSource.get(id);
      var typename = record && Record.getType(record);

      if (typename == null) {
        return null;
      }

      return {
        id: id,
        typename: typename
      };
    },
    checkSameTypeAfterRefetch: function checkSameTypeAfterRefetch(previousIDAndType, environment, fragmentNode, componentDisplayName) {
      var _require6 = require('relay-runtime'),
          Record = _require6.Record;

      if (!previousIDAndType) {
        return;
      }

      var recordSource = environment.getStore().getSource();
      var record = recordSource.get(previousIDAndType.id);
      var typename = record && Record.getType(record);

      if (typename !== previousIDAndType.typename) {
        process.env.NODE_ENV !== "production" ? warning(false, 'Relay: Call to `refetch` returned data with a different ' + '__typename: was `%s`, now `%s`, on `%s` in `%s`. ' + 'Please make sure the server correctly implements' + 'unique id requirement.', previousIDAndType.typename, typename, fragmentNode.name, componentDisplayName) : void 0;
      }
    },
    checkSameIDAfterRefetch: function checkSameIDAfterRefetch(previousIDAndTypename, refetchedFragmentRef, fragmentNode, componentDisplayName) {
      if (previousIDAndTypename == null) {
        return;
      }

      var _require7 = require('relay-runtime'),
          ID_KEY = _require7.ID_KEY; // $FlowExpectedError[incompatible-use]


      var resultID = refetchedFragmentRef[ID_KEY];

      if (resultID != null && resultID !== previousIDAndTypename.id) {
        process.env.NODE_ENV !== "production" ? warning(false, 'Relay: Call to `refetch` returned a different id, expected ' + '`%s`, got `%s`, on `%s` in `%s`. ' + 'Please make sure the server correctly implements ' + 'unique id requirement.', resultID, previousIDAndTypename.id, fragmentNode.name, componentDisplayName) : void 0;
      }
    }
  };
}

module.exports = useRefetchableFragmentNode;