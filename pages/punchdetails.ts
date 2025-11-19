import { LoginPage } from "./LoginPage";
import { BasePage } from "./Basepage";
import { expect, Locator, Page } from "@playwright/test";

export class PunchDetails extends BasePage {
  private punchDetailTitle: Locator = this.page.locator("//h1[text()='Punch Details']");
  private selectEmployeeDropdown: Locator = this.page.locator("//div[contains(@id,'react-select-2-placeholder')]");
  public dropdownArrow: Locator = this.page.locator(".css-19bb58m");
  public tableData: Locator = this.page.locator("tbody>tr>td");
  public forwardIcon: Locator = this.page.locator(".custom_calendar .heading+span");
  public backwardIcon: Locator = this.page.locator(".calendar_nav span:nth-child(1)")
  public cell: Locator = this.page.locator("td:not(.weekoff) span")
  public closeBtn: Locator = this.page.getByText("Close")
  public crossIcon: Locator = this.page.locator("//h5[text()='Attendance Detail']/../button")
  public weekendOffCell: Locator = this.page.locator("td.weekoff:has(p:text('Weekend Off'))")
  public popupTitle: Locator = this.page.getByText("Attendance Detail")



  constructor(page: Page) {
    super(page);
  }

  private selectOption = (employeeName: string) =>
    this.page.getByText(employeeName);

  async verifyPunchDetailsPage() {
    await expect(this.punchDetailTitle).toBeVisible();
    await expect(this.selectEmployeeDropdown).toBeVisible();
  }

  async selectEmployee(employeeName: string) {
    await this.dropdownArrow.click();
    await this.selectOption(employeeName).click();
    // Wait for table to load
    await this.waitforLoaderToDisappear();

    // Log all table rows
    for (const row of await this.tableData.all()) {
      const rowText = await row.textContent();
      console.log(`${employeeName} Data is: ${rowText}`);
    }
  }
}



