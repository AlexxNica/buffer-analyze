import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Text,
} from '@bufferapp/components';

import {
  dropdownContainer,
  dropdownContent,
  dropdownContentActive,
  dropdownList,
  dropdownTrigger,
  dropdownTriggerActive,
} from './style.less';

import DropdownItem from './components/DropdownItem';

const TopPostsDropdown = ({
  metrics,
  selectedMetric,
  isDescendingSelected,
  isDropdownOpen,
  selectMetric,
  toggleDropdown,
}) => {
  const contentClasses = classNames(dropdownContent, {
    [dropdownContentActive]: isDropdownOpen,
  });

  const triggerClasses = classNames(dropdownTrigger, {
    [dropdownTriggerActive]: isDropdownOpen,
  });

  if (metrics.length) {
    const dropdownListClasses = classNames(dropdownList);
    return (
      <div>
        <Text size="small">Sort by</Text>
        <Dropdown
          className={dropdownContainer}
          onShow={toggleDropdown}
          onHide={toggleDropdown}
        >
          <DropdownTrigger className={triggerClasses} style={{ display: 'flex' }} >
            <Text size="small">{selectedMetric.label}</Text>
            <span>&nbsp;</span>
            <Text size="small" color="shuttleGray">{isDescendingSelected === true ? 'DESC' : 'ASC'}</Text>
            <span style={{ marginLeft: 'auto' }} >
              { isDropdownOpen && <ArrowUpIcon /> }
              { !isDropdownOpen && <ArrowDownIcon /> }
            </span>
          </DropdownTrigger>
          <DropdownContent className={contentClasses}>
            <ul className={dropdownListClasses}>
              {
                metrics.map(metric =>
                  (
                    <span key={metric.key}>
                      <DropdownItem
                        key={`${metric.key}_asc`}
                        metric={metric}
                        handleClick={() => selectMetric({ metric, descending: false })}
                        selected={metric.key === selectedMetric.key && !isDescendingSelected}
                        sortDirectionLabel={'ASC'}
                      />
                      <DropdownItem
                        key={`${metric.key}_desc`}
                        metric={metric}
                        handleClick={() => selectMetric({ metric, descending: true })}
                        selected={metric.key === selectedMetric.key && isDescendingSelected}
                        sortDirectionLabel={'DESC'}
                      />
                    </span>
                  ))
              }
            </ul>
          </DropdownContent>
        </Dropdown>
      </div>);
  }

  return null;
};

TopPostsDropdown.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectedMetric: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isDropdownOpen: PropTypes.bool,
  isDescendingSelected: PropTypes.bool.isRequired,
  // actions
  selectMetric: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
};

TopPostsDropdown.defaultProps = {
  isDropdownOpen: false,
};

export default TopPostsDropdown;
