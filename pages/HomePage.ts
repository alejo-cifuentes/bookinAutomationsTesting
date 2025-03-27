import { BasePage } from './BasePage';
import { Page, type Locator} from '@playwright/test';
import { smartLocator } from '../utils/LocatorUtils';
import { Logger } from '../utils/logger';
import { LocatorValidatorI } from '../utils/validators/LocatorValidatorInterface';
import { getDateRangeFromToday } from '../utils/Generators';

export class HomePage extends BasePage {

  private readonly destinationLocators: Locator[];
  private readonly buttonSearchLocators: Locator[];
  private readonly checkInLocators: Locator[];
  private readonly locatorValidator: LocatorValidatorI;

  constructor(page: Page, logger: Logger, locatorValidator: LocatorValidatorI) {
    super(page, logger);
    this.logger = logger;
    this.locatorValidator = locatorValidator;
    this.page = page;
    this.destinationLocators = [
      this.page.getByPlaceholder('Where are you going?'),
      this.page.locator('[data-testid="destination-container"]'),
      this.page.locator('[name="ss"]')
    ];
    this.buttonSearchLocators = [
      this.page.getByRole('button', { name: /Search/i }),
      this.page.locator('button[type="submit"]'),
      this.page.locator('[data-testid="submit-button"]')
    ];

    this.checkInLocators = [
      this.page.locator('#calendar-searchboxdatepicker'),
      this.page.locator('[data-testid="searchbox-datepicker-calendar"]')
    ]
  }

  async navigate() {
    this.logger.info('Navigating to the home page');
    await this.page.goto('/index.html');
  }

  async closeCalendarIfExists(): Promise<void> {
    const calendar = this.page.locator('[data-testid="searchbox-datepicker"]');
  
    const isPresent = await calendar.count() > 0;
    if (isPresent) {
      this.logger.info('Calendar exists in DOM, attempting to close it...');
      const toggle = this.page.locator('[data-testid="date-display-field-start"]');
      await toggle.click();
  
      await calendar.waitFor({ state: 'detached', timeout: 5000 });
      this.logger.success('Calendar removed from DOM successfully');
    } else {
      this.logger.info('Calendar not found in DOM — no action taken.');
    }
  }

  async waitForAutoCompleateOptions(): Promise<void> {
    await this.page.waitForSelector('[data-testid="autocomplete-results-options"]', {timeout: 2000});
  }

  async getAutocompleteOption(label: string): Promise<Locator> {
    await this.waitForAutoCompleateOptions();
    return this.page.locator('div[role="button"]').filter({ hasText: label }).first();
  }

  async waitForSearchResults(): Promise<void> {
    this.logger.info('Waiting for navigation to search results page...');
    await this.page.waitForURL(/searchresults/, { timeout: 10000 });
    this.logger.success('Navigated to search results');
    await this.closeSignInPopupIfPresent();
  }

  async clickSearchButton() {
    const searchButton = await smartLocator(this.buttonSearchLocators);
    this.locatorValidator.ensureLocatorFound(searchButton, 'Search button');
    await searchButton!.click();
  }

  async searchHotel(city: string) {
    this.logger.info(`Searching for city: ${city}`);

    const input = await smartLocator(this.destinationLocators);
    this.locatorValidator.ensureLocatorFound(input, 'City input field');
    const resolvedInput = input!;
    await resolvedInput.click();
    await this.page.keyboard.type(city, { delay: 80 });
    this.logger.info('Waiting for auto complete dialog');
    const cityOption = await this.getAutocompleteOption('New York');
    await cityOption.click();
    await this.clickSearchButton();
    await this.waitForSearchResults();
  }

  async selectCheckInAndCheckOut(): Promise<void> {
    this.logger.info('Selecting check-in and check-out dates');
    const { startDate, endDate } = getDateRangeFromToday();
  
    const checkInLocator = await smartLocator(this.checkInLocators);
    this.locatorValidator.ensureLocatorFound(checkInLocator, 'Check-in trigger element');
    await checkInLocator!.click();
  
    const calendarContainer = this.page.locator('[data-testid="searchbox-datepicker-calendar"]');
    await calendarContainer.waitFor({ state: 'visible', timeout: 5000 });
  
    const checkInDate = this.page.locator(`[data-date="${startDate}"]`);
    const checkOutDate = this.page.locator(`[data-date="${endDate}"]`);
  
    await checkInDate.click();
    await checkOutDate.click();

    await this.clickSearchButton();
  }
}
