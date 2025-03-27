import { Locator } from '@playwright/test';
import { Logger } from '../logger';
import { LocatorValidatorI } from './LocatorValidatorInterface';

export class DefaultLocatorValidator implements LocatorValidatorI {
  constructor(private logger: Logger) {}

  ensureLocatorFound(locator: Locator | null, contextMessage: string): void {
    if (!locator) {
      const message = `${contextMessage} — Locator not found.`;
      this.logger.error(message);
      throw new Error(message);
    }
  }
}