import { test, expect, request } from '@playwright/test';

test.describe('Flight Search API', () => {
  test('should return flights from Medellín to Miami', async ({ playwright }) => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(
      'https://flights.booking.com/api/flights/',
      {
        params: {
          type: 'ROUNDTRIP',
          adults: 1,
          cabinClass: 'ECONOMY',
          from: 'MDE.CITY',
          to: 'MIA.CITY',
          fromCountry: 'CO',
          toCountry: 'US',
          fromLocationName: 'Medellín',
          toLocationName: 'Miami',
          depart: '2025-04-26',
          return: '2025-05-03',
          sort: 'BEST',
          travelPurpose: 'leisure',
          enableVI: '1',
        },
        headers: {
          accept: '*/*',
          'x-requested-from': 'clientFetch',
          'x-booking-affiliate-id': '2311236',
        },
      }
    );

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    console.log(JSON.stringify(body, null, 2));
    expect(body).toHaveProperty('aggregation');
    expect(body).toHaveProperty('aggregation.totalCount');
    expect(body).toHaveProperty('aggregation.airlines');
  });
});
