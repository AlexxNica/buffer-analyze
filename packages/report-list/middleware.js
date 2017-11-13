import { LOCATION_CHANGE } from 'react-router-redux';
import { actions, actionTypes } from '@bufferapp/async-data-fetch';

export default store => next => (action) => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case `user_${actionTypes.FETCH_SUCCESS}`:
      store.dispatch(actions.fetch({
        name: 'list_reports',
        args: {
          userId: action.result.id,
        },
      }));
      break;
    case LOCATION_CHANGE:
      if (action.payload.pathname === '/reports') {
        store.dispatch(actions.fetch({
          name: 'list_reports',
          args: {
            userId: store.getState().appSidebar.user.id,
          },
        }));
      }
      break;
    default:
      break;
  }
  return next(action);
};
