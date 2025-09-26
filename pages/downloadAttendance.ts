import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";
import { BasePage } from "./Basepage";

export class DownloadAttendance extends BasePage {
  private labels: Locator = this.page.locator("//div[@class='inputs column-gap-2']//label");
  private monthDropdown: Locator = this.page.locator("//select[@id='month']");
  private yearDropdown: Locator = this.page.locator("//select[@id='year']");
  private employeeFlagDropdown: Locator = this.page.locator("//select[@id='employee-flag']");
  private downloadButton: Locator = this.page.getByText('Compile & Download')




  constructor(page: Page) {

    super(page);
  }

  async verifyUILabels() {
    const allLabels = await this.labels.allTextContents();
    for (const label of allLabels) {
      console.log("Label found: " + label);

      const today = new Date();
      const monthName = today.toLocaleString('default', { month: 'long' }); // e.g. 'September'
      const yearString = today.getFullYear().toString();

      // verify the default selected values

      await expect(await this.monthDropdown.inputValue()).toBe(monthName);
      await expect(this.yearDropdown).toHaveValue(yearString);
      await expect(this.employeeFlagDropdown).toHaveValue('ALL');
    }
  }

  async downloadAttendanceSheet(month:string , employeeName: string) {
    await this.monthDropdown.selectOption(month);
    await this.employeeFlagDropdown.selectOption(employeeName);


  }
}
