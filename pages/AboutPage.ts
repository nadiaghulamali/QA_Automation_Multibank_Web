import { Page, Locator, expect } from '@playwright/test';

export class AboutPage {
  readonly page: Page;
  readonly url: string;

  // Hero / banner sections
  readonly heroSecureHeading: Locator;
  readonly heroKhabibHeading: Locator;
  readonly heroTradFiHeading: Locator;
  readonly heroOpenLiveButtons: Locator;
  readonly heroDownloadAppButtons: Locator;

  // Securely Build Your Portfolio
  readonly securePortfolioHeading: Locator;
  readonly securePortfolioText: Locator;
  readonly securePortfolioCta: Locator;

  // Catch Your Next Trading Opportunity 
  readonly tradingOpportunityHeading: Locator;
  readonly seeMoreButton: Locator;
  readonly pairsHeader: Locator;
  readonly priceHeader: Locator;
  readonly change24hHeader: Locator;
  readonly highHeader: Locator;
  readonly lowHeader: Locator;
  readonly btcPairLink: Locator;
  readonly ethPairLink: Locator;

  // Main feature cards
  readonly fastestTradeHeading: Locator;
  readonly fastestTradeText: Locator;
  readonly creditCardHeading: Locator;
  readonly creditCardText: Locator;
  readonly panicSellHeading: Locator;
  readonly panicSellText: Locator;
  readonly convertHeading: Locator;
  readonly convertText: Locator;

  // Our Advantages
  readonly ourAdvantagesHeading: Locator;
  readonly cryptoTradingText: Locator;
  readonly fiatOnOffRampHeading: Locator;
  readonly fiatOnOffRampText: Locator;
  readonly heavilyRegulatedHeading: Locator;
  readonly securityOfFundsHeading: Locator;

  // Spot Trading & RWA 
  readonly spotTradingText: Locator;
  readonly rwaBlock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://multibank.io/en-AE';

    // ---------------- HERO / BANNERS ----------------
    this.heroSecureHeading = page.getByRole('heading', {
      name: /secure financial ecosystem powered by the blockchain/i,
    });

    this.heroKhabibHeading = page.getByRole('heading', {
      name: /master the market with a champion/i,
    });

    this.heroTradFiHeading = page.getByRole('heading', {
      name: /where\s+tradfi\s+meets\s+crypto/i,
    });

    this.heroOpenLiveButtons = page.getByRole('button', {
      name: /open live account/i,
    });

    this.heroDownloadAppButtons = page.getByRole('button', {
      name: /download multibank\.io app/i,
    });

    // -------- SECURELY BUILD YOUR PORTFOLIO ---------
    this.securePortfolioHeading = page.getByRole('heading', {
      name: /securely build your portfolio with multibank\.io/i,
    });

    this.securePortfolioText = page.getByText(
      /diversify your crypto portfolio on one of the most regulated platforms in the world/i
    );

    this.securePortfolioCta = page.getByRole('button', { name: /get started/i });

    // --------- CATCH YOUR NEXT TRADING OPPORTUNITY ----------
    this.tradingOpportunityHeading = page.getByRole('heading', {
      name: /catch your next trading opportunity/i,
    });

    this.seeMoreButton = page.getByRole('button', { name: /see more/i });

    this.pairsHeader = page.getByRole('columnheader', { name: /pairs/i });
    this.priceHeader = page.getByRole('columnheader', { name: /price/i });
    this.change24hHeader = page.getByRole('columnheader', {
      name: /24h change/i,
    });
    this.highHeader = page.getByRole('columnheader', { name: /high/i });
    this.lowHeader = page.getByRole('columnheader', { name: /low/i });

    this.btcPairLink = page.getByRole('link', { name: /btc\/usdt/i });
    this.ethPairLink = page.getByRole('link', { name: /eth\/usdt/i });

    // ----------------- MAIN FEATURE CARDS -------------------
    this.fastestTradeHeading = page.getByRole('heading', {
      name: /the fastest way to trade/i,
    });

