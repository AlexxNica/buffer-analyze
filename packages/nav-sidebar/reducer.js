import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

const initialState = {
  profiles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        profiles: action.result,
      };
    default:
      return state;
  }
};
