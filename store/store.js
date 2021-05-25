import React, { useReducer, createContext } from 'react';
import Reducer from './reducer';

const initialState = { directoryPath: null, entries: [], refs: {} };

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}


export const ActionTypes = {
  UPDATE_REFS: 'UPDATE_INPUT_REFS',
  UPDATE_DIRECTORY_PATH: 'UPDATE_DIRECTORY_PATH',
  EXECUTE: 'EXECUTE_RENAME',
  TEST_PREVIEW: 'TEST_PREVIEW',
};


export const StoreContext = createContext(initialState);
export default Store;