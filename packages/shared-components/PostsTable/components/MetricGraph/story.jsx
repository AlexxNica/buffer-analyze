import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';

import MetricGraph from './index';

storiesOf('MetricGraph')
  .addDecorator(checkA11y)
  .add('should render MetricGraph with maxValue greater than 0', () => (
    <div style={{ width: '260px', display: 'flex' }}>
      <MetricGraph
        metric={{
          maxValue: 100,
          value: 30,
          color: '#FD8F90',
          key: 'reactions',
          label: 'Reactions',
        }}
      />
    </div>
  ))
  .add('should render MetricGraph with maxValue less than 0', () => (
    <div style={{ width: '260px', display: 'flex' }}>
      <MetricGraph
        metric={{
          maxValue: -12,
          value: 30,
          color: '#FD8F90',
          key: 'reactions',
          label: 'Reactions',
        }}
      />
    </div>
  ));
