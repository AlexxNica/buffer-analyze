import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import PostsTable from './index';

const topPosts = [
  {
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
      comments: 35,
      post_clicks: 3067,
      post_impressions: 118807,
      post_reach: 15934,
      reactions: 222,
      shares: 233,
    },
    text: 'Procaffeinating (n): the tendency to not start anything until you\'ve had a coffee',
    type: 'picture',
  },
  {
    date: 1504702860000,
    id: '108311429241313_1678667888872318',
    media: {
      picture: 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/21314332_1678667648872342_5837561331042406631_n.jpg?oh=739aa8ab3fb7ca5dd00d11c369bde453&oe=5A153FC6',
      thumbnail: 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/21314332_1678667648872342_5837561331042406631_n.jpg?oh=739aa8ab3fb7ca5dd00d11c369bde453&oe=5A153FC6',
    },
    serviceLink: 'https://facebook.com/108311429241313/posts/1678667888872318',
    statistics: {
      comments: 15,
      post_clicks: 1666,
      post_impressions: 23297,
      post_reach: 8582,
      reactions: 196,
      shares: 54,
    },
    text: '📌 UPDATED for 2017:<br />\nThe official guide to Facebook Video requirements 📹<br />\n<br />\nvia Matt Navarra',
    type: 'picture',
  },
  {
    date: 1504868484000,
    id: '108311429241313_1681434551928985',
    media: {
      description: 'Creating great social media content takes time. Here are 18 powerful social media content tools (and tips for creating great content in just minutes).',
      expanded_link: 'https://blog.bufferapp.com/social-media-content-tools',
      link: 'https://buff.ly/2j3pxeD',
      preview: 'https://buffer-media-uploads.s3.amazonaws.com/56c20bd3bd3816f63c94c73f/ca5ecfa64e06c5e419eade3dfa369bfd.jpg',
      title: '19 Tools for Creating Engaging Social Media Videos, Images and GIFs in Minutes',
    },
    serviceLink: 'https://facebook.com/108311429241313/posts/1681434551928985',
    statistics: {
      comments: 6,
      post_clicks: 534,
      post_impressions: 14997,
      post_reach: 6095,
      reactions: 107,
      shares: 30,
    },
    text: 'Creating social media content takes time... And creating great social media content takes even longer!<br />\n<br />\n19 tools to help take your content to the next level in less time ⏰',
    type: 'link',
  },
];

storiesOf('PostsTable')
  .addDecorator(checkA11y)
  .add('should render the posts table', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <PostsTable
        title="Posts"
        timezone={'America/Los_Angeles'}
        profileService={'facebook'}
        metrics={topPosts}
        selectMetric={action('selectMetric')}
        selectedMetric={{
          key: 'post_impressions',
          label: 'Post Impressions',
        }}
        toggleDropdown={action('toggleDropdown')}
        isDescendingSelected
        handlePostsCountClick={action('handlePostsCountClick')}
        activePostsCount={10}
      />
    </div>
  ))
  .add('should render the posts table with default selected metric', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <PostsTable
        title="Posts"
        timezone={'America/Los_Angeles'}
        profileService={'facebook'}
        metrics={topPosts}
        selectMetric={action('selectMetric')}
        selectedMetric={{}}
        toggleDropdown={action('toggleDropdown')}
        isDescendingSelected
        handlePostsCountClick={action('handlePostsCountClick')}
        activePostsCount={10}
      />
    </div>
  ))
  .add('should render a loading state', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <PostsTable
        title="Posts"
        timezone={'America/Los_Angeles'}
        profileService={'facebook'}
        loading
        metrics={[]}
        selectMetric={action('selectMetric')}
        selectedMetric={{
          key: 'post_impressions',
          label: 'Post Impressions',
        }}
        toggleDropdown={action('toggleDropdown')}
        isDescendingSelected
        handlePostsCountClick={action('handlePostsCountClick')}
        activePostsCount={10}
      />
    </div>
  ))
  .add('should render a "no data" state', () => (
    <div
      style={{
        width: '750px',
      }}
    >
      <PostsTable
        title="Posts"
        timezone={'America/Los_Angeles'}
        profileService={'facebook'}
        metrics={[]}
        selectMetric={action('selectMetric')}
        selectedMetric={{
          key: 'post_impressions',
          label: 'Post Impressions',
        }}
        toggleDropdown={action('toggleDropdown')}
        isDescendingSelected
        handlePostsCountClick={action('handlePostsCountClick')}
        activePostsCount={10}
      />
    </div>
  ));
