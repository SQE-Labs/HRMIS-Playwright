import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./Basepage";


export class CommonPage extends BasePage {

  public downloadIcon: Locator;
  public crossIconOfPopup: Locator;
  public fullScreenIcon: Locator;

  constructor(page: Page) {
    super(page);

    this.downloadIcon = page.locator("svg[stroke='currentColor'][fill='currentColor']");
    this.crossIconOfPopup = page.locator("div.d-flex.align-items-center.gap-1 button.btn-close");
    this.fullScreenIcon = page.locator("svg[stroke='currentColor'][fill='none']");
  }
  async getCrossIconOfPopup(): Promise<void> {
    await this.waitforLoaderToDisappear();
    await this.crossIconOfPopup.click();
  }

  async getFullScreenIcon(): Promise<void> {
    await this.waitforLoaderToDisappear();
    const fullIcon: Locator = this.page.locator("svg[stroke='currentColor'][fill='none']")
    await fullIcon.click();
  }

  async getDownloadIcon(): Promise<void> {
    await this.waitforLoaderToDisappear();
    const downloadIcon: Locator = this.page.locator("svg[stroke='currentColor'][fill='currentColor']")
    await downloadIcon.click();

  }
}