import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from '@bufferapp/components';
import classNames from 'classnames';
import {
  container,
  buttonItem,
  buttonActive,
} from './style.less';

function getButtons (postsCounts, activePostsCount, handlePostsCountClick) {
  return postsCounts.map((button) => {
    const active = button.value === activePostsCount;
    const buttonClass = classNames(buttonItem, {
      [buttonActive]: active,
    });
    return (
      <li  // eslint-disable-line
        key={button.value}
        className={buttonClass}
        onClick={() => handlePostsCountClick({ postsCount: button.value })}
      >
        {button.value}
      </li>
    );
  });
}

const PostsCountBar = ({ postsCounts, activePostsCount, handlePostsCountClick }) => (
  <div>
    <Text size="small">Show</Text>
    <ul className={container}>
      {getButtons(postsCounts, activePostsCount, handlePostsCountClick)}
    </ul>
  </div>
);

PostsCountBar.propTypes = {
  postsCounts: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
  })),
  activePostsCount: PropTypes.number.isRequired,
  handlePostsCountClick: PropTypes.func.isRequired,
};

PostsCountBar.defaultProps = {
  postsCounts: [
    {
      value: 5,
    },
    {
      value: 10,
    },
    {
      value: 25,
    },
    {
      value: 50,
    },
  ],
};

export default PostsCountBar;
