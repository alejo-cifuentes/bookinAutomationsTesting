import { test } from '../fixtures/baseTest';
import { expect } from '@playwright/test';

const cityVariants = ['New York', 'new york', 'NEW YORK', '  New York', 'New York  '];

for (const city of cityVariants) {
  test(`Search results for: "${city}" should all contain 'New York' in the address`, async ({
    homePage,
    staysSearchResultsPage,
    logger
  }) => {
    logger.info(`🔍 Testing city input: "${city}"`);

    await homePage.navigate();
    await homePage.searchHotel(city);

    const addresses = await staysSearchResultsPage.getHotelAddresses(homePage['page']);
    expect(addresses.length).toBeGreaterThan(0);

    for (const address of addresses) {
      expect(address.toLowerCase()).toContain('new york');
    }

    logger.success(`✅ All addresses contain 'new york' for input "${city}"`);
  });
}

test('Verify hotel count before and after selecting dates for New York', async ({
  homePage,
  staysSearchResultsPage,
  logger
}) => {
  const city = 'New York';
  logger.info(`🔍 Starting test: hotel count before and after date selection for "${city}"`);

  await homePage.navigate();
  await homePage.searchHotel(city);

  const countBefore = await staysSearchResultsPage.getHotelCount();

  await homePage.selectCheckInAndCheckOut();
  await homePage.waitForResultsToRefresh();

  const countAfter = await staysSearchResultsPage.getHotelCount();

  logger.info(`Hotel count before: ${countBefore}, after: ${countAfter}`);
  expect(countBefore).not.toBe(countAfter);

  logger.success('✅ Hotel count changed after selecting check-in/check-out dates');
});
