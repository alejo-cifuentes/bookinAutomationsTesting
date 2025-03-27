import { Page } from '@playwright/test';

export interface PageValidatorI {
  ensureTabOpened(pages: Page[], contextMessage: string): void;
  ensureTitleContains(title: string, expected: string, contextMessage: string): void;
}