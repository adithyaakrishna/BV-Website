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

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var useIsMountedRef = require('./useIsMountedRef');

var useRelayEnvironment = require('./useRelayEnvironment');

var _require = require('./loadQuery'),
    loadQuery = _require.loadQuery,
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

var _require2 = require('react'),
    useCallback = _require2.useCallback,
    useEffect = _require2.useEffect,
    useRef = _require2.useRef,
    useState = _require2.useState;

var initialNullQueryReferenceState = {
  kind: 'NullQueryReference'
};

function useLoadQuery(preloadableRequest) {
  /**
   * We want to always call `queryReference.dispose()` for every call to
   * `setQueryReference(loadQuery(...))` so that no leaks of data in Relay stores
   * will occur.
   *
   * However, a call to `setState(newState)` is not always followed by a commit where
   * this value is reflected in the state. Thus, we cannot reliably clean up each
   * ref with `useEffect(() => () => queryReference.dispose(), [queryReference])`.
   *
   * Instead, we keep track of each call to `loadQuery` in a ref.
   * Relying on the fact that if a state change commits, no state changes that were
   * initiated prior to the currently committing state change will ever subsequently
   * commit, we can safely dispose of all preloaded query references
   * associated with state changes initiated prior to the currently committing state
   * change.
   *
   * Finally, when the hook unmounts, we also dispose of all remaining uncommitted
   * query references.
   */
  var environment = useRelayEnvironment();
  useTrackLoadQueryInRender();
  var isMountedRef = useIsMountedRef();
  var undisposedQueryReferencesRef = useRef(new Set([initialNullQueryReferenceState]));

  var _useState = useState(initialNullQueryReferenceState),
      queryReference = _useState[0],
      setQueryReference = _useState[1];

  var disposeQuery = useCallback(function () {
    if (isMountedRef.current) {
      var nullQueryReference = {
        kind: 'NullQueryReference'
      };
      undisposedQueryReferencesRef.current.add(nullQueryReference);
      setQueryReference(nullQueryReference);
    }
  }, [setQueryReference, isMountedRef]);
  useEffect(function ensureQueryReferenceDisposal() {
    // We are relying on the fact that sets iterate in insertion order, and we
    // can remove items from a set as we iterate over it (i.e. no iterator
    // invalidation issues.) Thus, it is safe to loop through
    // undisposedQueryReferences until we find queryReference, and
    // remove and dispose all previous references.
    //
    // We are guaranteed to find queryReference in the set, because if a
    // state change results in a commit, no state changes initiated prior to that
    // one will be committed, and we are disposing and removing references
    // associated with commits that were initiated prior to the currently
    // committing state change. (A useEffect callback is called during the commit
    // phase.)
    var undisposedQueryReferences = undisposedQueryReferencesRef.current;

    if (isMountedRef.current) {
      var _iterator = _createForOfIteratorHelper(undisposedQueryReferences),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var undisposedQueryReference = _step.value;

          if (undisposedQueryReference === queryReference) {
            break;
          }

          undisposedQueryReferences["delete"](undisposedQueryReference);

          if (undisposedQueryReference.kind !== 'NullQueryReference') {
            undisposedQueryReference.dispose();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, [queryReference, isMountedRef]);
  useEffect(function () {
    return function disposeAllRemainingQueryReferences() {
      // undisposedQueryReferences.current is never reassigned
      // eslint-disable-next-line react-hooks/exhaustive-deps
      var _iterator2 = _createForOfIteratorHelper(undisposedQueryReferencesRef.current),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var unhandledStateChange = _step2.value;

          if (unhandledStateChange.kind !== 'NullQueryReference') {
            unhandledStateChange.dispose();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
  }, []);
  var queryLoaderCallback = useCallback(function (variables, options) {
    if (isMountedRef.current) {
      var updatedQueryReference = loadQuery(environment, preloadableRequest, variables, options);
      undisposedQueryReferencesRef.current.add(updatedQueryReference);
      setQueryReference(updatedQueryReference);
    }
  }, [environment, preloadableRequest, setQueryReference, isMountedRef]);
  return [queryReference.kind === 'NullQueryReference' ? null : queryReference, queryLoaderCallback, disposeQuery];
}

module.exports = useLoadQuery;