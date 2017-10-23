/* eslint-disable import/first */

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import createReport from './';

describe('rpc/create_report', () => {
  const userId = 'user123';
  const profileId = '123159ad';
  const chartId = 'summary-table';
  const name = 'Weekly Sync Report';

  it('should have the expected name', () => {
    expect(createReport.name)
      .toBe('create_report');
  });

  it('should have the expected docs', () => {
    expect(createReport.docs)
      .toBe('create a new report for Analyze');
  });

  it('should send a POST request to /create_report with the provided parameters', async () => {
    rp.mockReturnValueOnce(Promise.resolve('success'));

    const result = await createReport.fn({ profileId, chartId, name, userId });

    expect(result).toBe('success');
    expect(rp.mock.calls[0]).toEqual([{
      uri: `${process.env.ANALYZE_API_ADDR}/create_report`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
      body: {
        name,
        profile_id: profileId,
        chart_id: chartId,
        user_id: userId,
      },
      json: true,
    }]);
  });
});
