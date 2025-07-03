import { Page, Locator } from '@playwright/test';
import { BasePage } from './Basepage';

export class AssetManagementTab extends BasePage {
    private assetManagement: Locator;
    private subTabs: Locator;
    private subTabsTitles: string[];

    // Locators
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.assetManagement = page.locator("//a[text()='Asset Management']");
        this.subTabs = page.locator("//a[text()='Asset Management']/../ul/li");
        this.subTabsTitles = [
            'Asset Overview',
            'Asset Allocation',
            'Asset De-allocation',
            'Asset Request',
            'New Asset Enrollment',
            'Approve Asset Request (L1)',
            'Approve Asset Request (L2)',
            'Approve Asset Request (IT)',
            'Asset Delivery (Store)',
            'RTO Management'
        ];
    }

    async expandAssetManagementTab(): Promise<void> {
        try {
            await this.assetManagement.click();
        } catch (error) {
            console.error('Asset management tab did not expand', error);
        }
    }

    async isExpanded(): Promise<boolean> {
        try {
            return await this.assetManagement.getAttribute('aria-expanded') === 'true';
        } catch (error) {
            console.error('Error checking if asset management tab is expanded', error);
            return false;
        }
    }

    async verifySubTabs(): Promise<void> {
        const titles = await this.subTabs.allTextContents();
        console.log(titles);
        let allMatched = true;
        for (let i = 0; i < titles.length; i++) {
            if (titles[i] !== this.subTabsTitles[i]) {
                console.log(`Mismatch found at index ${i}: Expected "${this.subTabsTitles[i]}", but got "${titles[i]}"`);
                allMatched = false;
            }
        }
        if (allMatched) {
            console.log("All subtab titles matched successfully!");
        } else {
            console.log("Some subtab titles did not match.");
        }
    }

    async collapseAssetManagementTab(): Promise<void> {
        await this.assetManagement.click();
        await this.page.waitForTimeout(2000);
        try {
            await this.assetManagement.click();
            console.log('Asset management tab collapsed successfully');
        } catch (error) {
            console.error('Asset management tab did not collapse', error);
        }
    }

    async isCollapsed(): Promise<boolean> {
        try {
            return await this.assetManagement.getAttribute('aria-expanded') === 'false';
        } catch (error) {
            console.error('Error checking if asset management tab is collapsed', error);
            return false;
        }
    }
}
