import { expect, Locator, Page } from '@playwright/test';
import { CommonUtils } from '../utils/commonUtils';

export class BasePage extends CommonUtils {
  protected page: Page;
  readonly loader: Locator
  readonly SpinLoader: Locator
  readonly threeDotLoader: Locator
  readonly Spinoverlay: Locator
  readonly threeDotclass: Locator
  readonly toast: Locator

  // Adjust the selector based on your 


  constructor(page: Page) {
    super()
    this.page = page;
    this.SpinLoader = page.locator("[data-testid='tail-spin-loading'] ")
    this.threeDotLoader = page.locator("[data-testid='three-dots-svg']")
    this.Spinoverlay = page.locator(".overlay")
    this.threeDotclass = page.locator(".centered-loader")
    this.toast = page.getByRole('alert')
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async waitForDotsLoaderToDisappear(): Promise<void> {

    await this.threeDotLoader.waitFor({ state: 'detached' });
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
    let tooltipMessage = await locator.evaluate(el => (el as HTMLInputElement).validationMessage);
    return tooltipMessage

  }

  async getToastMessage() {
    await this.toast.waitFor({ state: 'visible', timeout: 5000 })
    let message = await this.toast.textContent()
    console.debug(message)
    return message
  }
}