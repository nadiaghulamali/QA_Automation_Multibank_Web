// pages/TradingPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import expected from '../data/expectedContent.json';

export interface TradingRowData {
  rowCount: number;
  cellContents: string[];
}

export class TradingPage extends BasePage {
  private readonly cfg = (expected as any).markets?.trending || {};

  readonly trendingHeading: Locator;
  readonly tradingTable: Locator;
  readonly tableBodyRows: Locator;

  constructor(page: Page) {
    super(page);

    // "Trending assets" heading (fallback: generic h1 in the container)
    this.trendingHeading = page
      .getByRole('heading', { name: /trending assets/i })
      .or(page.locator('.style_container___M_mA h1'));

    // Main markets table (first table on the page)
    this.tradingTable = page.locator('table').first();
    this.tableBodyRows = this.tradingTable.locator('tbody tr');
  }

  // ---------------------------
  // LOCATOR HELPERS
  // ---------------------------

  getTrendingHeadingLocator(): Locator {
    return this.trendingHeading;
  }

  /**
   * Returns a Locator for a category/tab by visible label.
   * Example labels: "Trending", "Top Gainers", "Top Losers".
   */
  getCategoryButton(label: string): Locator {
    return this.page
      .getByRole('button', { name: label, exact: true })
      .or(this.page.getByRole('tab', { name: label, exact: true }));
  }

  /**
   * Returns locators for all expected category controls,
   */
  getCategoryControlLocators(): Locator[] {
    const categories: string[] = this.cfg.categories || [];
    const locators: Locator[] = [];

    for (const category of categories) {
      locators.push(this.getCategoryButton(category));
    }

    return locators;
  }

  /**
   * Exposes the table body rows so tests can count them.
   */
  getTrendingTableRows(): Locator {
    return this.tableBodyRows;
  }

  // ---------------------------
  // DATA HELPERS
  // ---------------------------

  /**
   * Waits for the trading table data to load by ensuring
   * at least one visible row is present.
   */
  async waitForTradingDataLoad(timeoutMs: number = 15000): Promise<boolean> {
    try {
      await this.tableBodyRows.first().waitFor({
        state: 'visible',
        timeout: timeoutMs,
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Extracts basic data for the first trading row:
   *  - rowCount: total number of rows in tbody
   *  - cellContents: cleaned cell text values from the first row
   */
  async getFirstTradingRowData(): Promise<TradingRowData> {
    await this.waitForTradingDataLoad();

    const rowCount = await this.tableBodyRows.count();
    if (rowCount === 0) {
      return { rowCount: 0, cellContents: [] };
    }

    const firstRow = this.tableBodyRows.first();
    const cells = firstRow.locator('td');

    const cellTextsRaw = await cells.allInnerTexts();
    const cellContents = cellTextsRaw
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    return { rowCount, cellContents };
  }
}
