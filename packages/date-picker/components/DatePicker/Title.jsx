import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Text from '@bufferapp/components/Text';

const formatDate = (date, dateFormat = 'MM/DD/YY') =>
  moment.unix(date).format(dateFormat);

const PRESETS = [
  {
    name: '90 Days',
    label: 'Past 90 Days',
    range: 90,
  },
  {
    name: '30 Days',
    label: 'Past 30 Days',
    range: 30,
  },
  {
    name: '28 Days',
    label: 'Past 28 Days',
    range: 28,
  },
  {
    name: '7 Days',
    label: 'Past 7 Days',
    range: 7,
  },
  {
    name: 'Yesterday',
    label: 'Yesterday',
    range: 1,
  },
  {
    name: 'Custom',
    label: 'Custom',
    range: Infinity,
  },
];

const isRangeSelected = (range, start, end) => {
  const rangeEnd = moment().subtract(1, 'day').format('MM/DD/YYYY');
  const rangeStart = moment().subtract(range + 1, 'days').format('MM/DD/YYYY');

  const rangesMatch = (
    rangeStart === moment.unix(start).format('MM/DD/YYYY') &&
    rangeEnd === moment.unix(end).format('MM/DD/YYYY')
  );

  return (rangesMatch || range === Infinity);
};

const Title = ({ loading, startDate, endDate }) => {
  let title;
  if (!loading) {
    const selectedRange = PRESETS.find(preset => isRangeSelected(preset.range, startDate, endDate));
    if (selectedRange.label === 'Custom' && startDate && endDate) {
      const from = formatDate(startDate);
      const to = formatDate(endDate);
      title = `From: ${from} - To: ${to}`;
    } else {
      title = selectedRange.label;
    }
  } else {
    title = 'Loading...';
  }
  return (<Text size="small" weight="bold">{title}</Text>);
};

Title.defaultProps = {
  loading: false,
  startDate: 0,
  endDate: 0,
};

Title.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  loading: PropTypes.bool,
};

export default Title;
