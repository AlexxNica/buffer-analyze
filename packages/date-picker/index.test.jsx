import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import DatePickerContainer, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';
import DatePicker from './components/DatePicker';

configure({ adapter: new Adapter() });
const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('DatePicker', () => {
  const state = {
    date: {
      loading: true,
      startDate: 1511199847,
      endDate: 1511718247,
      open: false,
      calendarOpen: false,
      minDate: 1463437140000,
      maxDate: 1511803062968,
      month: 1509508800,
    },
  };

  it('should render', () => {
    const store = storeFake(state);
    const wrapper = mount(
      <Provider store={store}>
        <DatePickerContainer />
      </Provider>,
    );
    expect(wrapper.find(DatePicker).length).toBe(1);
  });

  it('should export reducer', () => {
    expect(reducer)
      .toBeDefined();
  });

  it('should export actions', () => {
    expect(actions)
      .toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes)
      .toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should dispatch open', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .open()).toEqual(actions.open());
  });

  it('should dispatch close', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .close()).toEqual(actions.close());
  });

  it('should dispatch clearStartDate', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .clearStartDate()).toEqual(actions.clearStartDate());
  });

  it('should dispatch setDateRange', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .setDateRange(111, 222)).toEqual(actions.setDateRange(111, 222));
  });

  it('should dispatch setMonth', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component.props().setMonth(12)).toEqual(actions.setMonth(12));
  });

  it('should dispatch setStartDate', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .setStartDate(123)).toEqual(actions.setStartDate(123));
  });

  it('should dispatch setEndDate', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .setEndDate()).toEqual(actions.setEndDate());
  });

  it('should dispatch clearEndDate', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .clearEndDate()).toEqual(actions.clearEndDate());
  });

  it('should dispatch selectPreset when value is defined', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component
        .props()
        .selectPreset(1)).toEqual(undefined);
  });

  it('should dispatch selectPreset when value is Infinity', () => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    const component = shallow(<DatePickerContainer store={store} />);
    expect(component.props().selectPreset(Infinity)).toEqual(undefined);
  });
});
