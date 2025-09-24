import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";

export class ApplyLeaves extends BasePage {
  private ApplyLeaveButton: Locator;
  public ApplyLeavePopupTitle: Locator;
  private SubmitButton: Locator;
  private LeaveTypeTextBox: Locator;
  private DateRange: Locator;
  private ReasonOfLeaveBox: Locator;
  public SuccessMessage: Locator;
  private WithdrawLink: Locator;
  public WithdrawPopupTitle: Locator;
  private WithdrawReasonField: Locator;
  public WithdrawSuccessMessage: Locator;
  private YesButtonOfApplyLeave: Locator;
  private privilegeLeaveOption: Locator;
  private duplicateLeaveToastMessage: Locator;
  public allWithdrawLink: Locator;
  private closeButton: Locator;
  private fromDate: Locator;
  private ToDate: Locator;
  leaveCounter = 0;

  constructor(page: Page) {
    super(page);

    this.ApplyLeaveButton = page.locator("//a[text()='Apply Leave']");
    this.ApplyLeavePopupTitle = page.locator("//a[text()='Apply Leave']");
    this.SubmitButton = page.getByRole("button", { name: "Submit" });
    this.LeaveTypeTextBox = page.getByLabel("Type of leave");
    this.DateRange = page.getByPlaceholder("mm/dd/yyyy - mm/dd/yyyy");
    this.ReasonOfLeaveBox = page.getByRole("textbox", {
      name: "Reason of Leave *",
    });
    this.SuccessMessage = page.getByText(
      "Leave Applied Successfully! Wait for Approval."
    );
    this.WithdrawLink = this.page.getByText("Withdraw");
    this.WithdrawPopupTitle = page.getByText("Withdraw Leave Request");
    this.WithdrawReasonField = page.getByRole("textbox");
    this.WithdrawSuccessMessage = page.getByText(
      "Leave Withdrawn Successfully"
    );
    this.YesButtonOfApplyLeave = page.locator(
      "//div[contains(@class,'modal-full-height')]/div//button[text()='Yes'] "
    );
    this.privilegeLeaveOption = page.getByLabel("PrivilegeLeave");
    this.duplicateLeaveToastMessage = page.getByText(
      "Duplicate leave request !"
    );
    this.allWithdrawLink = this.page.locator("//tr//a[text()='Withdraw']");
    this.closeButton = this.page.locator("button.close");
    this.fromDate = page.locator("//table[@class='resume custom']//tr/td[2]");
    this.ToDate = page.locator("//table[@class='resume custom']//tr/td[3]");
  }

  async pickCurrentDate() {
    const currentDate = new Date();
    const todayDate = `${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${currentDate.getFullYear()}`;
    return todayDate;
  }

  async getApplyLeaveBtn() {
    this.ApplyLeaveButton.click();
  }

  async getSubmitButton() {
    this.SubmitButton.click();
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
        await this.YesButtonOfApplyLeave.waitFor({
          state: "visible",
          timeout: 5000,
        });
        await this.YesButtonOfApplyLeave.click();
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

  async getWithDrawLink() {
    await this.WithdrawLink.first().click();
  }
  async fillWithDrawReason(reason: string) {
    await this.WithdrawReasonField.fill(reason);
  }

  async isWithdrawVisible(): Promise<boolean> {
    return await this.WithdrawLink.isVisible();
  }

  async withdrawExistingLeave(withdrawReason: string = "Updating leave") {
    let withdrawLinksCount = await this.allWithdrawLink.count();

    while (withdrawLinksCount > 0) {
      console.debug(`Found ${withdrawLinksCount} existing leave(s). Withdrawing the first one...`);

      // Click the first withdraw link
      await this.allWithdrawLink.first().click();

      // Fill the withdrawal reason
      await this.fillWithDrawReason(withdrawReason);

      // Submit the withdrawal
      await this.SubmitButton.click();

      // Recalculate the number of remaining withdraw links
      withdrawLinksCount = await this.allWithdrawLink.count();
      
    }

    console.debug("No more existing leaves to withdraw.");
  }

  async dateRange(attempt: number = 3) {
      console.log(`--- Attempt ${attempt + 1} ---`);
      await this.DateRange.click();
      // Move to next month if retrying
      while(attempt > 0) {
        const nextArrow = this.page.locator(".react-datepicker__navigation--next");
        //await  nextArrow.isVisible() && await nextArrow.isEnabled())
          // await nextArrow.click();
        
        // Pick random start and end days in month
        // if (attempt == 3) 
        //   const startDay = "09/20/2025"
        //   const endDay = "09/24/2025";
        
      
          const startDay = Math.floor(Math.random() * 28) + 1;
          const endDay = startDay + Math.floor(Math.random() * (29 - startDay)); // Avoid SAME day
        

      // Click start and end day in picker
      const startLocator = this.page.locator(
        `.react-datepicker__month .react-datepicker__day--0${String(startDay).padStart(2, "0")}`
      );
      await startLocator.first().click();

      const endLocator = this.page.locator(
        `.react-datepicker__month .react-datepicker__day--0${String(endDay).padStart(2, "0")}`
      );
      await endLocator.last().click();

      console.log(`Picked range: ${startDay} → ${endDay}`);

      // Duplicate error message check
      const duplicateFound = await this.duplicateLeaveToastMessage
        .waitFor({ state: "visible", timeout: 5000 })
        .then(() => true)
        .catch(() => false);

      if (!duplicateFound) {
        //
        console.log("Date range accepted.");
        break;
      }
        attempt--;
        console.log("Duplicate date range found, retrying...");
    }
  }}