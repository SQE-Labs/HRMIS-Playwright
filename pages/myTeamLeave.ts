import { LoginPage } from "./LoginPage";
import { BasePage } from "./Basepage";
import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";
import { AttendanceLeaveTab } from "./Attendance&Leaves";
import testData from "../testData/testData.json";

export class MyTeamLeavePage extends BasePage {
  public pageTitle: Locator;
  private searchBox: Locator;
  public statusDropdown: Locator;
  employeeColumn: any;
  public CrossIcon: Locator;
  public viewLink: Locator;
  public LeaveApprovePopupTitle: Locator;
  public leaveActionField: Locator;
  public reasonField: Locator;
  public submitButton: Locator;
  public approveSuccessMessage: Locator;
  public employeeRows: Locator;
  public noRecordMsg : Locator
  // public employeeColumn1: Locator
  

  attendanceLeaveTab = new AttendanceLeaveTab(this.page);

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
    this.leaveActionField = page.locator("#leaveAction");
    this.reasonField = page.locator("//label[text()='Reason']/following::textarea" );
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.approveSuccessMessage = page.getByText("Successfully updated.");
    this.employeeRows = page.locator("//table/tbody/tr");
    this.employeeColumn = page.locator("//table//tbody/tr/td[2]");
    this.noRecordMsg = page.getByText('No Record Available')
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
    await this.waitforLoaderToDisappear();
  }

  async getEmployeeNames(): Promise<string[]> {
    return await this.employeeColumn.allTextContents();
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

  async applyForApproval(
    action: string,
    reason: string,
    successMessage: string
  ) {
    // Navigate to My Team Leave tab
    await this.attendanceLeaveTab.navigateToAttendanceTab("My Team Leave");
    await this.waitforLoaderToDisappear();

    // Click on view button of the first row
    await this.clickOnViewLink();
    await this.LeaveApprovePopupTitle.waitFor({ state: "visible" });

    // Verify popup is visible
    expect(await this.LeaveApprovePopupTitle.isVisible()).toBeTruthy();

    // Select leave action (Approve/Reject/etc.)
    await this.selectLeaveAction(action);

    // Enter reason
    await this.enterReason(reason);

    // Click on submit
    await this.clickOnSubmitButton();
    await this.waitforLoaderToDisappear();

    // Verify success message
    expect(await this.approveSuccessMessage.textContent()).toBe(successMessage);
  }
  // ....................

  async verifyTheEmployeeNamesInTheList(leaveStatus: string, employeeName: string) {
    // --- Step 1: Select Leave Status ---
    await this.selectLeaveStatus(leaveStatus);
    await this.waitforLoaderToDisappear();
    await this.waitForDotsLoaderToDisappear();

    // --- Step 2: Verify Dropdown Value ---
    const selectedValue = (await this.statusDropdown.inputValue()).trim();
    expect(selectedValue).toBe(leaveStatus);
    console.log(`Leave status selected: ${selectedValue}`);

    // --- Step 3: Search Employee ---
    await this.searchEmployee(employeeName);
    await this.waitforLoaderToDisappear();

    // --- Step 4: Check if any record exists ---
    const rowCount = await this.employeeRows.count();
    console.log(`Total records found: ${rowCount}`);

    if (await this.noRecordMsg.isVisible()) {
      // --- Optional: Check for “No records found” message ---
      const noDataMessage = this.page.locator('//div[contains(text(),"No records found")]');
      if (await noDataMessage.isVisible()) {
        console.log(`ℹ No records found for employee "${employeeName}" under status "${leaveStatus}".`);
      } else {
        console.warn(`⚠No records found for "${employeeName}" but no message displayed.`);
      }
      return; // exit gracefully
    }

    // --- Step 5: Wait for first result ---
    await this.employeeRows.first().waitFor({ state: "visible", timeout: 5000 });

    // --- Step 6: Get all employee names ---
    const employees = await this.getEmployeeNames();
    console.log("Search results:", employees);

    // --- Step 7: Validate employee names ---
    const invalidNames: string[] = [];
    for (const name of employees) {
      const cleanName = name.trim();
      if (cleanName === "") continue;
      if (!cleanName.toLowerCase().includes(employeeName.toLowerCase())) {
        invalidNames.push(cleanName);
      }
    }

    if (invalidNames.length > 0) {
      console.error(`Some names did not match "${employeeName}":`, invalidNames);
    } else {
      console.log(`All ${employees.length} employees matched "${employeeName}".`);
    }

    expect.soft(invalidNames.length, `Invalid names found for "${employeeName}"`).toBe(0);
  }

}

