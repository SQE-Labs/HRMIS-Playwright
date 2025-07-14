import { Page, Locator } from '@playwright/test';
import { BasePage } from './Basepage';
import { AssetHelper } from "../helpers/AssetHelpers";


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
    await AssetHelper.expandIfCollapsed(this.assetManagement);
  }

  async isExpanded(): Promise<boolean> {
    return await AssetHelper.isExpanded(this.assetManagement);
  }

  async verifySubTabs(subTabsTitles: string[]): Promise<boolean> {
    const titles = await this.subTabs.allTextContents();
    console.debug(titles);

    for (let i = 0; i < subTabsTitles.length; i++) {
      if (!titles[i]?.includes(subTabsTitles[i])) {
        console.debug(`Mismatch at index ${i}: Expected "${subTabsTitles[i]}", but got "${titles[i]}"`);
        return false;
      }
    }

    return true;
  }

  async collapseAssetManagementTab(): Promise<void> {
    await AssetHelper.collapseIfExpanded(this.assetManagement);
  }

  async isCollapsed(): Promise<boolean> {
    return await AssetHelper.isCollapsed(this.assetManagement);
  }
}
