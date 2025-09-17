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
    await this.page.waitForSelector('.Toastify__toast-body')
    let message = await this.popUp.textContent()
    console.debug(message)
    await expect(this.page.locator(".Toastify__toast-body")).toBeHidden()
    return message
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


}
