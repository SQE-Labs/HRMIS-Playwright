import { Page, Locator } from '@playwright/test';
import { BasePage } from './Basepage';

export class AssetManagementTab extends BasePage {
    private assetManagement: Locator;
    private subTabs: Locator;

    // Locators
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.assetManagement = page.locator("//a[text()='Asset Management']");
        this.subTabs = page.locator("//a[text()='Asset Management']/../ul/li");

    }

    async expandAssetManagementTab(): Promise<void> {
        if (!(await this.isExpanded())) {
            await this.assetManagement.click(
                { timeout: 5000 }
            );
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

    async verifySubTabs(subTabsTitles: string[]): Promise<boolean> {
        const titles = await this.subTabs.allTextContents();
        console.debug(titles);
        var allMatched = true;
        for (let i = 0; i < titles.length; i++) {
            if (!titles[i].includes(subTabsTitles[i])) {
                console.debug(`Mismatch found at index ${i}: Expected "${subTabsTitles[i]}", but got "${titles[i]}"`);
                allMatched = false;
            }
        }
        return allMatched
    }

    async collapseAssetManagementTab() {
       
        if (!(await this.isCollapsed())) {
            await this.assetManagement.click({ timeout: 5000 });
            console.debug('Asset Management tab is clicked to  collapse');
        }
        else
        console.debug('Asset Management tab is already collapsed');
    }
    async isCollapsed(): Promise<boolean> {
        console.log(await this.assetManagement.getAttribute('aria-expanded') )

            return await this.assetManagement.getAttribute('aria-expanded') === 'false';
        
    }
}
