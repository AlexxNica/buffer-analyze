import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';

import PostsCountBar from './index';

storiesOf('PostsCountBar')
  .addDecorator(checkA11y)
  .add('should render', () => (
    <div style={{ width: '260px', display: 'flex' }}>
      <PostsCountBar
        activePostsCount={10}
        handlePostsCountClick={action('handlePostsCountClick')}
      />
    </div>
  ));
