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

var getPaginationMetadata = require('./getPaginationMetadata');

var useLoadMoreFunction = require('./useLoadMoreFunction');

var useRefetchableFragmentNode = require('./useRefetchableFragmentNode');

var useStaticFragmentNodeWarning = require('./useStaticFragmentNodeWarning');

var _require = require('react'),
    useCallback = _require.useCallback,
    useDebugValue = _require.useDebugValue,
    useState = _require.useState;

var _require2 = require('relay-runtime'),
    getFragment = _require2.getFragment,
    getFragmentIdentifier = _require2.getFragmentIdentifier;

function usePaginationFragment(fragmentInput, parentFragmentRef) {
  var fragmentNode = getFragment(fragmentInput);
  useStaticFragmentNodeWarning(fragmentNode, 'first argument of usePaginationFragment()');
  var componentDisplayName = 'usePaginationFragment()';

  var _getPaginationMetadat = getPaginationMetadata(fragmentNode, componentDisplayName),
      connectionPathInFragmentData = _getPaginationMetadat.connectionPathInFragmentData,
      paginationRequest = _getPaginationMetadat.paginationRequest,
      paginationMetadata = _getPaginationMetadat.paginationMetadata,
      identifierField = _getPaginationMetadat.identifierField;

  var _useRefetchableFragme = useRefetchableFragmentNode(fragmentNode, parentFragmentRef, componentDisplayName),
      fragmentData = _useRefetchableFragme.fragmentData,
      fragmentRef = _useRefetchableFragme.fragmentRef,
      refetch = _useRefetchableFragme.refetch;

  var fragmentIdentifier = getFragmentIdentifier(fragmentNode, fragmentRef); // Backward pagination

  var _useLoadMore = useLoadMore({
    componentDisplayName: componentDisplayName,
    connectionPathInFragmentData: connectionPathInFragmentData,
    direction: 'backward',
    fragmentData: fragmentData,
    fragmentIdentifier: fragmentIdentifier,
    fragmentNode: fragmentNode,
    fragmentRef: fragmentRef,
    identifierField: identifierField,
    paginationMetadata: paginationMetadata,
    paginationRequest: paginationRequest
  }),
      loadPrevious = _useLoadMore[0],
      hasPrevious = _useLoadMore[1],
      isLoadingPrevious = _useLoadMore[2],
      disposeFetchPrevious = _useLoadMore[3]; // Forward pagination


  var _useLoadMore2 = useLoadMore({
    componentDisplayName: componentDisplayName,
    connectionPathInFragmentData: connectionPathInFragmentData,
    direction: 'forward',
    fragmentData: fragmentData,
    fragmentIdentifier: fragmentIdentifier,
    fragmentNode: fragmentNode,
    fragmentRef: fragmentRef,
    identifierField: identifierField,
    paginationMetadata: paginationMetadata,
    paginationRequest: paginationRequest
  }),
      loadNext = _useLoadMore2[0],
      hasNext = _useLoadMore2[1],
      isLoadingNext = _useLoadMore2[2],
      disposeFetchNext = _useLoadMore2[3];

  var refetchPagination = useCallback(function (variables, options) {
    disposeFetchNext();
    disposeFetchPrevious();
    return refetch(variables, _objectSpread({}, options, {
      __environment: undefined
    }));
  }, [disposeFetchNext, disposeFetchPrevious, refetch]);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDebugValue({
      fragment: fragmentNode.name,
      data: fragmentData,
      hasNext: hasNext,
      isLoadingNext: isLoadingNext,
      hasPrevious: hasPrevious,
      isLoadingPrevious: isLoadingPrevious
    });
  }

  return {
    data: fragmentData,
    loadNext: loadNext,
    loadPrevious: loadPrevious,
    hasNext: hasNext,
    hasPrevious: hasPrevious,
    isLoadingNext: isLoadingNext,
    isLoadingPrevious: isLoadingPrevious,
    refetch: refetchPagination
  };
}

function useLoadMore(args) {
  var _useState = useState(false),
      isLoadingMore = _useState[0],
      setIsLoadingMore = _useState[1];

  var observer = {
    start: function start() {
      return setIsLoadingMore(true);
    },
    complete: function complete() {
      return setIsLoadingMore(false);
    },
    error: function error() {
      return setIsLoadingMore(false);
    }
  };

  var handleReset = function handleReset() {
    return setIsLoadingMore(false);
  };

  var _useLoadMoreFunction = useLoadMoreFunction(_objectSpread({}, args, {
    observer: observer,
    onReset: handleReset
  })),
      loadMore = _useLoadMoreFunction[0],
      hasMore = _useLoadMoreFunction[1],
      disposeFetch = _useLoadMoreFunction[2];

  return [loadMore, hasMore, isLoadingMore, disposeFetch];
}

module.exports = usePaginationFragment;