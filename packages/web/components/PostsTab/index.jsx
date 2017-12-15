import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostsTable from '@bufferapp/posts-table';

import PostsSummaryTable from '@bufferapp/posts-summary-table';

const PostsTab = ({ match }) => (
  <div>
    <PostsSummaryTable profileService={match.params.service} />
    <PostsTable selectedProfileId={match.params.id} profileService={match.params.service} />
  </div>
);

PostsTab.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      service: PropTypes.string,
    }),
  }).isRequired,
};

export default connect()(PostsTab);
