const { rpc } = require('@bufferapp/micro-rpc');
const checkToken = require('./checkToken');
const profilesMethod = require('./profiles');
const userMethod = require('./user');
const performanceTrackingMethod = require('./performanceTracking');
const summary = require('./summary');
const postsSummary = require('./postsSummary');
const followers = require('./followers');
const analyticsStartDate = require('./analyticsStartDate');
const average = require('./average');
const topPosts = require('./topPosts');
const posts = require('./posts');
const hourly = require('./hourly');
const compare = require('./compare');
const createReport = require('./createReport');
const listReports = require('./listReports');
const getReport = require('./getReport');
const contextual = require('./contextual');
const addToReport = require('./addToReport');
const removeReport = require('./removeReport');
const saveReportChanges = require('./saveReportChanges');
const moveChart = require('./moveChart');
const deleteChart = require('./deleteChart');
const comparison = require('./comparison');
const audience = require('./audience');
const environment = require('./environment');

module.exports = checkToken(rpc(
  profilesMethod,
  userMethod,
  performanceTrackingMethod,
  summary,
  followers,
  analyticsStartDate,
  postsSummary,
  average,
  topPosts,
  posts,
  hourly,
  compare,
  createReport,
  listReports,
  getReport,
  contextual,
  addToReport,
  removeReport,
  saveReportChanges,
  moveChart,
  comparison,
  audience,
  deleteChart,
  environment,
));
