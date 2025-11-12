import { expect, Locator, Page } from '@playwright/test';
import { CommonUtils } from '../utils/commonUtils';

export class BasePage extends CommonUtils {
  protected page: Page;
  // readonly loader: Locator
  readonly SpinLoader: Locator
  readonly threeDotLoader: Locator
  readonly Spinoverlay: Locator
  readonly threeDotclass: Locator
  readonly toast: Locator
  readonly popUp: Locator
  readonly logoutButton: Locator

  // Adjust the selector based on your 


  constructor(page: Page) {
    super()
    this.page = page;
    this.SpinLoader = page.locator("[data-testid='tail-spin-loading'] ")
    this.threeDotLoader = page.locator("[data-testid='three-dots-svg']")
    this.Spinoverlay = page.locator(".overlay")
    this.threeDotclass = page.locator(".centered-loader")
    this.toast = page.getByRole('alert')
    this.popUp = page.locator('.Toastify__toast-body')
    this.logoutButton = page.locator(".log-out")
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async waitForDotsLoaderToDisappear(): Promise<void> {

    await this.threeDotLoader.first().waitFor({ state: 'detached' });
    //expect(this.threeDotLoader.first()).not.toBeAttached();



  }
  async waitForSpinnerLoaderToDisappear(): Promise<void> {
    //expect(this.SpinLoader.first()).not.toBeAttached();
    await this.SpinLoader.waitFor({ state: 'detached' });


  }
  async waitforLoaderToDisappear(): Promise<void> {
    await this.waitForDotsLoaderToDisappear()
    await this.waitForSpinnerLoaderToDisappear()
  }


  async getValidationMessage(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 2000 })
    let tooltipMessage = await locator.evaluate(el => (el as HTMLInputElement).validationMessage);
    return tooltipMessage

  }

  // async getToastMessage() {
  //   await this.toast.waitFor({ state: 'visible', timeout: 5000 })
  //   let message = await this.toast.textContent()
  //   console.debug(message)
  //   return message
  // }
  async toastMessage() {
    await this.page.waitForSelector('.Toastify__toast-body', { state: 'visible' })
    let message = await this.popUp.textContent()
    console.debug(message)
    await expect(this.page.locator(".Toastify__toast-body")).toBeHidden()
    return message
  }

  async toastMessage2() {
    // Wait for at least one toast to appear
    const toast = this.page.locator('.Toastify__toast-body').last();
    await toast.waitFor({ state: 'visible' });

    // Get its text
    const message = await toast.textContent();
    console.debug(message);

    // Wait for that toast to disappear before proceeding
    await toast.waitFor({ state: 'detached' });

    return message;
  }


  async verifySuccessMessage(expectedMessage: string) {
    const message = await this.toastMessage();
    expect(message?.trim()).toBe(expectedMessage);
    console.log(`Success message verified: ${expectedMessage}`);
  }
  

  async logout() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.waitForSelector('.log-out', { state: 'visible' })
    await this.logoutButton.click()
    await this.page.waitForLoadState('networkidle');
    console.log("User logged out successfully");
  }

  async waitFor(locator: Locator | string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout = 7000) {
    if (typeof locator === 'string') {
      // If string passed, treat as selector
      await this.page.waitForSelector(locator, { state, timeout });
    } else {
      // If locator passed (Locator object)
      await locator.waitFor({ state, timeout });
    }
  }

  async verifyTooltipMessage(element: Locator, expectedText: string) {
    // Step 1: Hover or focus to trigger tooltip
    await element.hover();
    await this.page.waitForTimeout(500);

    // Step 2: Look for custom tooltip in DOM
    const tooltip = this.page.locator(
      '.mat-tooltip, [role="tooltip"], .tooltip, .ant-tooltip-inner, [data-tooltip]'
    );

    let tooltipText = "";

    try {
      // Step 3: Try to get custom tooltip text if visible
      await expect(tooltip.first()).toBeVisible({ timeout: 1500 });
      tooltipText = (await tooltip.first().innerText()).trim();
    } catch {
      // Step 4: Fallback 1 – get 'title' attribute
      tooltipText = (await element.getAttribute("title"))?.trim() || "";

      // Step 5: Fallback 2 – handle browser-native validation tooltip
      if (!tooltipText) {
        tooltipText = await element.evaluate(
          (el) => (el as HTMLInputElement).validationMessage || ""
        );
      }
    }

    const normalize = (text: string) =>
      text.toLowerCase().replace(/[^a-z0-9]/gi, ""); // removes /, -, spaces, etc.

    expect(normalize(tooltipText)).toContain(normalize(expectedText));

}
}

