import {type Locator } from '@playwright/test';

export async function smartLocator(locators: Locator[]): Promise<Locator | null> {
  for (const locator of locators) {
    try {
      if (await locator.isVisible()) {
        return locator;
      }
    } catch (_) {
      continue;
    }
  }
  return null;
}