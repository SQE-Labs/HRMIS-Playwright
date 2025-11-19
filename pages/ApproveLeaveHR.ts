import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/Basepage';
import { expect, Locator, Page } from '@playwright/test';

export class ApproveLeaveHR extends BasePage {

    private viewLeaveLink: Locator;
    private ApproveLeavePopupTitle: Locator = this.page.getByText('Approve Leave Action');
     private reasonTextarea: Locator = this.page.locator('//label[text()="Reason"]/following::textarea');
    private submitButton: Locator = this.page.getByRole('button', { name: 'Submit' });
    private approveSuccessMessage: Locator = this.page.getByText('Successfully updated.');
    private leaveActionField: Locator =this.page.locator("#leaveAction");

  public paginationContainer: Locator = this.page.locator('.pagination');
  public activePage: Locator = this.page.locator('.pagination .active');
  public nextBtn: Locator = this.page.locator('.pagination .next:not(.disabled)');
  public prevBtn: Locator = this.page.locator('.pagination .previous:not(.disabled)');




    
     constructor(page: Page) {
    super(page);

    this.viewLeaveLink = page.locator("(//a[text()='View'])[1]");
    
     }

 async clickViewLeaveLink() {
  //  Now click the first "View" link
  await this.viewLeaveLink.click();
}
async selectLeaveAction(type: string) {
    await this.leaveActionField.selectOption(type);
    this.waitForSpinnerLoaderToDisappear;
}

async appoveLeaveActionHR(
    action: string,
    reason: string,
    successMessage: string
  ) {
    // Click on view button of the first row
    await this.clickViewLeaveLink();
    await this.ApproveLeavePopupTitle.waitFor({ state: "visible" });

    // Verify popup is visible
    expect(await this.ApproveLeavePopupTitle.isVisible()).toBeTruthy();

    // Select leave action (Approve/Reject/etc.)
    await this.selectLeaveAction(action);

    // Enter reason
    await this.reasonTextarea.fill(reason);

    // Click on submit
    await this.submitButton.click();
    await this.waitforLoaderToDisappear();

    // Verify success message
    expect(await this.approveSuccessMessage.textContent()).toBe(successMessage);
  }


  // Actions
  async clickNext() {
    await this.nextBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickPrevious() {
    await this.prevBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getActivePageNumber(): Promise<number> {
    return Number(await this.activePage.innerText());
  }
}






