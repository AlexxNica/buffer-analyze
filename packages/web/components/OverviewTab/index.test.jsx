import React from 'react';
import timezoneMock from 'timezone-mock';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';

import SummaryTable from '@bufferapp/summary-table';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import HourlyChart from '@bufferapp/hourly-chart';
import ContextualCompare from '@bufferapp/contextual-compare';

import OverviewTab from './index';

timezoneMock.register('US/Eastern');

configure({ adapter: new Adapter() });
describe('web/OverviewTab', () => {
  it('should render the overview for facebook', () => {
    const mockStore = configureMockStore();
    const store = mockStore({});
    const match = {
      params: {
        service: 'facebook',
        id: 'afs42',
      },
    };
    const component = shallow(<OverviewTab
      match={match}
      store={store}
    />).dive();
    expect(component.find(SummaryTable).length)
      .toBe(1);
    expect(component.find(AverageTable).length)
      .toBe(1);
    expect(component.find(CompareChart).length)
      .toBe(1);
    expect(component.find(ContextualCompare).length)
      .toBe(1);
  });
  it('should render the overview for twitter', () => {
    const mockStore = configureMockStore();
    const store = mockStore({});
    const match = {
      params: {
        service: 'twitter',
        id: 'afs42',
      },
    };
    const component = shallow(<OverviewTab
      match={match}
      store={store}
    />).dive();
    expect(component.find(SummaryTable).length)
      .toBe(1);
    expect(component.find(AverageTable).length)
      .toBe(1);
    expect(component.find(HourlyChart).length)
      .toBe(1);
    expect(component.find(CompareChart).length)
      .toBe(1);
  });
  it('should render the overview for instagram', () => {
    const mockStore = configureMockStore();
    const store = mockStore({});
    const match = {
      params: {
        service: 'instagram',
        id: 'afs42',
      },
    };
    const component = shallow(<OverviewTab
      match={match}
      store={store}
    />).dive();
    expect(component.find(SummaryTable).length)
      .toBe(1);
    expect(component.find(CompareChart).length)
      .toBe(1);
  });
});
