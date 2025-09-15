import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { Locator, Page } from '@playwright/test';

export class ApplyLeaves extends BasePage{
    verifyPopupVisible() {
        throw new Error('Method not implemented.');
    }

    private ApplyLeaveButton : Locator;
    public  ApplyLeavePopupTitle : Locator;
    private SubmitButton : Locator;
    private LeaveTypeTextBox :Locator;
    private DateRange : Locator;
    private ReasonOfLeaveBox : Locator;

   constructor(page: Page) {
           super(page);

    this.ApplyLeaveButton = page.getByRole('button', { name: 'Apply Leave' })
    this.ApplyLeavePopupTitle = page.getByTitle('Apply Leave')
    this.SubmitButton =  page.getByRole('button', { name: 'Submit' })
    this.LeaveTypeTextBox = page.getByLabel('Type of leave');
    this.DateRange = page.getByRole('textbox', { name: 'mm/dd/yyyy - mm/dd/yyyy' })
    this.ReasonOfLeaveBox=  page.getByRole('textbox', { name: 'Reason of Leave *' })    
}
async getApplyLeaveBtn(){
    this.ApplyLeaveButton.click()  
}

async getSubmitButton(){
    this.SubmitButton.click()
}
async selectLeaveType(type: string) {
  await this.LeaveTypeTextBox.selectOption(type);
}

async selectDateRange(startDate: string, endDate: string) {
  const range = `${startDate} - ${endDate}`;
  await this.DateRange.fill(range);
}
// await applyLeave.selectDateRange("09/15/2025", "09/20/2025");

async enterReasonOfLeave(reason: string) {
  await this.ReasonOfLeaveBox.fill(reason);
}

// Apply for Leave
async applyLeave(leaveType: string, startDate: string, endDate: string, reason: string) {
  // 1. Open Apply Leave Popup
  await this.ApplyLeaveButton.click();

  // 2. Select leave type (dynamic)
  await this.LeaveTypeTextBox.selectOption(leaveType);

  // 3. Select date range
  const range = `${startDate} - ${endDate}`;
  await this.DateRange.fill(range);

  // 4. Enter reason for leave
  await this.ReasonOfLeaveBox.fill(reason);

  // 5. Submit form
  await this.SubmitButton.click();
}



}