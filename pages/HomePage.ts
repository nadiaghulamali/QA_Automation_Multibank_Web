// pages/HomePage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import expected from '../data/expectedContent.json';

export type MenuKey = 'Trade' | 'Features' | 'About Us' | 'Support';

export class HomePage extends BasePage {

    // DROPDOWN TRIGGERS

    readonly tradeMenuButton: Locator;
    readonly featuresMenuButton: Locator;
    readonly aboutMenuButton: Locator;
    readonly supportMenuButton: Locator;
    readonly dropdownPanel: Locator;

    constructor(page: Page) {
        super(page);

        this.tradeMenuButton = page.locator('#trade-header-option-open-button');
        this.featuresMenuButton = page.locator('#features-header-option-open-button');
        this.aboutMenuButton = page.locator('#about-header-option-open-button');
        this.supportMenuButton = page.locator('#support-header-option-open-button');

        // Shared dropdown panel container
        this.dropdownPanel = page.locator('.style_popover-panel__IfxFO').first();
    }

    /**
     * Optional convenience: explicitly go to home ("/") using baseURL.
     */
    async gotoHome(): Promise<void> {
        await this.goto('/');
    }

    /**
     * Assert that all expected top navigation items are visible.
     */

    async assertTopNavItemsVisible(): Promise<void> {
        const items: string[] = expected.navigation.items;
        await super.assertTopNavItemsVisible(items);
    }

    /**
     * Open a dropdown menu (Trade, Features, About Us, Support).
     */
    async openDropdown(menu: MenuKey): Promise<void> {
        const map: Record<MenuKey, Locator> = {
            Trade: this.tradeMenuButton,
            Features: this.featuresMenuButton,
            'About Us': this.aboutMenuButton,
            Support: this.supportMenuButton,
        };

        const button = map[menu];

        await expect(
            button,
            `FAILURE: Dropdown trigger for "${menu}" is not visible`
        ).toBeVisible();

        await button.click();

        await expect(
            this.dropdownPanel,
            `FAILURE: Dropdown panel for "${menu}" did not appear after click`
        ).toBeVisible();
    }

    /**
     * Click a submenu item inside an open dropdown, by its visible label.
     */
    async clickDropdownItem(label: string): Promise<void> {
        const link = this.page.getByRole('link', { name: new RegExp(label, 'i') });

        await expect(
            link,
            `FAILURE: Sub-menu item "${label}" is not visible/clickable.`
        ).toBeVisible();

        await link.click();
    }
}
