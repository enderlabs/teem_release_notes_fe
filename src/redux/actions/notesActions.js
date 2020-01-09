import _ from 'lodash';
import axios from 'axios';
import makeType from '../../utils/RSAA';

const authToken = 'Bearer aV88edC2Dg8CXmptOc0vKTi4PYRjKl'; // update this is space data doesn't load


export const actionTypes = {
  SET_MAP_DATA: makeType('SET_MAP_DATA'),
  SET_MAP_OPTIONS: makeType('SET_MAP_OPTIONS'),
  SET_FLOOR: 'SET_FLOOR',
  SET_SPACES: 'SET_SPACES',
  SET_SELECTED_SPACE: 'SET_SELECTED_SPACE',
  SET_USER_EVENTS: 'SET_USER_EVENTS',
  SET_NOTES: 'SET_NOTES'
};

export function getTicketInfo(tickedId, date) {
  return async function (dispatch) {
    console.log('get ticket info called');
    const fetch = {
      method: 'post',
      url: `https://teem-release-notes.herokuapp.com/`,
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json',
      },
      body: {
        tickedId,
        date
      }
    };
    try {
      const response = await axios(fetch);
      console.log(response);
      dispatch({
        type: actionTypes.SET_NOTES,
        payload: { notes: response.notes },
      })
    } catch (error) {
      console.log(error.message);
      console.log('GET NOTES FAILED');
    }
    return;
  }
}

