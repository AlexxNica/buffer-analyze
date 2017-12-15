import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CheckmarkIcon,
  Text,
} from '@bufferapp/components';

import {
  dropdownListItem,
} from '../../style.less';

const DropdownItem = ({ metric, handleClick, selected, sortDirectionLabel }) => (
  <li className={dropdownListItem}>
    <Button noStyle onClick={handleClick} >
      <span
        style={{
          alignItems: 'center',
          boxSizing: 'border-box',
          display: 'flex',
          position: 'relative',
          width: '200px',
          padding: '5px 10px',
          marginTop: '7px',
        }}
      >
        <Text weight="bold" size="small">{metric.label}</Text>
        <span>&nbsp;</span>
        <Text size="small" color="shuttleGray">{sortDirectionLabel}</Text>
        { selected && <div style={{ marginLeft: 'auto' }}>
          <CheckmarkIcon color={'curiousBlue'} />
        </div>}
      </span>
    </Button>
  </li>
);

DropdownItem.propTypes = {
  metric: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  sortDirectionLabel: PropTypes.string.isRequired,
};

DropdownItem.defaultProps = {
  selected: false,
};

export default DropdownItem;