    this.fastestTradeText = page.getByText(
      /40 nanosecond trading execution speed/i
    );

    this.creditCardHeading = page.getByRole('heading', {
      name: /credit card & bank transfers/i,
    });

    this.creditCardText = page.getByText(
      /deposit usd and euro.*credit card or bank transfer/i,
      { exact: false }
    );

    this.panicSellHeading = page.getByRole('heading', { name: /panic sell/i });

    this.panicSellText = page.getByText(
      /quickly sell all your low value cryptocurrencies/i
    );

    this.convertHeading = page.getByRole('heading', {
      name: /^convert$/i,
    });

    this.convertText = page.getByText(/simple, secure, and instant\./i);

    // ------------------- OUR ADVANTAGES ---------------------
    this.ourAdvantagesHeading = page.getByRole('heading', {
      name: /our advantages/i,
    });

    this.cryptoTradingText = page.getByText(/crypto trading/i);

    this.fiatOnOffRampHeading = page.getByRole('heading', {
      name: /fiat on and off ramp/i,
    });

    this.fiatOnOffRampText = page.getByText(
      /seamlessly convert between fiat and crypto/i
    );

    this.heavilyRegulatedHeading = page.getByRole('heading', {
      name: /heavily regulated/i,
    });

    this.securityOfFundsHeading = page.getByRole('heading', {
      name: /security of funds/i,
    });

    // ---------------- SPOT TRADING & RWA --------------------
    this.spotTradingText = page.getByText(/spot trading/i);

