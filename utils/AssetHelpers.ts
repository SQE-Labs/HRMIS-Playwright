// AssetHelpers.ts
import { expect, Page, Locator } from '@playwright/test';
import { AssetManagementTab } from '../pages/Asset_Management_Tab'; // Adjust import path if needed
import fs from 'fs';

export const AssetHelper = {
  /**
   * Navigates to Allocation Asset tab after expanding Asset Management tab
   */
  async navigateToAllocationAsset(
    page: Page,
    allocationAsset: Locator,
  ): Promise<void> {
    const assetManagementTab = new AssetManagementTab(page);
    await assetManagementTab.expandAssetManagementTab();
    await allocationAsset.click();
    await page.waitForTimeout(1000);
  },


  /**
   * Verifies that all items in a result array match the expected keyword
   */
  async verifySearchResults(
    results: string[],
    keyword: string,
    context: string
  ): Promise<void> {
    const allMatch = results.every((item) => item === keyword);

    if (allMatch) {
      console.log(`✅ Relevant records appear listed when searched by ${context}`);
    } else {
      results.forEach((item, i) => {
        if (item !== keyword) {
          console.log(`❌ Mismatch at index ${i}: got "${item}" instead of "${keyword}"`);
        }
      });
      console.log(`⚠️ Not all records matched when searched by ${context}`);
    }

    expect(allMatch).toBeTruthy();
  },

  /**
   * Extracts integer asset count from a textual array
   */
  getAssetCountFromText(textArr: string[]): number {
    return textArr.length > 0 ? parseInt(textArr[0].replace(/\D/g, ''), 10) : 0;
  },

  /**
   * Verifies that actual headers match expected headers
   */
  async verifyHeadersMatch(
    actual: string[],
    expected: string[]
  ): Promise<void> {
    const allMatched = actual.length === expected.length && actual.every((val, i) => val === expected[i]);

    actual.forEach((val, i) => {
      if (val !== expected[i]) {
        console.log(`❌ Mismatch at index ${i}: Expected "${expected[i]}", but got "${val}"`);
      }
    });

    if (allMatched) {
      console.log("✅ All column headers matched successfully.");
    } else {
      console.log("⚠️ Some column headers did not match.");
    }

    expect(allMatched).toBeTruthy();
  },

  /**
   * Extracts number pairs from page count string like "Page 1 of 4"
   */
  extractPageCount(text: string): [number, number] {
    const matches = text.match(/\d+/g);
    const currentPage = matches && matches[0] ? parseInt(matches[0], 10) : 0;
    const totalPage = matches && matches[1] ? parseInt(matches[1], 10) : 0;
    return [currentPage, totalPage];
  },

  async navigateToDeallocationTab(deallocationSubtab: Locator, assetManagementTab: { expandAssetManagementTab: () => Promise<void> }) {
    await assetManagementTab.expandAssetManagementTab();
    await deallocationSubtab.click();
  },
  async navigateToNewAssetEnrollmet() {
    await this.assetEnrollmentSubtab.click();
  },
  async navigateToAssetTypeRequest(assetEnrollmentSubtab: Locator, assetManagementTab: { expandAssetManagementTab: () => Promise<void> }) {
    await this.assetEnrollmentSubtab.click();
    await this.approveAssetTypeRequest.click();
  },


  async getValidationMessage(locator: Locator): Promise<string> {
    return await locator.evaluate(el => (el as HTMLInputElement).validationMessage);
  },

  async fillAndSubmitField(locator: Locator, value: string, submitButton: Locator) {
    await locator.fill(value);
    await submitButton.click();
  },
  async isExpanded(locator: Locator): Promise<boolean> {
    const state = await locator.getAttribute('aria-expanded');
    expect(state).not.toBeNull();
    return state === 'true';
  },

  async isCollapsed(locator: Locator): Promise<boolean> {
    const state = await locator.getAttribute('aria-expanded');
    expect(state).not.toBeNull();
    return state === 'false';
  },

  async expandIfCollapsed(locator: Locator): Promise<void> {
    const isExpanded = await AssetHelper.isExpanded(locator);
    if (!isExpanded) {
      await locator.click({ timeout: 5000 });
    }
  },

  async collapseIfExpanded(locator: Locator): Promise<void> {
    const isCollapsed = await AssetHelper.isCollapsed(locator);
    if (!isCollapsed) {
      await locator.click({ timeout: 5000 });
    }
  },
  async selectRandomOptionFromDropdown(dropdownLocator: Locator): Promise<string | null> {
    await dropdownLocator.waitFor({ state: "visible", timeout: 5000 });
    const options = await dropdownLocator.locator("option").allInnerTexts();

    const validOptions = options.filter(option => option.trim() !== "");
    if (validOptions.length === 0) {
      console.error("No valid options available in the dropdown.");
      return null;
    }

    const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)].trim();
    console.log(`Randomly selected option: ${randomOption}`);
    try {
      await dropdownLocator.selectOption({ label: randomOption });
      console.log(`Successfully selected: ${randomOption}`);
      return randomOption;
    } catch (error) {
      console.error(`Failed to select option '${randomOption}' from dropdown:`, error);
      return null;
    }
  },


  async parseNumberFromText(text: string): Promise<number> {
    const parsed = parseInt(text.replace(/\D/g, ''), 10);
    return isNaN(parsed) ? 0 : parsed;
  },
  async waitForLoaderToDisappear(loaderLocator: Locator, timeout: number = 10000): Promise<void> {
    console.log("Waiting for loader to disappear...");
    await expect(loaderLocator).not.toBeAttached({ timeout });
    console.log("Loader disappeared.");
  },


  async verifyFileDownload(
    page: Page,
    downloadButtonLocator: Locator,
    expectedFileNamePart: string,
    subFolderPath: string = 'HRMIS-Playwright\\Download'
  ): Promise<string> {
    console.log("Attempting to download file...");
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 30000 }), // Increased timeout for downloads
      downloadButtonLocator.click()
    ]);

    const downloadedFile = download.suggestedFilename();
    console.log("Suggested downloaded file name:", downloadedFile);
    expect(downloadedFile).toContain(expectedFileNamePart);

    const userHomeDir = process.env.HOME || process.env.USERPROFILE;
    if (!userHomeDir) {
      throw new Error("Could not determine user home directory for download path.");
    }
    const downloadDir = `${userHomeDir}\\Desktop\\${subFolderPath}`;

    // Ensure the directory exists
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const downloadPath = `${downloadDir}\\${downloadedFile}`;
    await download.saveAs(downloadPath);

    expect(fs.existsSync(downloadPath)).toBeTruthy();
    console.log(`File successfully downloaded to: ${downloadPath}`);
    return downloadPath;
  },
  async verifyAlertMessage(alertLocator: Locator, expectedText: string, timeout: number = 5000): Promise<void> {
    console.log(`Waiting for alert with text: "${expectedText}"`);
    await expect(alertLocator).toBeVisible({ timeout });
    const alertMessage = await alertLocator.textContent();
    expect(alertMessage?.trim()).toContain(expectedText);
    console.log("Alert message appeared as expected:", alertMessage);
  },

};
