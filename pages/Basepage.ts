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
    const loader = this.threeDotLoader.first();
    try {
      await loader.waitFor({ state: 'detached', timeout: 10000 });
      return;
    } catch {
      // fall through to hidden check
    }
    try {
      await loader.waitFor({ state: 'hidden', timeout: 2000 });
      return;
    } catch {
      // Loader can stay visible while content is already loaded.
      // Don't block the test indefinitely.
    }
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
    let tooltipMessage = await locator.evaluate(el => {
      const input = el as HTMLInputElement;
      if (typeof input.reportValidity === "function") {
        input.reportValidity();
      }
      return input.validationMessage || "";
    });
    if (!tooltipMessage) {
      tooltipMessage = (await locator.getAttribute("title")) || "";
    }
    if (!tooltipMessage) {
      const describedBy = await locator.getAttribute("aria-describedby");
      if (describedBy) {
        tooltipMessage = (await this.page.locator(`#${describedBy}`).textContent())?.trim() || "";
      }
    }
    if (!tooltipMessage) {
      const nearby = locator.locator("xpath=ancestor::*[1]//*[contains(@class,'invalid') or contains(@class,'error') or contains(@class,'text-danger')]").first();
      if (await nearby.isVisible().catch(() => false)) {
        tooltipMessage = (await nearby.textContent())?.trim() || "";
      }
    }
    return tooltipMessage

  }

  // async getToastMessage() {
  //   await this.toast.waitFor({ state: 'visible', timeout: 5000 })
  //   let message = await this.toast.textContent()
  //   console.debug(message)
  //   return message
  // }
  async toastMessage(timeout = 10000): Promise<string | null> {
    const toastLocator = this.page.locator('.Toastify__toast-body');
    // If page is closed, bail early
    if (this.page.isClosed && this.page.isClosed()) {
      console.warn('Page is already closed when waiting for toast');
      return null;
    }
    try {
      await toastLocator.first().waitFor({ state: 'visible', timeout });
    } catch (err) {
      // No toast appeared within timeout
      console.warn(`No toast visible after ${timeout}ms`);
      return null;
    }
    const count = await toastLocator.count();
    const targetToast = count > 1 ? toastLocator.last() : toastLocator.first();
    const message = await targetToast.textContent();
    console.debug(message);
    try {
      await targetToast.waitFor({ state: 'hidden', timeout: 10000 });
    } catch (err) {
      // swallow — toast may persist briefly; don't fail the test because of toast timing
      console.warn('Toast did not hide within 10s, proceeding.');
    }
    return message;
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
      // If locator passed (Locator object) and resolves to multiple elements, use first() to avoid strict mode errors
      await locator.first().waitFor({ state, timeout });
    }
  }

  async verifyBrowserNativeTooltipMessage(element: Locator, expectedText: string) {
    let tooltipText = await element.evaluate(
      (el) => (el as HTMLInputElement).validationMessage || ""
    );
    const normalize = (text: string) =>
      text.toLowerCase().replace(/[^a-z0-9]/gi, ""); // removes /, -, spaces, etc.

    expect(normalize(tooltipText)).toContain(normalize(expectedText));
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

