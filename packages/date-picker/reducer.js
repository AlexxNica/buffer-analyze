import moment from 'moment';

import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = {
  OPEN_DATE_PICKER: 'OPEN_DATE_PICKER',
  CLOSE_DATE_PICKER: 'CLOSE_DATE_PICKER',
  SET_MONTH: 'SET_MONTH',
  SET_DATE_RANGE: 'SET_DATE_RANGE',
  SET_START_DATE: 'SET_START_DATE',
  CLEAR_START_DATE: 'CLEAR_START_DATE',
  SET_END_DATE: 'SET_END_DATE',
  CLEAR_END_DATE: 'CLEAR_END_DATE',
  OPEN_CALENDAR: 'OPEN_CALENDAR',
  CLOSE_CALENDAR: 'CLOSE_CALENDAR',
};

function calculateDateRange(range) {
  const startDate = moment().subtract(range + 1, 'days').unix();
  const endDate = moment().subtract(1, 'days').unix();
  return { startDate, endDate };
}

const initialState = {
  loading: true,
  open: false,
  calendarOpen: false,
  minDate: null,
  maxDate: moment().valueOf(),
  month: moment().startOf('month').unix(),
  ...calculateDateRange(7),
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MONTH:
      return {
        ...state,
        month: action.date,
      };
    case actionTypes.CLEAR_START_DATE:
      return {
        ...state,
        startDate: null,
      };
    case actionTypes.SET_START_DATE:
      return {
        ...state,
        startDate: action.date,
      };
    case actionTypes.CLEAR_END_DATE:
      return {
        ...state,
        endDate: null,
      };
    case actionTypes.SET_END_DATE:
      return {
        ...state,
        endDate: action.date,
      };
    case actionTypes.SET_DATE_RANGE:
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate,
        previousStartDate: null,
        previousEndDate: null,
      };
    case `analytics_start_date_${asyncDataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case `analytics_start_date_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        minDate: action.result,
      };
    case actionTypes.OPEN_DATE_PICKER:
      return {
        ...state,
        open: true,
      };
    case actionTypes.CLOSE_DATE_PICKER:
      return {
        ...state,
        open: false,
        calendarOpen: false,
        startDate: state.previousStartDate ? state.previousStartDate : state.startDate,
        endDate: state.previousEndDate ? state.previousEndDate : state.endDate,
      };
    case actionTypes.OPEN_CALENDAR:
      return {
        ...state,
        calendarOpen: true,
        previousStartDate: state.startDate,
        previousEndDate: state.endDate,
        startDate: null,
        endDate: null,
      };
    default:
      return state;
  }
};

export const actions = {
  open: () => ({
    type: actionTypes.OPEN_DATE_PICKER,
  }),
  close: () => ({
    type: actionTypes.CLOSE_DATE_PICKER,
  }),
  openCalendar: () => ({
    type: actionTypes.OPEN_CALENDAR,
  }),
  setStartDate: date => ({
    type: actionTypes.SET_START_DATE,
    date,
  }),
  clearStartDate: () => ({
    type: actionTypes.CLEAR_START_DATE,
  }),
  setEndDate: date => ({
    type: actionTypes.SET_END_DATE,
    date,
  }),
  clearEndDate: () => ({
    type: actionTypes.CLEAR_END_DATE,
  }),
  setDateRange: (startDate, endDate) => ({
    type: actionTypes.SET_DATE_RANGE,
    startDate,
    endDate,
  }),
  setDatePreset: range => ({
    type: actionTypes.SET_DATE_RANGE,
    ...calculateDateRange(range),
  }),
  setMonth: date => ({
    type: actionTypes.SET_MONTH,
    date,
  }),
};
