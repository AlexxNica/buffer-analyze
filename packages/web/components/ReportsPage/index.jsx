import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavSidebar from '@bufferapp/nav-sidebar';
import { Text, Divider } from '@bufferapp/components';

const pageStyle = {
  display: 'flex',
  flexGrow: 1,
  height: '100%',
};

const ReportsPage = ({ location }) => (
  <div style={pageStyle}>
    <NavSidebar route={location.path} />
    <div>
      <Text size="large">Welcome to Buffer Analyze 🎉</Text>
      <Divider />
      <Text>This is the reports page!</Text>
    </div>
  </div>
);

ReportsPage.propTypes = {
  location: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect()(ReportsPage);
