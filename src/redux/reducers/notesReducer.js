import _ from 'lodash';
import { actionTypes as notesActions } from '../actions/notesActions';

const initialState = {
  notes: {},
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case notesActions.SET_MAP_DATA: {
        const newState = _.cloneDeep(state);
        newState.mapData = action.payload.data;
        return newState;
    }

    case notesActions.SET_MAP_OPTIONS: {
      const newState = _.cloneDeep(state);
      newState.mapConfig = action.payload.options;
      newState.theme = action.payload.theme;
      return newState;
  }

  case notesActions.SET_NOTES: {
    const newState = _.cloneDeep(state);
    newState.notes = action.payload.notes;
    return newState;
  }
  
  case notesActions.SET_SPACES: {
    const newState = _.cloneDeep(state);
    newState.spaces = action.payload.rooms;
    return newState;
  }

  case notesActions.SET_FLOOR: {
    const newState = _.cloneDeep(state);
    newState.selectedFloor = action.payload.floor;
    return newState;
  }
  
  case notesActions.SET_SELECTED_SPACE: {
    const newState = _.cloneDeep(state);
    newState.selectedSpace = action.payload.space;
    return newState;
  }
  
  case notesActions.SET_USER_EVENTS: {
    const newState = _.cloneDeep(state);
    newState.events = action.payload.events;
    return newState;
  }

    default:
      return state;
  }
}
