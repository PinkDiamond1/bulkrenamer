import { ActionTypes } from './store';
import ExecuteOperations, { Rename, RefsToValues } from './operations';


const Reducer = (state, action) => {
  switch(action.type) {
    case ActionTypes.UPDATE_DIRECTORY_PATH: {
      return { ...state, entries: action.listOfFiles, directoryPath: action.path }
    }

    case ActionTypes.UPDATE_REFS: {
      const flatten = Object.keys(action.refs)
        .reduce((acc, key) => ({ ...acc, ...action.refs[key] }), {});
      return (!state.refs.add) ? { ...state, refs: flatten } : state;
    }

    case ActionTypes.EXECUTE: {
      Rename(state, action);
      return { ...state, directoryPath: '', entries: [] };
    }

    case ActionTypes.TEST_PREVIEW: {
      const vals = RefsToValues(state.refs);
      const result = ExecuteOperations(vals, action.string);
      action.onSuccess && action.onSuccess(result);
      return state;
    }
  }
}

export default Reducer;