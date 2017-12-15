import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostsTable } from '@bufferapp/analyze-shared-components';
import AddReport from '@bufferapp/add-report';

import { actions } from './reducer';

export const PostsTableWrapper = props => (<div id="js-dom-to-png-posts"><PostsTable
  {...props}
  postsCounts={[
    { value: '5' },
    { value: '10' },
    { value: '25' },
    { value: '50' },
    { value: 'All' },
  ]}
  addToReportButton={<AddReport
    chart="posts"
    state={{
      descending: props.isDescendingSelected,
      sortBy: props.selectedMetric.apiKey,
      limit: props.activePostsCount,
    }}
  />}
/></div>);

PostsTableWrapper.defaultProps = {
  isDropdownOpen: false,
  loading: false,
};

PostsTableWrapper.propTypes = {
  isDescendingSelected: PropTypes.bool.isRequired,
  selectedMetric: PropTypes.shape({
    key: PropTypes.string,
    apiKey: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  activePostsCount: PropTypes.string.isRequired,
};

// default export = container
export default connect(
  (state, props) => ({
    title: 'Posts',
    loading: state.topPosts.loading,
    timezone: state.profiles.profiles.find(
      profile => profile.id === props.selectedProfileId,
    ).timezone,
    metrics: state.topPosts.topPosts,
    startDate: state.date.startDate,
    endDate: state.date.endDate,
    isDropdownOpen: state.topPosts.isDropdownOpen,
    isDescendingSelected: state.topPosts.isDescendingSelected,
    selectedMetric: state.topPosts.selectedMetric,
    activePostsCount: state.topPosts.activePostsCount,
  }),
  dispatch => ({
    selectMetric: ({ metric, descending }) => dispatch(
      actions.selectMetric(metric, descending),
    ),
    toggleDropdown: () => dispatch(actions.toggleDropdown()),
    handlePostsCountClick: ({ postsCount }) => dispatch(
      actions.handlePostsCountClick(postsCount),
    ),
  }),
)(PostsTableWrapper);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
