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
  private toastCloseButton: Locator;
  private closeIconButton: Locator; // Locator for datepicker clear cross button
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
    this.ReasonOfLeaveBox = page.getByRole("textbox", { name: "Reason of Leave *", });
    this.SuccessMessage = page.getByText("Leave Applied Successfully! Wait for Approval.");
    this.WithdrawLink = this.page.getByText("Withdraw");
    this.WithdrawPopupTitle = page.getByText("Withdraw Leave Request");
    this.WithdrawReasonField = page.getByRole("textbox");
    this.WithdrawSuccessMessage = page.getByText(
      "Leave Withdrawn Successfully"
    );
    this.YesButtonOfApplyLeave = page.locator(
      "//div[contains(@class,'modal-full-height')]/div//button[text()='Yes']"
    );
    this.privilegeLeaveOption = page.getByLabel("PrivilegeLeave");
    this.duplicateLeaveToastMessage = page.locator(
      "//div[text()='Duplicate leave request !']"
    );
    this.toastCloseButton = page.locator(
      'button.Toastify__close-button[aria-label="close"]'
    );
    this.closeIconButton = page.locator(
      'button.react-datepicker__close-icon[aria-label="Close"]'
    );
    this.allWithdrawLink = this.page.locator("//tr//a[text()='Withdraw']");
    this.closeButton = this.page.locator("button.close");
    this.fromDate = page.locator("//table[@class='resume custom']//tr/td[2]");
    this.ToDate = page.locator("//table[@class='resume custom']//tr/td[3]");
  }

  async pickCurrentDate() {
    const currentDate = new Date();
    return `${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${currentDate.getFullYear()}`;
  }

  async getApplyLeaveBtn() {
    await this.ApplyLeaveButton.click();
  }

  async getSubmitButton() {
    await this.SubmitButton.click();
  }

  async selectLeaveType(type: string) {
    await this.LeaveTypeTextBox.selectOption(type);
  }

  async enterReasonOfLeave(reason: string) {
    await this.ReasonOfLeaveBox.fill(reason);
  }

  // Clear existing date range by clicking the cross button and reopening the date picker
  async clearDateRange() {
    try {
      await this.closeIconButton.waitFor({ state: "visible", timeout: 5000 });
      await this.closeIconButton.click({ force: true });
      await this.DateRange.waitFor({ state: "visible", timeout: 3000 });
      await this.DateRange.click();
    } catch (error) {
      await this.page.evaluate(() => {
        const btn = document.querySelector(
          'button.react-datepicker__close-icon[aria-label="Close"]'
        ) as HTMLElement | null;
        if (btn) btn.click();
      });
      await this.DateRange.click();
    }
  }

  // Apply leave with retry, waiting for duplicate toast to disappear automatically
  async applyLeave(leaveType: string, reason: string, maxRetries: number = 3) {
    const privilegeCount = await this.privilegeLeaveOption.count();

    await this.ApplyLeaveButton.click();
    await this.LeaveTypeTextBox.selectOption(leaveType);

    if (
      privilegeCount === 0 &&
      (await this.YesButtonOfApplyLeave.isVisible({ timeout: 3000 }).catch(
        () => false
      ))
    ) {
      await this.YesButtonOfApplyLeave.click();
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      await this.selectDateRange(attempt);
      await this.ReasonOfLeaveBox.fill(reason);
      await this.SubmitButton.click();
      await this.page.waitForLoadState("networkidle");

      // Wait for either success or duplicate toast to appear
      const successAppeared = await this.SuccessMessage.waitFor({
        state: "visible",
        timeout: 5000,
      })
        .then(() => true)
        .catch(() => false);
      const duplicateAppeared = await this.duplicateLeaveToastMessage
        .waitFor({ state: "visible", timeout: 5000 })
        .then(() => true)
        .catch(() => false);

      if (successAppeared) {
        // Wait for success toast to disappear before exiting
        await this.SuccessMessage.waitFor({ state: "hidden", timeout: 10000 });
        console.log(" Leave applied successfully!");
        break;
      }

      if (duplicateAppeared) {
        console.log(
          ` Attempt ${attempt}: Duplicate leave found, waiting for toast to disappear and retrying...`
        );
        await this.duplicateLeaveToastMessage.waitFor({
          state: "hidden",
          timeout: 10000,
        });
        await this.clearDateRange();
        continue;
      }

      throw new Error(
        "Neither success nor duplicate message detected, unknown UI state."
      );
    }
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
      console.debug(
        `Found ${withdrawLinksCount} existing leave(s). Withdrawing the first one...`
      );

      await this.allWithdrawLink.first().click();

      await this.fillWithDrawReason(withdrawReason);

      await this.SubmitButton.click();

      withdrawLinksCount = await this.allWithdrawLink.count();
    }

    console.debug("No more existing leaves to withdraw.");
  }

  async selectDateRange(attempt: number = 1): Promise<void> {
    await this.DateRange.click();

    const getDayLocator = (day: number) =>
      this.page.locator(
        `.react-datepicker__month .react-datepicker__day--0${String(
          day
        ).padStart(2, "0")}`
      );

    let startDay: number;
    let endDay: number;

    if (attempt === 1) {
      // Pick a random start day between 1 and 26 (30 - 4)
      startDay = Math.floor(Math.random() * 26) + 1;
      endDay = startDay + 4; // fixed 4 days duration
    } else {
      // Move to next month for retries
      const nextArrow = this.page.locator(
        ".react-datepicker__navigation--next"
      );
      if ((await nextArrow.isVisible()) && (await nextArrow.isEnabled())) {
        await nextArrow.click();
        await this.page.waitForTimeout(500);
      }
      // Pick a random start day in next month
      startDay = Math.floor(Math.random() * 26) + 1;
      endDay = startDay + 4;
    }

    await getDayLocator(startDay).first().click();
    await getDayLocator(endDay).last().click();

    console.log(
      `Picked ${attempt === 1 ? "random" : "retry"
      } range: ${startDay} → ${endDay}`
    );
  }
}
