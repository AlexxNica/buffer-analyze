export const instagram = {};

instagram.commentsMetric = {
  label: 'Comments',
  key: 'comments',
  apiKey: 'comments',
  color: '#EFDF00',
  value: 0,
};

instagram.likesMetric = {
  label: 'Likes',
  key: 'likes',
  apiKey: 'likes',
  color: '#FD8F90',
  value: 0,
};

instagram.topPostsEngagementMetrics = [
  instagram.likesMetric,
  instagram.commentsMetric,
];

instagram.postMetrics = [
  instagram.likesMetric,
  instagram.commentsMetric,
];

instagram.topPostsAudienceMetrics = [];


export const twitter = {};

twitter.retweetsMetric = {
  label: 'Retweets',
  key: 'retweets',
  apiKey: 'retweets',
  color: '#FD8F90',
  value: 0,
};

twitter.clicksMetric = {
  label: 'Clicks',
  key: 'url_clicks',
  apiKey: 'url_clicks',
  color: '#98E8B2',
  value: 0,
};

twitter.impressionsMetric = {
  label: 'Impressions',
  key: 'impressions',
  apiKey: 'impressions',
  color: '#FEC78B',
  value: 0,
};

twitter.likesMetric = {
  label: 'Likes',
  key: 'favorites',
  apiKey: 'favorites',
  color: '#8FC6DB',
  value: 0,
};

twitter.topPostsEngagementMetrics = [
  twitter.clicksMetric,
  twitter.retweetsMetric,
  twitter.likesMetric,
];

twitter.postMetrics = [
  twitter.impressionsMetric,
  twitter.clicksMetric,
  twitter.retweetsMetric,
  twitter.likesMetric,
];

twitter.topPostsAudienceMetrics = [
  twitter.impressionsMetric,
];

// Facebook Metrics Configuration
export const facebook = {};

facebook.commentsMetric = {
  label: 'Comments',
  key: 'comments',
  apiKey: 'comments',
  color: '#EFDF00',
  value: 0,
};

facebook.postClicksMetric = {
  label: 'Post Clicks',
  key: 'post_clicks',
  apiKey: 'post_clicks',
  color: '#98E8B2',
  value: 0,
};

facebook.impressionsMetric = {
  label: 'Post Impressions',
  key: 'post_impressions',
  apiKey: 'post_impressions',
  color: '#8AC6DE',
  value: 0,
};

facebook.postReachMetric = {
  label: 'Post Reach',
  key: 'post_reach',
  apiKey: 'post_reach',
  color: '#FFC880',
  value: 0,
};

facebook.reactionsMetric = {
  label: 'Reactions',
  key: 'reactions',
  apiKey: 'reactions',
  color: '#FD8F90',
  value: 0,
};

facebook.sharesMetric = {
  label: 'Shares',
  key: 'shares',
  apiKey: 'shares',
  color: '#D2C3AB',
  value: 0,
};

facebook.topPostsEngagementMetrics = [
  facebook.postClicksMetric,
  facebook.reactionsMetric,
  facebook.commentsMetric,
  facebook.sharesMetric,
];

facebook.postMetrics = [
  facebook.impressionsMetric,
  facebook.postReachMetric,
  facebook.postClicksMetric,
  facebook.reactionsMetric,
  facebook.commentsMetric,
  facebook.sharesMetric,
];

facebook.topPostsAudienceMetrics = [
  facebook.impressionsMetric,
  facebook.postReachMetric,
];

// Exports
export const metricsConfig = {
  twitter,
  facebook,
  instagram,
};

