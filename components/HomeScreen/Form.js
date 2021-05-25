import React from 'react';
import { useTheme } from 'react-native-paper';

import { ActionTypes } from '@store/store';
import { AdditionCard } from './AdditionCard';
import { DeletionCard } from './DeletionCard';
import { ReplacementCard } from './ReplacementCard';
import { FormatCard } from './FormatCard';


/**
 * CreateRefs
 * Create refs for inputs of all the form fields and update the global store with the refs
 * @param {Object} _
 * @param {Object} dispatch is the dispatch for global store
 * @returns created refs
 */
const CreateRefs = (_, dispatch) => {

  // Create refs for all inputs to be used later by store
  const refs = {
    add: {
      prefixRef: React.useRef(null),
      suffixRef: React.useRef(null),
      insertValRef: React.useRef(null),
      insertAtRef: React.useRef(null),
    },
    delete: {
      lastRef: React.useRef(null),
      fromToStartRef: React.useRef(null),
      fromToEndRef: React.useRef(null),
    },
    replace: {
      replaceFindRef: React.useRef(null),
      replaceReplaceRef: React.useRef(null),
      extensionValRef: React.useRef(null),
    },
    format: {
      caseRef: React.useRef(null),
      moveFromStartRef: React.useRef(null),
      moveFromEndRef: React.useRef(null),
      moveToRef: React.useRef(null),
    }
  };

  React.useEffect(() => {
    dispatch({
      type: ActionTypes.UPDATE_REFS,
      refs: refs
    });
  }, []);
  return refs;
};


/**
 * Form
 * This component creates the cards.
 * It updates once during the life of the app.
 */
export const Form = React.memo(({ state, dispatch }) => {

  const { colors } = useTheme();
  const refs = CreateRefs(state, dispatch);

  return (
    <React.Fragment>
      <AdditionCard colors={colors} refs={refs.add} />
      <DeletionCard colors={colors} refs={refs.delete} />
      <ReplacementCard colors={colors} refs={refs.replace} />
      <FormatCard colors={colors} refs={refs.format} />
    </React.Fragment>
  );
}, (prevProps, nextProps) => (
  Object.keys(prevProps.state.refs).length === Object.keys(nextProps.state.refs).length
));
