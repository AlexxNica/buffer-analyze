import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/components';

import {
  ChartStateLoading as Loading,
  ChartCard,
  ChartHeader,
} from '@bufferapp/analyze-shared-components';

import AddReport from '@bufferapp/add-report';

import PostCountByHour from '../PostCountByHour';
import HourlyEngagementChart from '../HourlyEngagementChart';
import Legend from '../Legend';
import Header from '../ChartHeader';

const title = {
  margin: '0',
  padding: '0',
};

export const Title = () =>
  <h2 style={title}>
    <Text weight="bold" size="large">Hourly engagements</Text>
  </h2>
;

const gridContainer = {
  margin: '0 auto',
  padding: '1.25rem',
  position: 'relative',
};

export class ChartContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ref: null,
    };
  }
  render() {
    return (
      <div>
        <HourlyEngagementChart
          posts={this.props.postsCount}
          metric={this.props.selectedMetric}
          secondaryMetric={this.props.secondaryMetric}
          timezone={this.props.timezone}
          chartRef={(node) => {
            this._chart = node;
            if (!this.state.ref) {
              this.setState({
                ref: true,
              });
            }
          }}
        />
        <PostCountByHour
          posts={this.props.postsCount}
          hourlyChart={this._chart}
          timezone={this.props.timezone}
        />
        <Legend metric={this.props.selectedMetric} secondaryMetric={this.props.secondaryMetric} />
      </div>
    );
  }
}

ChartContent.defaultProps = {
  secondaryMetric: null,
  postsCount: [],
  timezone: 'America/Los_Angeles',
};

ChartContent.propTypes = {
  selectedMetric: PropTypes.shape({
    label: PropTypes.string,
    hourlyMetrics: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  secondaryMetric: PropTypes.shape({
    label: PropTypes.string,
    hourlyMetrics: PropTypes.arrayOf(PropTypes.number),
  }),
  postsCount: PropTypes.arrayOf(PropTypes.number),
  timezone: PropTypes.string,
};

const getStateForReport = props => ({
  selectedMetric: props.loading ? null : props.selectedMetric.label,
  secondaryMetric: props.secondaryMetric ? props.secondaryMetric.label : null,
});

const HourlyChart = props =>
  <ChartCard>
    <ChartHeader>
      <Title />
      <AddReport
        chart="hourly-engagements"
        state={getStateForReport(props)}
      />
    </ChartHeader>
    <div id="js-dom-to-png-hourly-engagements" style={gridContainer}>
      {props.loading && <Loading noBorder />}
      {!props.loading &&
        <div>
          <Header {...props} />
          <ChartContent {...props} />
        </div>
      }
    </div>
  </ChartCard>;

HourlyChart.defaultProps = {
  loading: false,
};

HourlyChart.propTypes = {
  loading: PropTypes.bool,
};

export default HourlyChart;
