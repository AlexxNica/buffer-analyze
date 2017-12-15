import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import {
  Text,
} from '@bufferapp/components';


import MetricGraph from '../MetricGraph';

import {
  columnContainer,
  metricColumn,
  contentColumn,
  contentDate,
  contentContainer,
  tweetServiceLinkClass,
  mediaThumbnail,
  postMeta,
  postContent,
  contentLink,
  viewPostLinkClass,
} from '../../styles.less';

const Attachment = ({ type, media }) => {
  if (['picture', 'photo', 'video', 'image'].includes(type) && media) {
    return <img alt="" className={mediaThumbnail} src={media.thumbnail} />;
  }
  return null;
};

Attachment.defaultProps = {
  media: null,
};

Attachment.propTypes = {
  type: PropTypes.string.isRequired,
  media: PropTypes.shape({
    thumbnail: PropTypes.String,
    picture: PropTypes.String,
  }),
};

const MetricColumn = ({ metrics }) => {
  if (metrics.length === 0) {
    return null;
  }
  return (
    <div className={metricColumn}>
      {metrics.map(metric => <MetricGraph key={metric.key} metric={metric} />)}
    </div>
  );
};

MetricColumn.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const PostItem = ({
  post,
  engagementMetrics,
  audienceMetrics,
  maxEngagementValue,
  maxAudienceValue,
  timezone,
}) => {
  const secondaryPostColumnMetrics = audienceMetrics.map((metric) => {
    return {
      ...metric,
      maxValue: maxAudienceValue,
      value: post.statistics[metric.key],
    };
  });

  const primaryPostColumnMetrics = engagementMetrics.map((metric) => {
    return {
      ...metric,
      maxValue: maxEngagementValue,
      value: post.statistics[metric.key],
    };
  });

  const dateFormat = 'D MMMM hh:mm a';
  return (
    <li className={columnContainer}>
      <div className={contentColumn}>
        <div className={postMeta}>
          <div className={contentDate}>
            <a href={post.serviceLink} target="_blank" rel="noopener noreferrer" className={tweetServiceLinkClass}>
              <Text size="small">{moment(post.date).tz(timezone).format(dateFormat)}</Text>
            </a>
          </div>
          <div className={contentLink}>
            <a className={viewPostLinkClass} href={post.serviceLink} rel="noopener noreferrer" target="_blank">
              <i className="bi-click" />
              VIEW POST
            </a>
          </div>
        </div>
        <div className={postContent}>
          <Attachment type={post.type} media={post.media} />
          <div className={contentContainer} dangerouslySetInnerHTML={{ __html: post.text }} />
        </div>
      </div>
      <MetricColumn metrics={primaryPostColumnMetrics} />
      <MetricColumn metrics={secondaryPostColumnMetrics} />
    </li>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.number,
    id: PropTypes.string,
    media: PropTypes.shape({
      picture: PropTypes.string,
      thumbnail: PropTypes.string,
    }),
    serviceLink: PropTypes.string,
    statistics: PropTypes.shape({
      comments: PropTypes.number,
      postClicks: PropTypes.number,
      postImpressions: PropTypes.number,
      postReach: PropTypes.number,
      reactions: PropTypes.number,
      shares: PropTypes.number,
    }),
    text: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  engagementMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  audienceMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxEngagementValue: PropTypes.number.isRequired,
  maxAudienceValue: PropTypes.number.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default PostItem;
