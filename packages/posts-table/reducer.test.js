import { actionTypes as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/analyze-profile-selector';
import reducer, { actions as topPostsActions, actionTypes as topPostsActionTypes } from './reducer';

describe('reducer', () => {
  it('has no topPosts in initial state', () => {
    const topPosts = reducer(undefined, {
      type: 'TEST_ACTION',
    }).topPosts;
    expect(topPosts).toEqual([]);
  });
  it('initial state is loading', () => {
    const loading = reducer(undefined, {
      type: 'TEST_ACTION',
    }).loading;
    expect(loading).toBeTruthy();
  });
  it('has no top posts upon receiving FETCH_START', () => {
    const topPosts = reducer(undefined, {
      type: `top_posts_${asyncDataFetchActions.FETCH_START}`,
    }).topPosts;
    expect(topPosts).toEqual([]);
  });
  it('on fetch_success stops loading', () => {
    const state = reducer(undefined, {
      type: `top_posts_${asyncDataFetchActions.FETCH_SUCCESS}`,
    });
    expect(state.loading).toBeFalsy();
  });
  it('updates the state with the posts received on fetch_success', () => {
    const topPosts = ['one', 'two', 'three'];
    const state = reducer(undefined, {
      type: `top_posts_${asyncDataFetchActions.FETCH_SUCCESS}`,
      result: topPosts,
    });
    expect(state.topPosts).toEqual(topPosts);
  });
  it('returns the initial state of top posts when a new profile is selected', () => {
    const newState = reducer(undefined, {
      type: `${profileActionTypes.SELECT_PROFILE}`,
    });
    expect(newState.topPosts).toEqual([]);
  });
  it('updates the state when the dropdown is toggled', () => {
    const initialState = {
      isDropdownOpen: false,
    };
    const state = reducer(initialState, {
      type: `${topPostsActionTypes.TOGGLE_TOP_POSTS_DROPDOWN}`,
    });
    expect(state.isDropdownOpen).toBeTruthy();
  });
  it('updates the state when a new metric is selected', () => {
    const initialState = {
      isDropdownOpen: true,
    };
    const newState = reducer(initialState, {
      type: `${topPostsActionTypes.SELECT_TOP_POSTS_METRIC}`,
      metric: 'reactions',
      descending: false,
    });
    expect(newState).toEqual({
      isDropdownOpen: false,
      selectedMetric: 'reactions',
      isDescendingSelected: false,
    });
  });
  it('updates the state when a new top posts count is selected', () => {
    const initialState = {};
    const newState = reducer(initialState, {
      type: `${topPostsActionTypes.SELECT_TOP_POSTS_COUNT}`,
      postsCount: 50,
    });
    expect(newState).toEqual({
      activePostsCount: 50,
    });
  });
  // testing actions
  it('returns the right action upon selectMetric', () => {
    const newAction = topPostsActions.selectMetric('reactions', false);
    expect(newAction).toEqual({
      type: `${topPostsActionTypes.SELECT_TOP_POSTS_METRIC}`,
      metric: 'reactions',
      descending: false,
    });
  });
  it('returns the right action upon toggleDropdown', () => {
    const newAction = topPostsActions.toggleDropdown();
    expect(newAction).toEqual({
      type: `${topPostsActionTypes.TOGGLE_TOP_POSTS_DROPDOWN}`,
    });
  });
  it('returns the right action upon handlePostsCountClick', () => {
    const newAction = topPostsActions.handlePostsCountClick(50);
    expect(newAction).toEqual({
      type: `${topPostsActionTypes.SELECT_TOP_POSTS_COUNT}`,
      postsCount: 50,
    });
  });
});
