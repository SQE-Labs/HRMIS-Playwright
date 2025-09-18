import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";

export class MyTeamLeavePage extends BasePage {
  public pageTitle: Locator;
  private searchBox: Locator;
  public statusDropdown: Locator;
  employeeColumn: any;
  public CrossIcon: Locator;
  private viewLink: Locator;
  public LeaveApprovePopupTitle: Locator;
  private leaveActionField: Locator;
  private reasonField: Locator;
  private submitButton: Locator;
  public approveSuccessMessage: Locator;

  // Locators

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByText("My Team Leave");
    this.searchBox = page.getByPlaceholder("Search by Employee Name");
    this.statusDropdown = page.locator('select[name="status"]');
    this.CrossIcon = page.getByRole("button", { name: "Close" });
    // //h5[text()='Pending Document to Upload']/following-sibling::button
    this.viewLink = page.locator("//td//a[text()='View'][1]");
    this.LeaveApprovePopupTitle = page.getByText("Leave Approval");
    this.leaveActionField = page.locator('#leaveAction');
    this.reasonField = page.locator("//label[text()='Reason']/following::textarea");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.approveSuccessMessage = page.getByText("Successfully updated.");
  }

  get employeeRows() {
    return this.page.locator("//table/tbody/tr");
  }

  async verifyDefaultValueOfStatusDropdown() {
    const defaultValue = await this.statusDropdown.inputValue();
    expect(defaultValue).toBe(constants.PENDING_STATUS);
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return await this.searchBox.isVisible();
  }

  async selectLeaveStatus(type: string) {
    await this.statusDropdown.selectOption(type);
    this.waitForSpinnerLoaderToDisappear;
  }

  async searchEmployee(employeeName: string) {
    await this.searchBox.fill(employeeName);
    // await this.searchBox.focus();
    // await this.page.keyboard.press('Enter');
    // Wait for loader to disappear if exists

    await this.waitforLoaderToDisappear();
  }

  async getEmployeeNames(): Promise<string[]> {
    const employeeColumn = this.page.locator("//table//tbody/tr/td[2]");
    return await employeeColumn.allTextContents();
  }

  async clickOnCrossIcon() {
    await this.CrossIcon.click();
    await this.waitforLoaderToDisappear();
  }

  async selectLeaveAction(type: string) {
    await this.leaveActionField.selectOption(type);
    this.waitForSpinnerLoaderToDisappear;
  }
  async enterReason(reason: string) {
    await this.reasonField.fill(reason);
  }
  async clickOnSubmitButton() {
    await this.submitButton.click();
    await this.waitforLoaderToDisappear();
  }
  async clickOnViewLink() {
    await this.viewLink.first().click();
    await this.waitforLoaderToDisappear();
  }
}
