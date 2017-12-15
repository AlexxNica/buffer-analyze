import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import TopPosts, {
  reducer,
  actions,
  actionTypes,
  middleware,
  PostsTableWrapper,
} from './index';

jest.mock('@bufferapp/add-report');

configure({ adapter: new Adapter() });

const selectedMetric = {
  key: 'reactions',
  value: 'Reactions',
};

const profile = {
  id: '4e88a092512f7e1556000000',
  avatarUrl: 'testurl',
  service: 'facebook',
  username: 'Buffer',
  timezone: 'America/Los Angeles',
};

const validStore = {
  subscribe: () => {},
  dispatch: jest.fn(),
  getState: jest.fn(() => ({
    i18n: {
      translations: {},
    },
    profiles: {
      profiles: [profile],
    },
    topPosts: {
      loading: false,
      topPosts: [],
      selectedMetric: {
        key: 'reactions',
        label: 'Reactions',
      },
      isDescendingSelected: true,
      activePostsCount: 10,
    },
    date: {},
  })),
};


describe('Top Post Table', () => {
  it('should render PostsTableWrapper component', () => {
    const wrapper = mount(
      <Provider store={validStore}>
        <TopPosts
          profileService="facebook"
          selectedProfileId="4e88a092512f7e1556000000"
          selectedMetric={selectedMetric}
          selectMetric={() => {}}
          toggleDropdown={() => {}}
          handlePostsCountClick={() => {}}
        />
      </Provider>,
    );
    expect(wrapper.find(PostsTableWrapper).length)
      .toBe(1);
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

  it('topPostsTable should call the selectMetric action with the correct values', () => {
    const component = shallow(<TopPosts
      profileService="facebook"
      selectedProfileId="4e88a092512f7e1556000000"
      isDescendingSelected
      selectedMetric={selectedMetric}
      store={validStore}
    />);

    component.props().selectMetric({
      metric: 'reactions',
      descending: true,
    });
    expect(validStore.dispatch).toHaveBeenCalledWith(actions.selectMetric('reactions', true));
  });

  it('topPostsTable should call the handlePostsCountClick action with the correct values', () => {
    const component = shallow(<TopPosts
      profileService="facebook"
      selectedProfileId="4e88a092512f7e1556000000"
      isDescendingSelected
      selectedMetric={selectedMetric}
      store={validStore}
    />);

    component.props().handlePostsCountClick({
      postsCount: 10,
    });
    expect(validStore.dispatch).toHaveBeenCalledWith(actions.handlePostsCountClick(10));
  });

  it('topPostsTable should call the toggleDropdown action', () => {
    const component = shallow(<TopPosts
      profileService="facebook"
      selectedProfileId="4e88a092512f7e1556000000"
      isDescendingSelected
      selectedMetric={selectedMetric}
      store={validStore}
    />);

    component.props().toggleDropdown();
    expect(validStore.dispatch).toHaveBeenCalledWith(actions.toggleDropdown());
  });
});
