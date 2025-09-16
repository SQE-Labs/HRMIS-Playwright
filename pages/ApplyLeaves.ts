import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { expect, Locator, Page } from '@playwright/test';

export class ApplyLeaves extends BasePage {

  private ApplyLeaveButton: Locator;
  public ApplyLeavePopupTitle: Locator;
  private SubmitButton: Locator;
  private LeaveTypeTextBox: Locator;
  private DateRange: Locator;
  private ReasonOfLeaveBox: Locator;
  private SuccessMessage: Locator;
  private WithdrawLink: Locator;
  public WithdrawPopupTitle: Locator;
  private WithdrawReasonField: Locator;
  private WithdrawSuccessMessage: Locator;


  constructor(page: Page) {
    super(page);

    this.ApplyLeaveButton = page.locator("//a[text()='Apply Leave']")
    this.ApplyLeavePopupTitle = page.locator("//a[text()='Apply Leave']")
    this.SubmitButton = page.getByRole('button', { name: 'Submit' })
    this.LeaveTypeTextBox = page.getByLabel('Type of leave');
    this.DateRange = page.getByPlaceholder('mm/dd/yyyy - mm/dd/yyyy')
    this.ReasonOfLeaveBox = page.getByRole('textbox', { name: 'Reason of Leave *' })
    this.SuccessMessage = page.locator("//div[@role='alert']")
    this.WithdrawLink = page.locator('a', { hasText: 'Withdraw' });
    this.WithdrawPopupTitle = page.getByText('Withdraw Leave Request');
    this.WithdrawReasonField = page.getByRole('textbox')
    this.WithdrawSuccessMessage = page.getByText('Leave Withdrawn Successfully')
  }

  async pickCurrentDate() {
    const currentDate = new Date()
    const todayDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${currentDate.getFullYear()}`
    return todayDate
  }

  async getApplyLeaveBtn() {
    this.ApplyLeaveButton.click()
  }

  async getSubmitButton() {
    this.SubmitButton.click()
  }
  async selectLeaveType(type: string) {
    await this.LeaveTypeTextBox.selectOption(type);
  }

  // async selectDateRange(startDate: string, endDate: string) {
  //   const range = `${startDate} - ${endDate}`;
  //   await this.DateRange.fill(range);
  // }
  // await applyLeave.selectDateRange("09/15/2025", "09/20/2025");

  async enterReasonOfLeave(reason: string) {
    await this.ReasonOfLeaveBox.fill(reason);
  }

  // Apply for Leave ****************
  async applyLeave(leaveType: string, reason: string) {
    // 1. Open Apply Leave Popup
    await this.ApplyLeaveButton.click();

    // 2. Select leave type (dynamic)
    await this.LeaveTypeTextBox.selectOption(leaveType);

    // 3. Select date range

    await this.dateRange();
    await this.ReasonOfLeaveBox.fill(reason);

    // 4. Enter reason for leave

    // 5. Submit form
    await this.SubmitButton.click();
    await this.page.waitForLoadState();
  }
  // *****************




async dateRange() {
  const currentDate = new Date();

  // Format today's date as MM/DD/YYYY
  const todayDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate
    .getDate()
    .toString()
    .padStart(2, '0')}/${currentDate.getFullYear()}`;

  // Set the max number of days to add (you can change this value)
  const maxDays = 10;
  const randomDays = Math.floor(Math.random() * maxDays) + 1;

  const futureDate = new Date(currentDate); // Clone the current date
  futureDate.setDate(currentDate.getDate() + randomDays);

  // Format the future date as MM/DD/YYYY
  const futureDateString = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate
    .getDate()
    .toString()
    .padStart(2, '0')}/${futureDate.getFullYear()}`;

  // Use or return the dates to avoid unused variable warnings
  await this.DateRange.click()
  await this.DateRange.fill(`${todayDate}`);
  await this.DateRange.fill(`${futureDateString}`);
  console.log(`Selected date range: ${todayDate} - ${futureDateString}`);
}

  async verifySuccessMessage() {
  await expect(this.SuccessMessage).toBeVisible();
  const successMessage = await this.SuccessMessage.textContent();
  await expect(successMessage).toBe('Leave Applied Successfully! Wait for Approval.');

}
  async getWithDrawLink() {
  this.WithdrawLink.click();
}

  async fillWithDrawReason(reason: string) {
  this.WithdrawReasonField.fill(reason)
}
  async getWithdrawSuccessMessage() {
  await expect(this.WithdrawSuccessMessage).toBeVisible();
  const messageText = await this.WithdrawSuccessMessage.textContent();
  await expect(messageText).toBe('Leave Withdrawn Successfully')
}

  async isWithdrawVisible(): Promise < boolean > {
  return await this.WithdrawLink.isVisible();
}



}


