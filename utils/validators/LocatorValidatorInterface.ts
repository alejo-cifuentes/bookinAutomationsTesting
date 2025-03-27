import { Locator } from '@playwright/test';

export interface LocatorValidatorI {
  ensureLocatorFound(locator: Locator | null, contextMessage: string): void;
}

