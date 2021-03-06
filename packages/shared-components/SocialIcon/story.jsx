import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import SocialIcon from './index';

storiesOf('SocialIcon')
  .addDecorator(checkA11y)
  .add('should render', () => (
    <SocialIcon
      service={'facebook'}
      socialIconSize={16}
      avatarSize={32}
    />
  ));

