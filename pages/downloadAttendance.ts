import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";
import { BasePage } from "./Basepage";
import * as fs from 'fs';
import * as path from 'path';

export class DownloadAttendance extends BasePage {
  public labels: Locator = this.page.locator("//div[@class='inputs column-gap-2']//label");
  public monthDropdown: Locator = this.page.locator("//select[@id='month']");
  public monthOption: Locator = this.page.locator("//select[@id='month']/option");
  public yearDropdown: Locator = this.page.locator("//select[@id='year']");
  public employeeFlagDropdown: Locator = this.page.locator("//select[@id='employee-flag']");
  public downloadButton: Locator = this.page.getByText('Compile & Download')
  public selectEmployeeDropdown: Locator = this.page.locator(".css-19bb58m");
  public employeeOption: Locator = this.page.locator("#react-select-2-listbox span")





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

  async downloadAttendanceSheet(month: string, employeeName: string, downloadFolder: string) {
    // Ensure download folder exists and clear old files
    if (!fs.existsSync(downloadFolder)) {
      fs.mkdirSync(downloadFolder, { recursive: true });
    } else {
      const oldFiles = fs.readdirSync(downloadFolder);
      for (const file of oldFiles) fs.unlinkSync(path.join(downloadFolder, file));
    }

    // 1 Select month
    await this.monthDropdown.selectOption(month);

    // 2 Open employee dropdown and select employee
    await this.selectEmployeeDropdown.click();
    await this.page.getByText(employeeName).waitFor({ state: 'visible', timeout: 60000 });
    await this.page.getByText(employeeName).click();

    // 3 Wait for download event and click download button
    const [download] = await Promise.all([
      this.page.waitForEvent('download', { timeout: 120000 }), // wait up to 2 minutes
      this.downloadButton.click(),
    ]);

    // 4 Save the downloaded file
    const fileName = `Attendance_${month}_${employeeName.replace(/ /g, '')}.xlsx`;
    const filePath = path.join(downloadFolder, fileName);
    await download.saveAs(filePath);

    // 5 Verify the file exists
    expect(fs.existsSync(filePath)).toBeTruthy();
    console.log(' Excel file downloaded at:', filePath);

    return filePath; // return path in case test wants to use it
  }



  async selectMonth(month: string) {
    // Wait for dropdown to be visible
    await this.monthDropdown.waitFor({ state: 'visible', timeout: 30000 });

    // Select the month
    await this.monthDropdown.selectOption({ label: month });

    // Optional: wait a bit for any dependent UI to update
    await this.waitForDotsLoaderToDisappear(); // if selecting month triggers loader
  }

  async selectEmployee(employeeName: string) {
    await this.selectEmployeeDropdown.click();

    // Filter the employeeOption locator by text
    const optionToClick = this.employeeOption.locator(`text="${employeeName}"`);

    // Wait for the option to be visible
    await optionToClick.waitFor({ state: 'visible', timeout: 60000 });

    // Scroll into view if necessary
    await optionToClick.scrollIntoViewIfNeeded();

    // Click the desired employee
    await optionToClick.click();

    // Wait for loader or UI update if any
    await this.waitForDotsLoaderToDisappear();
  }

  

}

