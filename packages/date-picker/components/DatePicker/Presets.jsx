import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled, { css } from 'styled-components';

import {
  Button,
  Text,
} from '@bufferapp/components';

const Header = styled.header`
  margin: 0 0 0.5rem;
  height: auto;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Item = styled.li`
  width: 33%;
  list-style: none;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0.5rem 0.25rem;
  text-decoration: none;
  text-shadow: none;
  border: 1px solid #CED7DF;
  border-radius: 3px;
  text-align: center;
  user-select: none;
  margin: 0.1rem;
  white-space: nowrap;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }

  ${props => props.inactive && css`
    opacity: 1;
  `}

  ${props => props.active && css`
    background: #168EEA;
    border-color: #168EEA;
  `}

  ${props => props.disabled && css`
    color: #AAAAAA !important;
    opacity: .3 !important;
    background: transparent !important;
    cursor: not-allowed;
  `}
`;

const PRESETS = [
  {
    name: '90 Days',
    range: 90,
  },
  {
    name: '30 Days',
    range: 30,
  },
  {
    name: '28 Days',
    range: 28,
  },
  {
    name: '7 Days',
    range: 7,
  },
  {
    name: 'Yesterday',
    range: 1,
  },
  {
    name: 'Custom',
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

const Presets = ({ selectPreset, minStartDate, startDate, endDate }) => {
  const presets = PRESETS.map((preset) => {
    const disabled = minStartDate > moment().subtract(preset.range, 'days');
    const selectedRange = PRESETS.find(({ range }) => isRangeSelected(range, startDate, endDate));
    const selected = selectedRange.range === preset.range;
    const dataTip = disabled ? 'We don\'t have complete data for this range.' : null;
    const handleClick = disabled ? null : (() => selectPreset(preset.range));
    const buttonTextColor = (selected ? 'white' : null);

    return (
      <Item
        active={selected}
        inactive={!selected}
        disabled={disabled}
        key={preset.name.toLowerCase().replace(' ', '-')}
        data-tip={dataTip}
      >
        <Button
          noStyle
          onClick={handleClick}
        >
          <Text size="small" color={buttonTextColor}>{preset.name}</Text>
        </Button>
      </Item>
    );
  });

  return (
    <Header>
      <List>
        {presets.slice(0, 3)}
      </List>
      <List>
        {presets.splice(3)}
      </List>
    </Header>
  );
};

Presets.defaultProps = {
  startDate: null,
  endDate: null,
};

Presets.propTypes = {
  selectPreset: PropTypes.func.isRequired,
  minStartDate: PropTypes.number.isRequired,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
};

export default Presets;
