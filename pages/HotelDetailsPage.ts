import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';


export class HotelDetailsPage extends BasePage {
  readonly hotelTitle: Locator;

  constructor(page: Page, logger: Logger) {
    super(page, logger);
    this.hotelTitle = page.locator('#hp_hotel_name h2');
  }

  async waitForHotelDetails(): Promise<void> {
    this.logger.info('Waiting for hotel details page...');
    await this.page.waitForURL(/hotel/, { timeout: 10000 });
    this.logger.success('Navigated to hotel details');
    await this.closeSignInPopupIfPresent();
  }

  async validateHotelNameIsNotEmpty(): Promise<void> {
    await expect(this.hotelTitle).toBeVisible();
    const name = await this.hotelTitle.textContent();
    expect(name?.trim().length).toBeGreaterThan(0);
    console.log('🏨 Hotel Name:', name?.trim());
  }
}
