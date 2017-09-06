import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import {
  geyser,
} from '@bufferapp/components/style/color';
import GridItem from './index';


storiesOf('GridItem')
  .addDecorator(checkA11y)
  .add('should render a summary grid item with positive diff', () => (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0',
        margin: '0 auto',
        borderTop: `solid 1px ${geyser}`,
        borderLeft: `solid 1px ${geyser}`,
        borderRadius: '2px',
      }}
    >
      <GridItem
        metric={{
          label: 'Tweets',
          value: 150,
          diff: 50,
        }}
      />
    </ul>
  ))
  .add('should render a summary grid item with a neutral diff', () => (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0',
        margin: '0 auto',
        borderTop: `solid 1px ${geyser}`,
        borderLeft: `solid 1px ${geyser}`,
        borderRadius: '2px',
      }}
    >
      <GridItem
        metric={{
          label: 'Tweets',
          value: 0,
          diff: 0,
        }}
      />
    </ul>
  ))
  .add('should render a summary grid item with negative diff', () => (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0',
        margin: '0 auto',
        borderTop: `solid 1px ${geyser}`,
        borderLeft: `solid 1px ${geyser}`,
        borderRadius: '2px',
      }}
    >
      <GridItem
        metric={{
          label: 'Tweets',
          value: 10,
          diff: -60,
        }}
      />
    </ul>
  ));
