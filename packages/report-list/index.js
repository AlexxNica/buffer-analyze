import { connect } from 'react-redux';
import ReportList from './components/ReportList';

// default export = container
export default connect(
  state => ({
    ...state.reportList,
  }),
)(ReportList);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';