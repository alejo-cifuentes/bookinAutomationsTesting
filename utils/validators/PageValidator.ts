import { Page } from '@playwright/test';
import { Logger } from '../logger';
import { PageValidatorI } from './PageValidatorInterface';

export class DefaultPageValidator implements PageValidatorI {
    constructor(private logger: Logger) {}
  
    ensureTabOpened(pages: Page[], contextMessage: string): void {
      if (pages.length <= 1) {
        const message = `${contextMessage} — Expected new tab, but only one found.`;
        this.logger.error(message);
        throw new Error(message);
      }
    }
  
    ensureTitleContains(title: string, expected: string, contextMessage: string): void {
      if (!title.includes(expected)) {
        const message = `${contextMessage} — Title did not contain '${expected}'. Found: '${title}'`;
        this.logger.error(message);
        throw new Error(message);
      }
    }
  }