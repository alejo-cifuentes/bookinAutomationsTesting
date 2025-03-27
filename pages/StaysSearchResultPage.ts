import { BasePage } from './BasePage';
import { type Page, type Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { LocatorValidatorI } from '../utils/validators/LocatorValidatorInterface';


export class StaysSearchResultsPage extends BasePage {
  private readonly hotelTitleLocator = '[data-testid="title"]';
  private readonly hotelCardLocator = '[data-testid="property-card-container"]';
  private readonly addressLocator = '[data-testid="property-card-container"] [data-testid="address"]';
  private readonly reviewFilterLocator = '[data-filters-group="review_score"] [data-testid="filters-group-label-content"]';
  private readonly resultNumberLocator = 'h1[aria-label*="properties found"]';
  private readonly sortByLocator = '[data-testid="sorters-dropdown"] li';
  private readonly hotelPricesLocator = '[data-testid="price-and-discounted-price"]';

  constructor(page: Page, logger: Logger, private locatorValidator: LocatorValidatorI) {
    super(page, logger);
  }

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

  async getSearchResultCount(): Promise<number> {
    const headerLocator = this.page.locator(this.resultNumberLocator);
  
    this.logger.info('Extracting search result count from results header...');
    await headerLocator.waitFor({ state: 'visible', timeout: 5000 });
  
    const text = await headerLocator.textContent();
    const match = text?.match(/(\d+)\s+properties\s+found/i);
  
    if (!match) {
      this.logger.error(`Could not extract hotel count from header: "${text}"`);
      throw new Error('Failed to extract property count');
    }

    const count = parseInt(match[1], 10);
    this.logger.info(`Parsed result count: ${count}`);
    return count;
  }

  async openSortDropdown(): Promise<void> {
    const sortLocator = this.page.locator('[data-testid="sorters-dropdown-trigger"]');
    await sortLocator.waitFor({state: 'visible', timeout: 1000}); 
    await sortLocator.click();
  }

  async filterByReviewScoreLabel(label:string): Promise<void> {
    await this.page.waitForSelector(this.reviewFilterLocator, {timeout: 1000});
    const filter = this.page.locator(this.reviewFilterLocator).filter({ hasText: label }).first();
    await filter.check();
    await this.waitForResultsToRefresh();
  }

  async sortByLabel(label: string): Promise<void> {
    await this.openSortDropdown();
    this.logger.info(`Attempting to sort by: "${label}"`);
  
    const sortOptions = this.page.locator('div[data-testid="sorters-dropdown"] button[role="option"] span');
    const sortOption = sortOptions.filter({ hasText: label }).first();

  
    this.locatorValidator.ensureLocatorFound(sortOption, `Sort option: "${label}"`);
    await sortOption!.click();
  
    this.logger.success(`Sorting applied: "${label}"`);

    await this.waitForResultsToRefresh();
  }
  
  async getHotelPricesSortedList(): Promise<number[]> {
    const priceLocator = this.page.locator(this.hotelPricesLocator);
    await priceLocator.first().waitFor({ state: 'visible', timeout: 5000 });
  
    const priceTexts = await priceLocator.allTextContents();
    this.logger.info(`Found ${priceTexts.length} prices.`);
  
    const prices: number[] = priceTexts.map((text) => {
      const cleaned = text.replace(/[^\d]/g, '');
      return parseInt(cleaned, 10);
    });
  
    this.logger.info(`Extracted prices: ${prices.join(', ')}`);
    return prices;
  }
}