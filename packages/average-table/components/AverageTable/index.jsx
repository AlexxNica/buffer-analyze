import React from 'react';
import PropTypes from 'prop-types';

import Text from '@bufferapp/components/Text';
import { white } from '@bufferapp/components/style/color';

import {
  ChartStateNoData as NoData,
  ChartStateLoading as Loading,
  ChartCard,
  ChartHeader,
  GridItem,
} from '@bufferapp/analyze-shared-components';

import AddReport from '@bufferapp/add-report';


console.log('ChartCard', ChartCard);
console.log('ChartHeader', ChartHeader);

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '0',
  margin: '0 auto',
};

const gridContainer = {
  position: 'relative',
  padding: '1.5rem',
};

export const Table = ({ metrics, timezone }) =>
  <ul style={gridStyle}>
    {metrics.totals.map(metric => <GridItem
      key={metric.label}
      metric={metric}
      dailyData={metrics.daily}
      timezone={timezone}
    />)}
  </ul>;

Table.propTypes = {
  timezone: PropTypes.string.isRequired,
  metrics: PropTypes.shape({
    daily: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.string.isRequired,
      metrics: PropTypes.arrayOf(PropTypes.shape({
        diff: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })),
    })),
    totals: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
      diff: PropTypes.number,
    })),
  }).isRequired,
};

export const Title = () =>
  <h2 style={{ margin: '0', padding: '0' }}>
    <Text weight="bold" size="large">Average Performance</Text>
  </h2>;

const AverageTable = ({ metrics, loading, timezone }) => {
  let content = null;
  if (loading) {
    content = <Loading active noBorder text="Average loading..." />;
  } else if (metrics.totals.length === 0) {
    content = <NoData />;
  } else {
    content = (
      <Table metrics={metrics} timezone={timezone} />
    );
  }

  return (
    <ChartCard>
      <ChartHeader>
        <Title />
        <AddReport chart="average" />
      </ChartHeader>
      <div id="js-dom-to-png-average" style={gridContainer}>
        {content}
      </div>
    </ChartCard>
  );
};

AverageTable.defaultProps = {
  loading: false,
};

AverageTable.propTypes = {
  loading: PropTypes.bool,
  timezone: PropTypes.string.isRequired,
  metrics: PropTypes.shape({
    daily: PropTypes.arrayOf(PropTypes.shape({
      day: PropTypes.string.isRequired,
      metrics: PropTypes.arrayOf(PropTypes.shape({
        diff: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })),
    })),
    totals: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
      diff: PropTypes.number,
    })),
  }).isRequired,
};

export default AverageTable;

