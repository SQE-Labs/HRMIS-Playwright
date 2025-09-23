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
      } else {
        console.log("Yes button not visible, skipping click.");
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
      console.log(
        `Found ${withdrawLinksCount} existing leave(s). Withdrawing the first one...`
      );

      // Click the first withdraw link
      await this.allWithdrawLink.first().click();

      // Fill the withdrawal reason
      await this.fillWithDrawReason(withdrawReason);

      // Submit the withdrawal
      await this.SubmitButton.click();

      // Wait for page to update
      await this.page.waitForTimeout(1000);

      // Recalculate the number of remaining withdraw links
      withdrawLinksCount = await this.allWithdrawLink.count();
    }

    console.log("No more existing leaves to withdraw.");
  }
async dateRange(maxRetries: number = 5) {
  let lastStartDay: number | null = null;
  let lastEndDay: number | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // 1. Open date picker
    await this.DateRange.click();

    // If not the first attempt → move to next month for fresh dates
    if (attempt > 0) {
      await this.page.locator(".react-datepicker__navigation--next").click();
    }

    // 2. Select start day
    let startDay: number;
    if (lastStartDay === null) {
      // first time → pick random 1–20
      startDay = Math.floor(Math.random() * 20) + 1;
    } else {
      // next attempt → shift forward by 1 day
      startDay = lastStartDay + 1;
    }

    // 3. Select end day (always after start)
    let endDay: number;
    if (lastEndDay === null) {
      endDay = startDay + Math.floor(Math.random() * 5) + 1;
    } else {
      endDay = startDay + 1; // ensure unique and sequential
    }

    // Save for next iteration
    lastStartDay = startDay;
    lastEndDay = endDay;

    // 4. Click start & end days
    await this.page
      .locator(`.react-datepicker__day--0${startDay.toString().padStart(2, "0")}`)
      .first()
      .click();

    await this.page
      .locator(`.react-datepicker__day--0${endDay.toString().padStart(2, "0")}`)
      .last()
      .click();

    console.log(`Attempt ${attempt + 1}: Selected ${startDay} → ${endDay}`);

    // 5. Wait for UI
    await this.page.waitForTimeout(1000);

    // 6. Check duplicate toast
    const isDuplicate = await this.duplicateLeaveToastMessage
      .waitFor({ state: "visible", timeout: 3000 })
      .then(() => true)
      .catch(() => false);

    if (!isDuplicate) {
      console.log("✅ Unique date range selected");
      return;
    }

    console.warn("⚠️ Duplicate date found. Retrying with sequential next date...");
  }

  // 7. All retries failed
  throw new Error("Could not find a unique date range after retries.");
}


}
