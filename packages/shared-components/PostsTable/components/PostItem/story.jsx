import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PostItem from './index';

const post = {
  date: 1504609289000,
  id: '108311429241313_1678040122268428',
  media: {
    picture:
    'https://buffer-media-uploads.s3.amazonaws.com/59a4711d7cbc83d309960116/5ed19955e0c4785b990ec752ff6df55c367f9808_82f6ee1b0595df873cb2135b669200524d6bd746_facebook',
    thumbnail:
    'https://buffer-media-uploads.s3.amazonaws.com/59a4711d7cbc83d309960116/5ed19955e0c4785b990ec752ff6df55c367f9808_dc779030b683e4f41ffa863f5c88795128de1d58_thumbnail',
  },
  serviceLink: 'https://facebook.com/108311429241313/posts/1678040122268428',
  statistics: {
    comments: 10,
    postClicks: 122,
    postImpressions: 123333,
    postReach: 12122,
    reactions: 123,
    shares: 233,
  },
  text: 'Procaffeinating (n): the tendency to not start anything until you\'ve had a coffee',
  type: 'picture',
};

storiesOf('PostItem')
  .addDecorator(checkA11y)
  .add('should render the top posts item', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <PostItem
        post={post}
        index={122}
        maxEngagementValue={500}
        maxAudienceValue={200000}
        engagementMetrics={[
          {
            apiKey: 'post_clicks',
            average: 0,
            averageDiff: 0,
            averageLabel: 'Clicks average',
            averageLowerCaseLabel: 'clicks',
            color: '#98E8B2',
            diff: 0,
            key: 'postClicks',
            label: 'Post Clicks',
            lowerCaseLabel: 'post clicks',
            maxValue: 400,
            previousAverage: 0,
            previousValue: 0,
            supportsPeriodTotal: true,
            value: 122,
          },
          {
            apiKey: 'reactions',
            average: 0,
            averageDiff: 0,
            averageLabel: 'Reactions',
            averageLowerCaseLabel: 'reactions',
            color: '#FD8F90',
            diff: 0,
            key: 'reactions',
            label: 'Reactions',
            lowerCaseLabel: 'reactions',
            maxValue: 5000,
            previousAverage: 0,
            previousValue: 0,
            supportsPeriodTotal: true,
            value: 3000,
          },
          {
            apiKey: 'comments',
            average: 0,
            averageDiff: 0,
            averageLabel: 'Comments',
            averageLowerCaseLabel: 'comments',
            color: '#EFDF00',
            diff: 0,
            key: 'comments',
            label: 'Comments',
            lowerCaseLabel: 'comments',
            maxValue: 2000,
            previousAverage: 0,
            previousValue: 0,
            supportsPeriodTotal: true,
            value: 120,
          },
          {
            apiKey: 'shares',
            average: 0,
            averageDiff: 0,
            averageLabel: 'Shares',
            averageLowerCaseLabel: 'Shares',
            color: '#D2C3AB',
            diff: 0,
            key: 'shares',
            label: 'Shares',
            lowerCaseLabel: 'shares',
            maxValue: 1222,
            previousAverage: 0,
            previousValue: 0,
            supportsPeriodTotal: true,
            value: 804,
          },
        ]}
        audienceMetrics={[
          {
            apiKey: 'post_impressions',
            average: 0,
            averageDiff: 0,
            averageLabel: 'Impressions averages',
            averageLowerCaseLabel: 'impressions',
            color: '#8AC6DE',
            diff: 0,
            key: 'postImpressions',
            label: 'Post Impressions',
            lowerCaseLabel: 'post impressions',
            maxValue: 253867,
            previousAverage: 0,
            previousValue: 0,
            supportsPeriodTotal: true,
            value: 14997,
          },
          {
            apiKey: 'post_reach',
            average: 0,
            averageDiff: 0,
            averageLabel: 'Post Reach',
            averageLowerCaseLabel: 'post reach',
            color: '#FFC880',
            diff: 0,
            key: 'postReach',
            label: 'Post Reach',
            lowerCaseLabel: 'post reach',
            maxValue: 0,
            previousAverage: 0,
            previousValue: 0,
            supportsPeriodTotal: true,
            value: 0,
          },
        ]}
        timezone={'America/Los_Angeles'}
      />
    </div>
  ))
  .add('should not render the top posts item when no metrics', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <PostItem
        post={post}
        index={122}
        maxEngagementValue={500}
        maxAudienceValue={200000}
        engagementMetrics={[]}
        audienceMetrics={[]}
        timezone={'America/Los_Angeles'}
      />
    </div>
  ));
