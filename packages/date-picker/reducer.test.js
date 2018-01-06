import moment from 'moment';
import { actionTypes as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import reducer, { actions, actionTypes } from './reducer';

describe('reducer', () => {
  describe('initial state', () => {
    let state;

    beforeEach(() => {
      state = reducer(undefined, {
        type: 'TEST_ACTION',
      });
    });

    it('is loading', () => {
      expect(state.loading).toBeTruthy();
    });

    it('has the past seven days date range selected', () => {
      const yesterday = moment().subtract(1, 'day').format('MM/DD/YYYY');
      const sevenDaysAgo = moment().subtract(8, 'day').format('MM/DD/YYYY');
      expect(moment.unix(state.startDate).format('MM/DD/YYYY')).toBe(sevenDaysAgo);
      expect(moment.unix(state.endDate).format('MM/DD/YYYY')).toBe(yesterday);
    });

    it('is closed', () => {
      expect(state.open).toBe(false);
    });

    it('has no minimum date set', () => {
      expect(state.minDate).toBe(null);
    });
  });

  describe('opening and closing the date picker', () => {
    it(`should open when receiving ${actionTypes.OPEN_DATE_PICKER}`, () => {
      const state = reducer(undefined, {
        type: actionTypes.OPEN_DATE_PICKER,
      });
      expect(state.open).toBeTruthy();
    });

    it(`should close when receiving ${actionTypes.CLOSE_DATE_PICKER}`, () => {
      const state = reducer(undefined, {
        type: actionTypes.CLOSE_DATE_PICKER,
      });
      expect(state.open).toBe(false);
    });

    it('should bring back the previous start and end dates if no custom date range has been selected', () => {
      const state = reducer(undefined, {
        type: actionTypes.OPEN_CALENDAR,
      });
      const closedDatePickerState = reducer(state, {
        type: actionTypes.CLOSE_DATE_PICKER,
      });

      expect(closedDatePickerState.calendarOpen).toBe(false);
      expect(closedDatePickerState.startDate).toBe(state.previousStartDate);
      expect(closedDatePickerState.endDate).toBe(state.previousEndDate);
    });

    it('should keep the selected start and end dates if no previous date range was selected', () => {
      const state = reducer(undefined, {
        type: actionTypes.OPEN_DATE_PICKER,
      });
      const closedDatePickerState = reducer(state, {
        type: actionTypes.CLOSE_DATE_PICKER,
      });

      expect(closedDatePickerState.startDate).toBe(state.startDate);
      expect(closedDatePickerState.endDate).toBe(state.endDate);
    });
  });

  describe('set minimum start date', () => {
    it(`stops loading state when receiving analytics_start_date_${asyncDataFetchActions.FETCH_SUCCESS}`, () => {
      const state = reducer(undefined, {
        type: `analytics_start_date_${asyncDataFetchActions.FETCH_SUCCESS}`,
      });
      expect(state.loading).toBe(false);
    });

    it(`starts loading state when receiving analytics_start_date_${asyncDataFetchActions.FETCH_START}`, () => {
      const state = reducer(undefined, {
        type: `analytics_start_date_${asyncDataFetchActions.FETCH_SUCCESS}`,
      });
      const newState = reducer(state, {
        type: `analytics_start_date_${asyncDataFetchActions.FETCH_START}`,
      });
      expect(newState.loading).toBe(true);
    });

    it('sets the minimum date available', () => {
      const date = moment().subtract(34, 'days').unix();
      const state = reducer(undefined, {
        type: `analytics_start_date_${asyncDataFetchActions.FETCH_SUCCESS}`,
        result: date,
      });
      expect(state.minDate).toBe(date);
    });
  });
  describe('clear start and end dates', () => {
    it('CLEAR_START_DATE updates the start date', () => {
      const state = reducer(undefined, {
        type: actionTypes.CLEAR_START_DATE,
      });
      expect(state.startDate).toBe(null);
    });
    it('CLEAR_END_DATE updates the start date', () => {
      const state = reducer(undefined, {
        type: actionTypes.CLEAR_END_DATE,
      });
      expect(state.endDate).toBe(null);
    });
  });

  describe('set start and end dates', () => {
    it('SET_START_DATE updates the start date', () => {
      const startDate = moment().subtract(4, 'days').unix();
      const state = reducer(undefined, {
        type: actionTypes.SET_START_DATE,
        date: startDate,
      });
      expect(state.startDate).toBe(startDate);
    });
    it('SET_END_DATE updates the start date', () => {
      const endDate = moment.unix();
      const state = reducer(undefined, {
        type: actionTypes.SET_END_DATE,
        date: endDate,
      });
      expect(state.endDate).toBe(endDate);
    });
  });

  it('SET_MONTH updates the current month', () => {
    const month = moment().subtract(4, 'months').startOf('month').unix();
    const state = reducer(undefined, {
      type: actionTypes.SET_MONTH,
      date: month,
    });
    expect(state.month).toBe(month);
  });

  it(`changes the date range when receiving ${actionTypes.SET_DATE_RANGE}`, () => {
    const startDate = moment().subtract(4, 'days').unix();
    const endDate = moment().subtract(2, 'days').unix();
    const state = reducer(undefined, {
      type: actionTypes.SET_DATE_RANGE,
      startDate,
      endDate,
    });
    expect(state.startDate).toBe(startDate);
    expect(state.endDate).toBe(endDate);
  });

  describe('OPEN CALENDAR', () => {
    it('clears start and end dates', () => {
      const state = reducer(undefined, {
        type: actionTypes.OPEN_CALENDAR,
      });
      expect(state.startDate).toBe(null);
      expect(state.endDate).toBe(null);
    });

    it('stores temporally start and end dates', () => {
      const previousState = reducer(undefined, {});
      const state = reducer(undefined, {
        type: actionTypes.OPEN_CALENDAR,
      });
      expect(state.previousStartDate).toBe(previousState.startDate);
      expect(state.previousEndDate).toBe(previousState.endDate);
    });
  });
});

describe('actions', () => {
  describe('opening and closing', () => {
    it(`open triggers ${actionTypes.OPEN_DATE_PICKER}`, () => {
      expect(actions.open()).toEqual({
        type: actionTypes.OPEN_DATE_PICKER,
      });
    });
    it(`close triggers ${actionTypes.CLOSE_DATE_PICKER}`, () => {
      expect(actions.close()).toEqual({
        type: actionTypes.CLOSE_DATE_PICKER,
      });
    });
  });

  describe('set dates', () => {
    it(`setStartDate triggers ${actionTypes.SET_START_DATE}`, () => {
      const start = moment().subtract(30, 'days').unix();
      expect(actions.setStartDate(start)).toEqual({
        type: actionTypes.SET_START_DATE,
        date: start,
      });
    });
    it(`setEndDate triggers ${actionTypes.SET_END_DATE}`, () => {
      const end = moment().subtract(1, 'days').unix();
      expect(actions.setEndDate(end)).toEqual({
        type: actionTypes.SET_END_DATE,
        date: end,
      });
    });
  });

  describe('clear dates', () => {
    it(`clearStartDate triggers ${actionTypes.CLEAR_START_DATE}`, () => {
      expect(actions.clearStartDate()).toEqual({
        type: actionTypes.CLEAR_START_DATE,
      });
    });
    it(`clearEndDate triggers ${actionTypes.CLEAR_END_DATE}`, () => {
      expect(actions.clearEndDate()).toEqual({
        type: actionTypes.CLEAR_END_DATE,
      });
    });
  });

  it(`openCalendar triggers ${actionTypes.OPEN_CALENDAR}`, () => {
    expect(actions.openCalendar()).toEqual({
      type: actionTypes.OPEN_CALENDAR,
    });
  });

  it(`setDateRange triggers ${actionTypes.SET_DATE_RANGE}`, () => {
    const start = moment().subtract(30, 'days').unix();
    const end = moment().subtract(1, 'days').unix();
    expect(actions.setDateRange(start, end)).toEqual({
      type: actionTypes.SET_DATE_RANGE,
      startDate: start,
      endDate: end,
    });
  });

  it(`setMonth triggers ${actionTypes.SET_MONTH}`, () => {
    const date = moment().startOf('month').unix();
    expect(actions.setMonth(date)).toEqual({
      type: actionTypes.SET_MONTH,
      date,
    });
  });
});
