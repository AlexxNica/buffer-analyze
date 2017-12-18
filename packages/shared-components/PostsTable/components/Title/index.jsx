import React from 'react';
import Text from '@bufferapp/components/Text';
import PropTypes from 'prop-types';

const style = {
  margin: '0',
  padding: '0',
};

const Title = ({ title }) =>
  <h2 style={style}>
    <Text weight="bold" size="large">
      { title }
    </Text>
  </h2>
;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;

