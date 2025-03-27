import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BasePage {
  constructor(protected page: Page, protected logger: Logger) {}

  async closeSignInPopupIfPresent(): Promise<void> {
    const popupCloseButton = this.page.locator('button[aria-label="Dismiss sign-in info."]');
  
    const isPresent = await popupCloseButton.count() > 0;
    if (isPresent) {
      this.logger.info('Sign-in popup detected — attempting to close it.');
      await popupCloseButton.click();
      await popupCloseButton.waitFor({ state: 'detached', timeout: 3000 });
      this.logger.success('Sign-in popup successfully closed.');
    } else {
      this.logger.info('No sign-in popup detected.');
    }
  }

  async waitForResultsToRefresh(): Promise<void> {
    this.logger.info('Waiting for results to refresh after selecting dates');
    await this.page.waitForLoadState('networkidle');
    await this.closeSignInPopupIfPresent();

  }
}