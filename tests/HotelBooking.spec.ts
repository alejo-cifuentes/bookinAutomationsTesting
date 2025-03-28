import { test } from '../fixtures/baseTest';
import { isAscendingSorted } from '../utils/validators/SortValidator';
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

test('Verify Guest Raiting: 8+ filter update the results', async ({
  homePage,
  staysSearchResultsPage,
  logger
}) => {
  const city = 'New York';
  logger.info(`🔍 Starting test: hotel count before filtering "${city}"`);

  await homePage.navigate();
  await homePage.searchHotel(city);

  const countBefore = await staysSearchResultsPage.getSearchResultCount();

  await staysSearchResultsPage.filterByReviewScoreLabel('Very Good: 8+');


  const countAfter = await staysSearchResultsPage.getSearchResultCount();

  logger.info(`Hotel count before filtering : ${countBefore}, after filtering: ${countAfter}`);
  expect(countBefore).toBeLessThan(countAfter);

  logger.success('✅ Hotel count changed after selecting check-in/check-out dates');
});

test(`Search results for: New York and sorting by lower price should show in correct order`, async ({
  homePage,
  staysSearchResultsPage,
  logger
}) => {

  await homePage.navigate();
  await homePage.searchHotel('New York');

  await homePage.selectCheckInAndCheckOut();
  await homePage.waitForResultsToRefresh();

  await homePage.closeCalendarIfExists();

  await staysSearchResultsPage.sortByLabel('Price (lowest first)');

  const prices = await staysSearchResultsPage.getHotelPricesSortedList();
  expect(isAscendingSorted(prices)).toBe(true);

  logger.success('✅ Hotels are sorted by lowest price first');
});

test(`Search results for: New York select the first hotel and it should have the basic information`, async ({
  homePage,
  staysSearchResultsPage,
  context,
  createHotelDetailsPage,
  logger
}) => {
  await homePage.navigate();
  await homePage.searchHotel('New York');
  await homePage.selectCheckInAndCheckOut();
  await homePage.waitForResultsToRefresh();
  await homePage.closeCalendarIfExists();

  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    staysSearchResultsPage.selectFirstHotel(),
  ]);

  await newTab.waitForLoadState('domcontentloaded');

  const hotelDetailsPage = createHotelDetailsPage(newTab);

  await hotelDetailsPage.waitForHotelDetails();
  await hotelDetailsPage.validateHotelNameIsNotEmpty();

  logger.success('✅ Hotels details contains the name');
});



