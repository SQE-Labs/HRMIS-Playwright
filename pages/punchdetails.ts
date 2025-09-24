import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { expect, Locator, Page } from "@playwright/test";

export class PunchDetails extends BasePage {
  private punchDetailTitle: Locator = this.page.locator( "//h1[text()='Punch Details']"  );
  private selectEmployeeDropdown: Locator = this.page.locator( "//div[contains(@id,'react-select-2-placeholder')]");
  private dropdownArrow: Locator = this.page.locator(".css-19bb58m");
  private tableData: Locator = this.page.locator("tbody>tr>td");
  
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

   

