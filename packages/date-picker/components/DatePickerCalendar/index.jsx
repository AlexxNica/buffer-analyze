import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';

import Button from '@bufferapp/components/Button';

import moment from 'moment';
import classNames from 'classnames';

import ArrowLeftIcon from '@bufferapp/components/Icon/Icons/ArrowLeftIcon';
import ArrowRightIcon from '@bufferapp/components/Icon/Icons/ArrowRightIcon';

import Month from './Month';

import styles from './date-picker-calendar.less';

const MonthHeader = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
    <li className={styles.dayHeaderListItem} key={day}>
      {day.charAt(0)}
    </li>
  ));

  return (
    <ul className={styles.dayHeaderList}>
      {days}
    </ul>
  );
};

class Calendar extends Component {
  getHeader(unixTimestamp) {
    const currentMonth = moment.unix(unixTimestamp).format('MMMM YYYY');

    const arrowLeftClass = classNames('bi-arrow-left', styles.arrowLeft);
    const arrowRightClass = classNames('bi-arrow-right', styles.arrowRight);

    return (
      <header className={styles.header}>
        <Button noStyle onClick={() => this.previousMonth(unixTimestamp)}>
          <i className={arrowLeftClass}><ArrowLeftIcon /></i>
        </Button>
        {currentMonth}
        <Button noStyle onClick={() => this.nextMonth(unixTimestamp)}>
          <i className={arrowRightClass}><ArrowRightIcon /></i>
        </Button>
      </header>
    );
  }

  previousMonth (unixTimestamp) {
    const m = moment.unix(unixTimestamp);
    m.subtract(1, 'months');
    this.props.selectMonth(m.unix());
  }

  nextMonth (unixTimestamp) {
    const m = moment.unix(unixTimestamp);
    m.add(1, 'months');
    this.props.selectMonth(m.unix());
  }

  handleDayClick (timestamp) {
    const {
      startDate,
      focusStartDate,
      focusEndDate,
      // Actions
      selectStartDate,
      selectEndDate,
    } = this.props;

    const m = moment.unix(timestamp);
    const mStartDate = moment.unix(startDate);

    if (focusStartDate) {
      selectStartDate(timestamp);
    } else if (focusEndDate && (startDate === -1 || m.isAfter(mStartDate))) {
      selectEndDate(timestamp);
    }
  }

  render () {
    const {
      startDate,
      endDate,
      maxStartDate,
      maxEndDate,
      isOpen,
      currentMonth,
    } = this.props;

    const header = this.getHeader(currentMonth);

    const calendarClass = classNames(styles.calendar, {
      [styles.calendarOpen]: isOpen,
    });

    return (
      <aside className={calendarClass}>
        {header}
        <MonthHeader />
        <Month
          handleDayClick={timestamp => this.handleDayClick(timestamp)}
          currentMonth={currentMonth}
          startDate={startDate}
          endDate={endDate}
          maxStartDate={maxStartDate}
          maxEndDate={maxEndDate}
        />
      </aside>
    );
  }
}

Calendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
  focusStartDate: PropTypes.bool.isRequired,
  focusEndDate: PropTypes.bool.isRequired,
  currentMonth: PropTypes.number.isRequired,
  maxStartDate: PropTypes.number,
  maxEndDate: PropTypes.number,

  // Actions
  selectStartDate: PropTypes.func.isRequired,
  selectEndDate: PropTypes.func.isRequired,
  selectMonth: PropTypes.func.isRequired,
};

export default Calendar;