    this.rwaBlock = page.getByText(
      /multibank\.io rwa is bringing \$?10 billion in tokenized real-world assets to market/i,
    );
  }

  // --------------- NAVIGATION -----------------

  async goto(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'load' });
  }

  // --------------- ASSERTIONS -----------------

  async assertHeroSections(): Promise<void> {
    await expect(
      this.heroSecureHeading,
      'FAILURE: "SECURE FINANCIAL ECOSYSTEM POWERED BY THE BLOCKCHAIN!" heading is not visible on About → Why MultiLink page.'
    ).toBeVisible();

    await expect(
      this.heroKhabibHeading,
      'FAILURE: "Master the Market with a Champion’s Mindset" heading is not visible on About → Why MultiLink page.'
    ).toBeVisible();

    await expect(
      this.heroTradFiHeading,
      'FAILURE: "WHERE TRADFI MEETS CRYPTO" heading is not visible on About → Why MultiLink page.'
    ).toBeVisible();

    await expect(
      this.heroOpenLiveButtons.first(),
      'FAILURE: "Open Live Account" button is not visible in hero section on About → Why MultiLink page.'
    ).toBeVisible();

    await expect(
      this.heroDownloadAppButtons.first(),
      'FAILURE: "Download MultiBank.io App" button is not visible in hero section on About → Why MultiLink page.'
    ).toBeVisible();
  }

  async assertSecurePortfolioSection(): Promise<void> {
    await expect(
      this.securePortfolioHeading,
      'FAILURE: "Securely Build Your Portfolio with MultiBank.io" heading is not visible.'
    ).toBeVisible();

    await expect(
      this.securePortfolioText,
      'FAILURE: Secure portfolio description text is not visible.'
    ).toBeVisible();

    await expect(
      this.securePortfolioCta,
      'FAILURE: "Get Started" button is not visible in Secure Portfolio section.'
    ).toBeVisible();
  }

  async assertTradingTableSection(): Promise<void> {
    await expect(
      this.tradingOpportunityHeading,
      'FAILURE: "Catch Your Next Trading Opportunity" heading is not visible.'
    ).toBeVisible();

    await expect(
      this.seeMoreButton,
      'FAILURE: "See More" button is not visible in trading table section.'
    ).toBeVisible();

    await expect(
      this.pairsHeader,
      'FAILURE: "Pairs" column header is not visible in market table.'
    ).toBeVisible();

    await expect(
      this.priceHeader,
      'FAILURE: "Price" column header is not visible in market table.'
    ).toBeVisible();

    await expect(
      this.change24hHeader,
      'FAILURE: "24H Change" column header is not visible in market table.'
    ).toBeVisible();

    await expect(
      this.highHeader,
      'FAILURE: "High" column header is not visible in market table.'
    ).toBeVisible();

    await expect(
      this.lowHeader,
      'FAILURE: "Low" column header is not visible in market table.'
    ).toBeVisible();

    await expect(
      this.btcPairLink,
      'FAILURE: BTC/USDT trading pair link is not visible in market table.'
    ).toBeVisible();

    await expect(
      this.ethPairLink,
      'FAILURE: ETH/USDT trading pair link is not visible in market table.'
    ).toBeVisible();
  }

  async assertMainCardsSection(): Promise<void> {
    await expect(
      this.fastestTradeHeading,
      'FAILURE: "The Fastest Way to Trade" heading is not visible in feature cards section.'
    ).toBeVisible();

    await expect(
      this.fastestTradeText,
      'FAILURE: Fastest trading descriptive text (40 nanosecond execution…) is not visible.'
    ).toBeVisible();

    await expect(
      this.creditCardHeading,
      'FAILURE: "Credit Card & Bank Transfers" heading is not visible.'
    ).toBeVisible();

    await expect(
      this.creditCardText,
      'FAILURE: Credit Card & Bank Transfers descriptive text is not visible.'
    ).toBeVisible();

    await expect(
      this.panicSellHeading,
      'FAILURE: "Panic Sell" heading is not visible.'
    ).toBeVisible();

    await expect(
      this.panicSellText,
      'FAILURE: Panic Sell descriptive text is not visible.'
    ).toBeVisible();

    await expect(
      this.convertHeading,
      'FAILURE: "Convert" heading is not visible.'
    ).toBeVisible();

    await expect(
      this.convertText,
      'FAILURE: Convert descriptive text ("Simple, secure, and instant.") is not visible.'
    ).toBeVisible();
  }

  async assertAdvantagesSection(): Promise<void> {
    await expect(
      this.ourAdvantagesHeading,
      'FAILURE: "Our Advantages" heading is not visible on About → Why MultiLink page.'
    ).toBeVisible();

    await expect(
      this.cryptoTradingText,
      'FAILURE: "Crypto Trading" text is not visible in Our Advantages section.'
    ).toBeVisible();

    await expect(
      this.fiatOnOffRampHeading,
      'FAILURE: "Fiat On and Off Ramp" heading is not visible in Our Advantages section.'
    ).toBeVisible();

    await expect(
      this.fiatOnOffRampText,
      'FAILURE: "Fiat On and Off Ramp" description text is not visible.'
    ).toBeVisible();

    await expect(
      this.heavilyRegulatedHeading,
      'FAILURE: "Heavily Regulated" heading is not visible in Our Advantages section.'
    ).toBeVisible();

    await expect(
      this.securityOfFundsHeading,
      'FAILURE: "Security of Funds" heading is not visible in Our Advantages section.'
    ).toBeVisible();
  }

  async assertSpotTradingAndRwaSection(): Promise<void> {
    await expect(
      this.spotTradingText.first(),
      'FAILURE: "Spot Trading" text is not visible in the Spot Trading section on About → Why MultiLink page.'
    ).toBeVisible();

    await expect(
      this.rwaBlock.first(),
      'FAILURE: MultiBank.io RWA block text is not visible on About → Why MultiLink page.'
    ).toBeVisible();
  }

  async assertFullPageStructure(): Promise<void> {
    await this.assertHeroSections();
    await this.assertSecurePortfolioSection();
    await this.assertTradingTableSection();
    await this.assertMainCardsSection();
    await this.assertAdvantagesSection();
    await this.assertSpotTradingAndRwaSection();
  }
}
