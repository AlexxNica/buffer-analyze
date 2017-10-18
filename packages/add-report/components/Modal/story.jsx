import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import Modal from './index';

storiesOf('Modal')
  .addDecorator(checkA11y)
  .add('unopened', () => (
    <Modal />
  ))
  .add('open', () => (
    <Modal open addReport={action('add report')} />
  ));
