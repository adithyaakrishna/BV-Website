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

var loadEntryPoint = require('./loadEntryPoint');

var useIsMountedRef = require('./useIsMountedRef');

var _require = require('./loadQuery'),
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

var _require2 = require('react'),
    useCallback = _require2.useCallback,
    useEffect = _require2.useEffect,
    useRef = _require2.useRef,
    useState = _require2.useState;

var initialNullEntryPointReferenceState = {
  kind: 'NullEntryPointReference'
};

function useLoadEntryPoint(environmentProvider, entryPoint) {
  /**
   * We want to always call `entryPointReference.dispose()` for every call to
   * `setEntryPointReference(loadEntryPoint(...))` so that no leaks of data in Relay
   * stores will occur.
   *
   * However, a call to `setState(newState)` is not always followed by a commit where
   * this value is reflected in the state. Thus, we cannot reliably clean up each ref
   * with `useEffect(() => () => entryPointReference.dispose(), [entryPointReference])`.
   *
   * Instead, we keep track of each call to `loadEntryPoint` in a ref.
   * Relying on the fact that if a state change commits, no state changes that were
   * initiated prior to the currently committing state change will ever subsequently
   * commit, we can safely dispose of all preloaded entry point references
   * associated with state changes initiated prior to the currently committing state
   * change.
   *
   * Finally, when the hook unmounts, we also dispose of all remaining uncommitted
   * entry point references.
   */
  useTrackLoadQueryInRender();
  var isMountedRef = useIsMountedRef();
  var undisposedEntryPointReferencesRef = useRef(new Set([initialNullEntryPointReferenceState]));

  var _useState = useState(initialNullEntryPointReferenceState),
      entryPointReference = _useState[0],
      setEntryPointReference = _useState[1];

  var disposeEntryPoint = useCallback(function () {
    if (isMountedRef.current) {
      var nullEntryPointReference = {
        kind: 'NullEntryPointReference'
      };
      undisposedEntryPointReferencesRef.current.add(nullEntryPointReference);
      setEntryPointReference(nullEntryPointReference);
    }
  }, [setEntryPointReference, isMountedRef]);
  useEffect(function disposePriorEntryPointReferences() {
    // We are relying on the fact that sets iterate in insertion order, and we
    // can remove items from a set as we iterate over it (i.e. no iterator
    // invalidation issues.) Thus, it is safe to loop through
    // undisposedEntryPointReferences until we find entryPointReference, and
    // remove and dispose all previous references.
    //
    // We are guaranteed to find entryPointReference in the set, because if a
    // state change results in a commit, no state changes initiated prior to that
    // one will be committed, and we are disposing and removing references
    // associated with commits that were initiated prior to the currently
    // committing state change. (A useEffect callback is called during the commit
    // phase.)
    var undisposedEntryPointReferences = undisposedEntryPointReferencesRef.current;

    if (isMountedRef.current) {
      var _iterator = _createForOfIteratorHelper(undisposedEntryPointReferences),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var undisposedEntryPointReference = _step.value;

          if (undisposedEntryPointReference === entryPointReference) {
            break;
          }

          undisposedEntryPointReferences["delete"](undisposedEntryPointReference);

          if (undisposedEntryPointReference.kind !== 'NullEntryPointReference') {
            undisposedEntryPointReference.dispose();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, [entryPointReference, isMountedRef]);
  useEffect(function () {
    return function disposeAllRemainingEntryPointReferences() {
      // undisposedEntryPointReferences.current is never reassigned
      // eslint-disable-next-line react-hooks/exhaustive-deps
      var _iterator2 = _createForOfIteratorHelper(undisposedEntryPointReferencesRef.current),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var unhandledStateChange = _step2.value;

          if (unhandledStateChange.kind !== 'NullEntryPointReference') {
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
  var entryPointLoaderCallback = useCallback(function (params) {
    if (isMountedRef.current) {
      var updatedEntryPointReference = loadEntryPoint(environmentProvider, entryPoint, params);
      undisposedEntryPointReferencesRef.current.add(updatedEntryPointReference);
      setEntryPointReference(updatedEntryPointReference);
    }
  }, [environmentProvider, entryPoint, setEntryPointReference, isMountedRef]);
  return [entryPointReference.kind === 'NullEntryPointReference' ? null : entryPointReference, entryPointLoaderCallback, disposeEntryPoint];
}

module.exports = useLoadEntryPoint;