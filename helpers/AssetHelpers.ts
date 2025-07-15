// AssetHelpers.ts
import { expect, Page, Locator } from '@playwright/test';
import { AssetManagementTab } from '../pages/Asset_Management_Tab'; // Adjust import path if needed

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
  }
};
