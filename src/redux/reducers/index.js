import notesReducer from './notesReducer';

const rootReducer = (state = {}, action = '') => {

  return {
    notesReducer: notesReducer(state.notesReducer, action),
  };
};

export default rootReducer;
