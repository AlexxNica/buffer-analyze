import React from 'react';
import PropTypes from 'prop-types';

import {
  ChartStateNoData as NoData,
  ChartStateLoading as Loading,
  ChartCard,
  ChartHeader,
  ModeToggle,
  MetricsDropdown,
} from '@bufferapp/analyze-shared-components';

import AddReport from '@bufferapp/add-report';

import Chart from '../Chart';
import Title from '../Title';
import Footer from '../Footer';
import PeriodToggle from '../PeriodToggle';

function getStartDate(dailyData) {
  return dailyData.length ? dailyData[0].day / 1000 : null;
}

function getEndDate(dailyData) {
  return dailyData.length ? dailyData[dailyData.length - 1].day / 1000 : null;
}

const CompareChart = ({
  daily,
  totalPeriodDaily,
  selectedMetricLabel,
  loading,
  totals,
  timezone,
  visualizePreviousPeriod,
  selectMetric,
  togglePreviousPeriod,
  openDropdown,
  closeDropdown,
  isDropdownOpen,
  profileService,
  selectDailyMode,
  dailyMode,
}) => {
  let content = null;
  let header = null;
  let footer = null;
  const dailyData = dailyMode === 1 ? totalPeriodDaily : daily;
  if (loading) {
    content = <Loading active noBorder />;
  } else if (dailyData.length === 0) {
    content = <NoData />;
  } else {
    content = (
      <div id="js-dom-to-png-compare">
        <Chart
          daily={daily}
          totalPeriodDaily={totalPeriodDaily}
          dailyMode={dailyMode}
          selectedMetricLabel={selectedMetricLabel}
          timezone={timezone}
          visualizePreviousPeriod={visualizePreviousPeriod}
          profileService={profileService}
        />
      </div>
    );
    header = (
      <div style={{ padding: '20px', display: 'flex' }} >
        <MetricsDropdown
          metrics={totals}
          selectedMetricLabel={selectedMetricLabel}
          isDropdownOpen={isDropdownOpen}
          selectMetric={selectMetric}
          openDropdown={openDropdown}
          closeDropdown={closeDropdown}
        />
        {profileService === 'twitter' &&
          <ModeToggle
            baseModeLabel="Daily"
            secondaryModeLabel="Period Total"
            active={dailyMode === 1}
            handleClick={selectDailyMode}
          />
        }
        <PeriodToggle handleClick={togglePreviousPeriod} active={visualizePreviousPeriod} />
      </div>
    );
    footer = (
      <Footer
        startDate={getStartDate(dailyData)}
        endDate={getEndDate(dailyData)}
        selectedMetricLabel={selectedMetricLabel}
        totals={totals}
      />
    );
  }

  const containerStyle = {
    padding: '0',
    margin: '0 auto',
    position: 'relative',
  };

  if (loading || dailyData.length === 0) delete containerStyle.border;

  return (
    <ChartCard>
      <ChartHeader>
        <Title
          startDate={getStartDate(dailyData)}
          endDate={getEndDate(dailyData)}
        />
        <AddReport
          chart="compare"
          state={{
            visualizePreviousPeriod,
            selectedMetricLabel,
            profileService,
            dailyMode,
          }}
        />
      </ChartHeader>
      <div style={containerStyle}>
        {header}
        {content}
      </div>
      {footer}
    </ChartCard>
  );
};

CompareChart.defaultProps = {
  loading: false,
  selectedMetricLabel: '',
  visualizePreviousPeriod: false,
  isDropdownOpen: false,
};

CompareChart.propTypes = {
  loading: PropTypes.bool,
  totalPeriodDaily: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string.isRequired,
    metrics: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired,
      diff: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      previousValue: PropTypes.number.isRequired,
      postsCount: PropTypes.number.isRequired,
    })),
  })).isRequired,
  daily: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string.isRequired,
    metrics: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired,
      diff: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      previousValue: PropTypes.number.isRequired,
      postsCount: PropTypes.number.isRequired,
    })),
  })).isRequired,
  selectedMetricLabel: PropTypes.string,
  totals: PropTypes.arrayOf(PropTypes.shape({
    diff: PropTypes.number,
    label: PropTypes.string,
    previousValue: PropTypes.number,
    value: PropTypes.number,
  })).isRequired,
  timezone: PropTypes.string.isRequired,
  visualizePreviousPeriod: PropTypes.bool,
  isDropdownOpen: PropTypes.bool,
  profileService: PropTypes.string.isRequired,
  // actions
  selectMetric: PropTypes.func.isRequired,
  togglePreviousPeriod: PropTypes.func.isRequired,
  openDropdown: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  selectDailyMode: PropTypes.func.isRequired,
  dailyMode: PropTypes.number.isRequired,
};

export default CompareChart;
