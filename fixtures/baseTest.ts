import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { HotelDetailsPage } from '../pages/HotelDetailsPage';
import { StaysSearchResultsPage } from '../pages/StaysSearchResultPage';
import { ConsoleLogger, FileLogger, Logger } from '../utils/logger';
import { DefaultLocatorValidator } from '../utils/validators/LocatorValidator';
import { DefaultPageValidator } from '../utils/validators/PageValidator';
import * as dotenv from 'dotenv';
dotenv.config();

const logger: Logger = process.env.USE_FILE_LOGGER === 'true' ? new FileLogger() : new ConsoleLogger();
const locatorValidator = new DefaultLocatorValidator(logger);
const pageValidator = new DefaultPageValidator(logger);

type BookingTestFixtures = {
  homePage: HomePage;
  staysSearchResultsPage: StaysSearchResultsPage;
  logger: Logger;
  locatorValidator: typeof locatorValidator;
  pageValidator: typeof pageValidator;
  createHotelDetailsPage: (newPage: any) => HotelDetailsPage;
};

export const test = base.extend<BookingTestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page, logger, locatorValidator));
  },
  staysSearchResultsPage: async ({ page }, use) => {
    await use(new StaysSearchResultsPage(page, logger, locatorValidator));
  },
  createHotelDetailsPage: async ({ logger }, use) => {
    await use((newPage) => new HotelDetailsPage(newPage, logger));
  },
  logger: async ({}, use: any) => {
    await use(logger);
  },
  locatorValidator: async ({}, use) => {
    await use(locatorValidator);
  },
  pageValidator: async ({}, use) => {
    await use(pageValidator);
  },
});

export { expect } from '@playwright/test';