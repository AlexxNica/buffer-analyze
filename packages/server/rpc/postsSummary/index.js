const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const moment = require('moment');
const DateRange = require('../utils/DateRange');

const LABELS = {
  facebook: {
    posts_count: 'Posts',
    post_impressions: 'Post Impressions',
    post_reach: 'Post Reach',
    reactions: 'Reactions',
    comments: 'Comments',
    shares: 'Shares',
  },
  twitter: {
    posts_count: 'Posts',
    retweets: 'Retweets',
    impressions: 'Impressions',
    favorites: 'Likes',
    replies: 'Replies',
    url_clicks: 'Clicks',
  },
  instagram: {
    posts_count: 'Posts',
    likes: 'Likes',
    comments: 'Comments',
  },
};

function shouldUseAnalyzeApi (profileService) {
  return profileService === 'instagram';
}

const requestPostsSummary = (profileId, profileService, dateRange, accessToken) =>
  rp({
    uri: (shouldUseAnalyzeApi(profileService) ?
      `${process.env.ANALYZE_API_ADDR}/metrics/totals` :
      `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/posts_summary.json`
    ),
    method: (shouldUseAnalyzeApi(profileService) ?
      'POST' :
      'GET'
    ),
    strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
    qs: {
      access_token: accessToken,
      start_date: dateRange.start,
      end_date: dateRange.end,
      profile_id: profileId,
    },
    json: true,
  });

const filterMetrics = metrics => metrics.filter(metric => metric.label !== undefined);

const percentageDifference = (value, pastValue) => {
  const difference = value - pastValue;
  return Math.ceil((difference / pastValue) * 100);
};

const summarize = (metric, currentPeriod, pastPeriod, profileService) => {
  const pastValue = pastPeriod[metric];
  const value = currentPeriod[metric];
  return {
    value,
    diff: percentageDifference(value, pastValue),
    label: LABELS[profileService][metric],
  };
};

module.exports = method(
  'posts_summary',
  'fetch analytics posts summary for profiles and pages',
  ({ profileId, profileService, startDate, endDate }, { session }) => {
    const end = moment.unix(endDate).format('MM/DD/YYYY');
    const start = moment.unix(startDate).format('MM/DD/YYYY');
    const dateRange = new DateRange(start, end);
    const previousDateRange = dateRange.getPreviousDateRange();

    const currentPeriod = requestPostsSummary(
      profileId,
      profileService,
      dateRange,
      session.analyze.accessToken,
    );
    const previousPeriod = requestPostsSummary(
      profileId,
      profileService,
      previousDateRange,
      session.analyze.accessToken,
    );

    return Promise
      .all([currentPeriod, previousPeriod])
      .then((response) => {
        const currentPeriodResult = response[0].response;
        const pastPeriodResult = response[1].response;
        const metrics = Object.keys(currentPeriodResult);
        return filterMetrics(metrics.map(metric =>
          summarize(metric, currentPeriodResult, pastPeriodResult, profileService),
        ));
      })
      .catch(() => []);
  },
);
