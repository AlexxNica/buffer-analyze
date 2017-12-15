import { actions } from '@bufferapp/async-data-fetch';
import { actionTypes } from '@bufferapp/analyze-profile-selector';
import { actionTypes as dateActionTypes } from '@bufferapp/analyze-date-picker';
import { actions as exportActions, actionTypes as exportActionTypes } from '@bufferapp/analyze-png-export';
import { actionTypes as exportCSVActionTypes, actions as exportCSVActions } from '@bufferapp/analyze-csv-export';

import { actionTypes as topPostsActionTypes } from './reducer';
import middleware from './middleware';

const profileId = '12359182129asd';

const state = {
  router: {
    location: {
      pathname: `/insights/twitter/${profileId}`,
    },
  },
  date: {
    startDate: '10/10/2016',
    endDate: '30/10/2016',
  },
  profiles: {
    selectedProfileId: '12359182129asd',
    profiles: [{
      id: '12359182129asd',
      timezone: 'Etc/UTC',
    }],
  },
  topPosts: {
    selectedMetric: {
      key: 'reactions',
      label: 'Reactions',
      apiKey: 'reactions',
    },
    isDescendingSelected: false,
    activePostsCount: 10,
    sortBy: 'reactions',
    topPosts: [
      {
        id: '59d7c0dcefda0ca07a6d3be1',
        type: 'picture',
        text: 'foo<br />bar',
        date: null,
        statistics: {
          retweets: 195,
          impressions: 50234,
          engagements: 3771,
          replies: 11,
          url_clicks: 40,
          favorites: 246,
        },
        media: {
          picture: 'https://buffer-media-uploads.s3.amazonaws.com/59d7c0dcefda0ca07a6d3be1/c4e1cd9d92da1b945aeaad71f8154255628d9409_1b29af5b1f061c5cb5660ec649bc8932eb722c96_twitter',
        },
      },
      {
        id: '59d7c108c126328b1c6d3bdf',
        type: 'video',
        text: 'Looking for a good read? The top 5 books all marketers &amp; social media managers should have in their library 📚',
        date: 1507638635000,
        serviceLink: 'https://twitter.com/buffer/status/917729065410449409',
        statistics: {
          retweets: 57,
          impressions: 33057,
          engagements: 392,
          replies: 2,
          url_clicks: 3,
          favorites: 110,
        },
        media: {
          video: {
            details: {
              transcoded_location: 'https://buffer-media-uploads.s3.amazonaws.com/56c20bd3bd3816f63c94c73f/597120f6a73330a8620f1e50/output/c5101f2498252c9d182ac27a4b4d8a84.original.mp4',
            },
          },
        },
      },
    ],
  },
};

describe('middleware', () => {
  const next = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: jest.fn(() => state),
  };
  it('should exist', () => {
    expect(middleware).toBeDefined();
  });

  it('should keep propagating the action through the chain', () => {
    const action = {
      type: 'TEST',
    };
    middleware(store)(next)(action);
  });

  it('shoud dispatch a data fetch for top posts once a profile has been selected', () => {
    const action = {
      type: actionTypes.SELECT_PROFILE,
      id: '12359182129asd',
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetch({
      name: 'top_posts',
      args: {
        profileId: '12359182129asd',
        startDate: state.date.startDate,
        endDate: state.date.endDate,
      },
    }));
    expect(next).toHaveBeenCalledWith(action);
  });

  it('shoud dispatch a data fetch for top posts once a new metric is selected in dropdown', () => {
    const action = {
      type: topPostsActionTypes.SELECT_TOP_POSTS_METRIC,
      id: '12359182129asd',
      metric: {
        apiKey: 'reactions',
      },
      descending: false,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetch({
      name: 'top_posts',
      args: {
        profileId: '12359182129asd',
        startDate: state.date.startDate,
        endDate: state.date.endDate,
        sortBy: state.topPosts.selectedMetric.apiKey,
        descending: state.topPosts.isDescendingSelected,
        limit: state.topPosts.activePostsCount,
      },
    }));
    expect(next).toHaveBeenCalledWith(action);
  });

  it('shoud dispatch a data fetch for top posts once a new metric count is selected', () => {
    const action = {
      type: topPostsActionTypes.SELECT_TOP_POSTS_COUNT,
      id: '12359182129asd',
      postsCount: 10,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetch({
      name: 'top_posts',
      args: {
        profileId: '12359182129asd',
        startDate: state.date.startDate,
        endDate: state.date.endDate,
        sortBy: state.topPosts.selectedMetric.apiKey,
        descending: state.topPosts.isDescendingSelected,
        limit: state.topPosts.activePostsCount,
      },
    }));
    expect(next).toHaveBeenCalledWith(action);
  });

  it('shoud dispatch a data fetch for top posts once date range is changed', () => {
    const action = {
      type: dateActionTypes.SET_DATE_RANGE,
      startDate: '10/10/2016',
      endDate: '20/10/2016',
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(actions.fetch({
      name: 'top_posts',
      args: {
        profileId: state.profiles.selectedProfileId,
        startDate: '10/10/2016',
        endDate: '20/10/2016',
        sortBy: state.topPosts.selectedMetric.apiKey,
        descending: state.topPosts.isDescendingSelected,
        limit: state.topPosts.activePostsCount,
      },
    }));
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should listen to EXPORT_TO_PNG_START and trigger a exportChart action', () => {
    const action = {
      type: exportActionTypes.EXPORT_TO_PNG_START,
    };
    middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(exportActions.exportChart('js-dom-to-png-top-posts', 'top-posts'));
  });

  it('should listen to EXPORT_TO_CSV_START and trigger a exportChart action', () => {
    const action = {
      type: exportCSVActionTypes.EXPORT_TO_CSV_START,
    };
    middleware(store)(next)(action);
    const csvData = {
      id: ['59d7c0dcefda0ca07a6d3be1', '59d7c108c126328b1c6d3bdf'],
      type: ['picture', 'video'],
      text: ['"foo bar"', '"Looking for a good read? The top 5 books all marketers &amp; social media managers should have in their library 📚"'],
      date: ['Invalid date', '10/10/2017 12:30:35'],
      retweets: [195, 57],
      impressions: [50234, 33057],
      engagements: [3771, 392],
      replies: [11, 2],
      url_clicks: [40, 3],
      favorites: [246, 110],
      media: ['https://buffer-media-uploads.s3.amazonaws.com/59d7c0dcefda0ca07a6d3be1/c4e1cd9d92da1b945aeaad71f8154255628d9409_1b29af5b1f061c5cb5660ec649bc8932eb722c96_twitter', 'https://buffer-media-uploads.s3.amazonaws.com/56c20bd3bd3816f63c94c73f/597120f6a73330a8620f1e50/output/c5101f2498252c9d182ac27a4b4d8a84.original.mp4'],
    };
    expect(store.dispatch).toHaveBeenCalledWith(exportCSVActions.exportChart('top-posts', csvData));
  });

  afterEach(() => jest.clearAllMocks());
});
