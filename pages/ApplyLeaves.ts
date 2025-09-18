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
  private YesButtonOfApplyLeave: Locator;
  private privilegeLeaveOption: Locator;


  constructor(page: Page) {
    super(page);

    this.ApplyLeaveButton = page.locator("//a[text()='Apply Leave']")
    this.ApplyLeavePopupTitle = page.locator("//a[text()='Apply Leave']")
    this.SubmitButton = page.getByRole('button', { name: 'Submit' })
    this.LeaveTypeTextBox = page.getByLabel('Type of leave');
    this.DateRange = page.getByPlaceholder('mm/dd/yyyy - mm/dd/yyyy')
    this.ReasonOfLeaveBox = page.getByRole('textbox', { name: 'Reason of Leave *' })
    this.SuccessMessage = page.getByText('Leave Applied Successfully! Wait for Approval.')
    this.WithdrawLink = this.page.getByText('Withdraw')
    this.WithdrawPopupTitle = page.getByText('Withdraw Leave Request');
    this.WithdrawReasonField = page.getByRole('textbox')
    this.WithdrawSuccessMessage = page.getByText('Leave Withdrawn Successfully')
    this.YesButtonOfApplyLeave = page.locator("//div[contains(@class,'modal-full-height')]/div//button[text()='Yes'] ")
    this.privilegeLeaveOption = page.getByLabel('PrivilegeLeave');
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

  async enterReasonOfLeave(reason: string) {
    await this.ReasonOfLeaveBox.fill(reason);
  }

  // Apply for Leave ****************

  async applyLeave(leaveType: string, reason: string) {
  const privilegeCount = await this.privilegeLeaveOption.count();

  // 1. Open Apply Leave Popup
  await this.ApplyLeaveButton.click();

  // 2. Select leave type (dynamic)
  await this.LeaveTypeTextBox.selectOption(leaveType);

  // 3. If privilege leave option is not present, click Yes button only if visible
  if (privilegeCount === 0) {
    if (await this.YesButtonOfApplyLeave.isVisible()) {
      await this.YesButtonOfApplyLeave.waitFor({ state: 'visible', timeout: 5000 });
      await this.YesButtonOfApplyLeave.click();
    } else {
      console.log('Yes button not visible, skipping click.');
    }
  }

  // 4. Select date range
  await this.dateRange();

  // 5. Enter reason for leave
  await this.ReasonOfLeaveBox.fill(reason);

  // 6. Submit form
  await this.SubmitButton.click();
  await this.page.waitForLoadState();
}

  // *****************

  async dateRange() {
  const currentDate = new Date();

  // Random offset for start date (0-5 days ahead of today)
  const startOffset = Math.floor(Math.random() * 5);  
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() + startOffset);

  // Random duration for leave (1–10 days)
  const duration = Math.floor(Math.random() * 10) + 1;  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  // Format as MM/DD/YYYY
  const formatDate = (d: Date) =>
    `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
      .getDate()
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;

  const startDateString = formatDate(startDate);
  const endDateString = formatDate(endDate);

  // Fill in the date range
  await this.DateRange.click();
  await this.DateRange.fill(startDateString);
  await this.DateRange.fill(endDateString);

  console.log(`Selected date range: ${startDateString} - ${endDateString}`);
}

  async getWithDrawLink() {
    await this.WithdrawLink.first().click();
  }
  async fillWithDrawReason(reason: string) {
    await this.WithdrawReasonField.fill(reason)
  }


  async isWithdrawVisible(): Promise<boolean> {
    return await this.WithdrawLink.isVisible();
  }



}


