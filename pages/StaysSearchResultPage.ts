import { type Page, type Locator } from '@playwright/test';
import { smartLocator } from '../utils/LocatorUtils';
import { Logger } from '../utils/logger';
import { LocatorValidatorI } from '../utils/validators/LocatorValidatorInterface';


export class StaysSearchResultsPage {
  private readonly hotelTitleLocator = '[data-testid="title"]';
  private readonly hotelCardLocator = '[data-testid="property-card-container"]';
  private readonly addressLocator = '[data-testid="property-card-container"] [data-testid="address"]';

  constructor(private page: Page, private logger: Logger, private locatorValidator: LocatorValidatorI) {}

  async selectFirstHotel() {
    this.logger.info('Selecting the first hotel in the search results');
    await this.page.locator(this.hotelTitleLocator).first().click();
  }

  async getHotelAddresses(targetPage: Page): Promise<string[]> {
    return await targetPage.locator(this.addressLocator).allTextContents();
  }

  async getHotelCount(): Promise<number> {
    const count = await this.page.locator(this.hotelCardLocator).count();
    this.logger.info(`Found ${count} hotels`);
    return count;
  }

}