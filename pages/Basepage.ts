import { Locator, Page } from '@playwright/test';

export class BasePage {
  protected page: Page;
  readonly loader: Locator
  readonly SpinLoader: Locator
  readonly threeDotLoader: Locator
  readonly Spinoverlay: Locator
  readonly threeDotclass: Locator
  constructor(page: Page) {
    this.page = page;
    this.SpinLoader = page.locator("[data-testid='tail-spin-loading'] ")
    this.threeDotLoader = page.locator("[data-testid='three-dots-svg']")
    this.Spinoverlay = page.locator(".overlay")
    this.threeDotclass = page.locator(".centered-loader")
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async waitForDotsLoaderToDisappear(timeout = 10000): Promise<void> {
    await this.threeDotLoader.waitFor({ state: 'detached', timeout });
  }
  async waitForSpinnerLoaderToDisappear(timeout = 10000): Promise<void> {
    await this.SpinLoader.waitFor({ state: 'detached', timeout });
  }
}