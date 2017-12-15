import React from 'react';
import PropTypes from 'prop-types';

import TopPostsDropdown from './components/TopPostsDropdown';
import PostsCountBar from './components/PostsCountBar';

const topPostsHeaderContainer = {
  padding: '0 0 1rem',
  display: 'flex',
  justifyContent: 'space-between',
};

const TopPostsHeader = ({
  metrics,
  selectedMetric,
  isDropdownOpen,
  isDescendingSelected,
  selectMetric,
  toggleDropdown,
  handlePostsCountClick,
  activePostsCount,
  postsCounts,
}) =>
  <div style={topPostsHeaderContainer}>
    <PostsCountBar
      handlePostsCountClick={handlePostsCountClick}
      activePostsCount={activePostsCount}
      postsCounts={postsCounts}
    />
    <TopPostsDropdown
      metrics={metrics}
      selectedMetric={selectedMetric}
      isDropdownOpen={isDropdownOpen}
      isDescendingSelected={isDescendingSelected}
      selectMetric={selectMetric}
      toggleDropdown={toggleDropdown}
    />
  </div>
;

TopPostsHeader.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectedMetric: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  isDescendingSelected: PropTypes.bool.isRequired,
  selectMetric: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  handlePostsCountClick: PropTypes.func.isRequired,
  activePostsCount: PropTypes.string.isRequired,
  postsCounts: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
};

TopPostsHeader.defaultProps = {
  postsCounts: undefined,
};

export default TopPostsHeader;
