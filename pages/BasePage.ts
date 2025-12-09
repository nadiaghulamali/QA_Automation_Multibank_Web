import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    readonly downloadSection: Locator;
    readonly appStoreLink: Locator;
    readonly googlePlayLink: Locator;
    readonly marketingBanners: Locator;

    constructor(page: Page) {
        this.page = page;

        this.downloadSection = page
            .locator('section')
            .filter({ hasText: /Download|App Store/i })
            .last();

        this.appStoreLink = this.downloadSection.getByRole('link', {
            name: /app store|apple/i,
        });

        this.googlePlayLink = this.downloadSection.getByRole('link', {
            name: /google play|android/i,
        });

        this.marketingBanners = page
            .locator(
                'section[data-testid*="banner"], section:has-text("Trade on the Go")'
            )
            .last();
    }

    async goto(path: string = '/'): Promise<void> {
        await this.page.goto(path, { waitUntil: 'load' });
    }


    public getTopNavLocator(label: string) {
        // Target direct links (like Dashboard/Markets)
        const linkLocator = this.page.getByRole('link', { name: label, exact: true });

        // Target buttons/spans that contain the text (like Trade/Features)

        const containerLocator = this.page.locator('.style_menu-container__Ha_wV').getByText(label, { exact: true });

        return linkLocator.or(containerLocator);
    }

    async clickTopNav(label: string): Promise<void> {
        const locator = this.getTopNavLocator(label);
        await expect(
            locator,
            `Top nav item "${label}" must be visible before clicking.`
        ).toBeVisible();
        await locator.click();
    }

    async assertTopNavItemsVisible(labels: string[]): Promise<void> {
        for (const label of labels) {
            const navItem = this.getTopNavLocator(label);
            await expect(
                navItem,
                `FAILURE: Top navigation item "${label}" is not visible`
            ).toBeVisible();
        }
    }

    async assertMarketingBannerVisible(): Promise<void> {
        await expect(
            this.marketingBanners.first(),
            'FAILURE: Expected marketing banner to be visible on this page.'
        ).toBeVisible();
    }

    async assertMarketingBannerHidden(): Promise<void> {
        await expect(
            this.marketingBanners.first(),
            'FAILURE: Marketing banner should be hidden on this page.'
        ).toBeHidden();
    }

    async assertDownloadLinksVisible(): Promise<void> {
        await expect(this.appStoreLink, 'App Store link not visible').toBeVisible();
        await expect(
            this.googlePlayLink,
            'Google Play link not visible'
        ).toBeVisible();
    }
}
