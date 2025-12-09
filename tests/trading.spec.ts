// tests/trading.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TradingPage } from '../pages/TradingPage';
import expected from '../data/expectedContent.json';

test.describe('Trading Functionality - Markets / Spot Trading Overview', () => {
  const cfg = (expected as any).markets?.trending || {};
  const minRows: number = cfg.minRows || 1;
  const categories: string[] = cfg.categories || ['Trending'];

  const dataCategories = categories.filter(
    (cat) => !['Favorites', 'Recently Viewed', 'Watchlist'].includes(cat)
  );

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.clickTopNav('Markets');

    await expect(
      page,
      'Prerequisite Failed: User was not redirected to the Markets page.'
    ).toHaveURL(/\/markets/);
  });

  test('Spot trading section displays trading pairs across different categories', async ({ page }) => {
    const tradingPage = new TradingPage(page);

    const heading = tradingPage.getTrendingHeadingLocator();
    await expect(
      heading,
      `FAILURE: "${cfg.heading || 'Trending assets'}" heading is not visible on the Markets page.`
    ).toBeVisible();

    const categoryLocators = tradingPage.getCategoryControlLocators();
    for (const locator of categoryLocators) {
      await expect(
        locator,
        'FAILURE: One or more expected category controls is not visible on the Markets page.'
      ).toBeVisible();
    }

    for (const cat of dataCategories) {
      const btn = tradingPage.getCategoryButton(cat);

      await expect(
        btn,
        `FAILURE: Category button "${cat}" is not visible on the Markets page.`
      ).toBeVisible();

      await btn.click();

      await tradingPage.waitForTradingDataLoad();

      const rows = tradingPage.getTrendingTableRows();
      const count = await rows.count();

      expect(
        count,
        `FAILURE: Category "${cat}" shows no trading pairs in the table.`
      ).toBeGreaterThan(0);
    }
  });

  test('Trading pair data structure and presentation is correct', async ({ page }) => {
    const tradingPage = new TradingPage(page);

    const data = await tradingPage.getFirstTradingRowData();
    const cellTexts = data.cellContents;

    expect(
      cellTexts.length,
      'FAILURE: Failed to extract cell contents from the first trading row.'
    ).toBeGreaterThanOrEqual(4);

    const tickerRegex = /\n[A-Z]{3,5}/;
    const hasNameLikeCell = cellTexts.some((text) => tickerRegex.test(text));

    expect(
      hasNameLikeCell,
      'FAILURE: No cell in the row looks like an asset name with ticker (e.g. "Bitcoin\\nBTC").'
    ).toBe(true);

    const hasNumericCell = cellTexts.some((text) =>
      /[\d,]+(\.\d+)?/.test(text.replace(/[^0-9.,$]/g, ''))
    );
    expect(
      hasNumericCell,
      'FAILURE: No cell in the row looks numeric (price or volume format).'
    ).toBe(true);

    const hasPercentageCell = cellTexts.some((text) =>
      /^[+-]?\s*[\d.,]+%$/.test(text.trim())
    );
    expect(
      hasPercentageCell,
      'FAILURE: No cell in the row looks like a percentage change (e.g. +1.23%).'
    ).toBe(true);
  });
});
