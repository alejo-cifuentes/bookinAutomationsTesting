import { test, expect, request } from '@playwright/test';
import { aggregationSchema } from '../../schemas/aggregationSchema';

test.describe('🧪 API - Aggregation schema validation', () => {
  test('should match the expected schema in aggregation section only', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get('https://flights.booking.com/api/flights/?type=ROUNDTRIP&adults=1&cabinClass=ECONOMY&children=&from=MDE.CITY&to=MIA.CITY&fromCountry=CO&toCountry=US&fromLocationName=Medell%C3%ADn&toLocationName=Miami&depart=2025-04-26&return=2025-05-03&sort=BEST&travelPurpose=leisure&ca_source=flights_index_sb&aid=2311236&label=es-co-booking-desktop-vjGZbEFOhRc3a9njxeT3IwS652829002024%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp1003654%3Ali%3Adec%3Adm&enableVI=1', {
      headers: {
        'accept': '*/*',
        'x-booking-affiliate-id': '2311236',
        'x-booking-label': 'es-co-booking-desktop-vjGZbEFOhRc3a9njxeT3IwS652829002024:pl:ta:p1:p2:ac:ap:neg:fi:tikwd-65526620:lp1003654:li:dec:dm',
      },
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    // Solo validamos la propiedad "aggregation"
    const parseResult = aggregationSchema.safeParse(responseBody.aggregation);

    if (!parseResult.success) {
      console.error('❌ Aggregation schema validation failed:', parseResult.error.format());
    }

    expect(parseResult.success).toBeTruthy();
  });
});
