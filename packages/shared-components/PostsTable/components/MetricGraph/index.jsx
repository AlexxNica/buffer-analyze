import React from 'react';
import PropTypes from 'prop-types';
import { TruncatedNumber } from '@bufferapp/analyze-shared-components';
import Text from '@bufferapp/components/Text';

import {
  metricBarGraph,
  metricBarLabel,
  metricBarGraphContainer,
} from '../../styles.less';


const MetricGraph = ({ metric }) => {
  const { maxValue, value, color, key, label } = metric;

  let percentage = 0;
  if (maxValue > 0) {
    percentage = value / maxValue;
    percentage *= 100;
  }

  const metricStyle = {
    backgroundColor: color,
    width: `${percentage}%`,
  };
  return (
    <div key={key}>
      <div className={metricBarGraphContainer}>
        <span className={metricBarLabel}>
          <Text size="small" weight="bold"><TruncatedNumber>{value}</TruncatedNumber></Text>
          <Text size="small"> {label.toLowerCase()}</Text>
        </span>
        <span data-tip={label} className={metricBarGraph} style={metricStyle} />
      </div>
    </div>
  );
};

MetricGraph.propTypes = {
  metric: PropTypes.shape({
    maxValue: PropTypes.number,
    value: PropTypes.number,
    color: PropTypes.String,
    key: PropTypes.String,
    label: PropTypes.String,
  }).isRequired,
};

export default MetricGraph;
