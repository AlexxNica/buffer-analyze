import { actionTypes as asyncDataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/analyze-profile-selector';
import reducer, { actions as postsActions, actionTypes as postsActionTypes } from './reducer';

describe('reducer', () => {
  it('has no posts in initial state', () => {
    const posts = reducer(undefined, {
      type: 'TEST_ACTION',
    }).posts;
    expect(posts).toEqual([]);
  });
  it('initial state is loading', () => {
    const loading = reducer(undefined, {
      type: 'TEST_ACTION',
    }).loading;
    expect(loading).toBeTruthy();
  });
  it('has no posts upon receiving FETCH_START', () => {
    const posts = reducer(undefined, {
      type: `posts_${asyncDataFetchActions.FETCH_START}`,
    }).posts;
    expect(posts).toEqual([]);
  });
  it('on fetch_success stops loading', () => {
    const state = reducer(undefined, {
      type: `posts_${asyncDataFetchActions.FETCH_SUCCESS}`,
    });
    expect(state.loading).toBeFalsy();
  });
  it('updates the state with the posts received on fetch_success', () => {
    const posts = ['one', 'two', 'three'];
    const state = reducer(undefined, {
      type: `posts_${asyncDataFetchActions.FETCH_SUCCESS}`,
      result: posts,
    });
    expect(state.posts).toEqual(posts);
  });
  it('returns the initial state of posts when a new profile is selected', () => {
    const newState = reducer(undefined, {
      type: `${profileActionTypes.SELECT_PROFILE}`,
    });
    expect(newState.posts).toEqual([]);
  });
  it('updates the state when the dropdown is toggled', () => {
    const initialState = {
      isDropdownOpen: false,
    };
    const state = reducer(initialState, {
      type: `${postsActionTypes.TOGGLE_TOP_POSTS_DROPDOWN}`,
    });
    expect(state.isDropdownOpen).toBeTruthy();
  });
  it('updates the state when a new metric is selected', () => {
    const initialState = {
      isDropdownOpen: true,
    };
    const newState = reducer(initialState, {
      type: `${postsActionTypes.SELECT_TOP_POSTS_METRIC}`,
      metric: 'reactions',
      descending: false,
    });
    expect(newState).toEqual({
      isDropdownOpen: false,
      selectedMetric: 'reactions',
      isDescendingSelected: false,
    });
  });
  it('updates the state when a new posts count is selected', () => {
    const initialState = {};
    const newState = reducer(initialState, {
      type: `${postsActionTypes.SELECT_TOP_POSTS_COUNT}`,
      postsCount: 50,
    });
    expect(newState).toEqual({
      activePostsCount: 50,
    });
  });
  // testing actions
  it('returns the right action upon selectMetric', () => {
    const newAction = postsActions.selectMetric('reactions', false);
    expect(newAction).toEqual({
      type: `${postsActionTypes.SELECT_TOP_POSTS_METRIC}`,
      metric: 'reactions',
      descending: false,
    });
  });
  it('returns the right action upon toggleDropdown', () => {
    const newAction = postsActions.toggleDropdown();
    expect(newAction).toEqual({
      type: `${postsActionTypes.TOGGLE_TOP_POSTS_DROPDOWN}`,
    });
  });
  it('returns the right action upon handlePostsCountClick', () => {
    const newAction = postsActions.handlePostsCountClick(50);
    expect(newAction).toEqual({
      type: `${postsActionTypes.SELECT_TOP_POSTS_COUNT}`,
      postsCount: 50,
    });
  });
});
