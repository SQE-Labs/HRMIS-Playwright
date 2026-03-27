import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/Basepage";
import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";

export class ApplyLeaves extends BasePage {
  private ApplyLeaveButton: Locator;
  public ApplyLeavePopupTitle: Locator;
  private SubmitButton: Locator;
  public  LeaveTypeTextBox: Locator;
  public  DateRange: Locator;
  public ReasonOfLeaveBox: Locator;
  public SuccessMessage: Locator;
  private WithdrawLink: Locator;
  public WithdrawPopupTitle: Locator;
  public  WithdrawReasonField: Locator;
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
  public cancelBtn: Locator;
  public applyCrossIcon: Locator;
  public withDrawCancelBtn: Locator;
  public reasonLengthValdiation: Locator

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
    this.WithdrawLink = this.page.locator("table").locator("a", { hasText: "Withdraw" });
    this.WithdrawPopupTitle = page.getByText("Withdraw Leave Request");
    this.WithdrawReasonField = page.getByRole("textbox");
    this.WithdrawSuccessMessage = page.getByText("Leave Withdrawn Successfully");
    this.YesButtonOfApplyLeave = page.locator("//div[contains(@class,'modal-full-height')]/div//button[text()='Yes']");
    this.privilegeLeaveOption = page.getByLabel("PrivilegeLeave");
    this.duplicateLeaveToastMessage = page.locator("//div[text()='Duplicate leave request !']");
    this.toastCloseButton = page.locator('button.Toastify__close-button[aria-label="close"]');
    this.closeIconButton = page.locator('button.react-datepicker__close-icon[aria-label="Close"]');
    this.allWithdrawLink = this.page.locator("//tr//a[text()='Withdraw']");
    this.closeButton = this.page.locator("button.close");
    this.fromDate = page.locator("//table[@class='resume custom']//tr/td[2]");
    this.ToDate = page.locator("//table[@class='resume custom']//tr/td[3]");
    this.cancelBtn = page.locator("(//button[contains(text(), 'Cancel')])[1]");
    this.applyCrossIcon = page.locator("//h5[text()='Apply Leave']/../button");
    this.withDrawCancelBtn = page.locator("(//button[contains(text(), 'Cancel')])[2]");
    this.reasonLengthValdiation = page.getByText('Reason must be at least 3 characters long.')

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
    const label =
      type.includes(" ") ? type : type.replace(/([a-z])([A-Z])/g, "$1 $2");
    await this.LeaveTypeTextBox.selectOption({ label });
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
    await this.page
      .getByRole("dialog", { name: "Apply Leave" })
      .waitFor({ state: "visible", timeout: 10000 });
    await this.LeaveTypeTextBox.waitFor({ state: "visible", timeout: 10000 });
    await this.selectLeaveType(leaveType);

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

      const toastVisible = await this.page
        .locator(".Toastify__toast-body")
        .last()
        .waitFor({ state: "visible", timeout: 3000 })
        .then(() => true)
        .catch(() => false);
      const toastText = toastVisible
        ? (await this.page.locator(".Toastify__toast-body").last().textContent())?.trim()
        : "";

      if (successAppeared || toastText?.includes("Leave Applied Successfully")) {
        if (successAppeared) {
          await this.SuccessMessage.waitFor({ state: "hidden", timeout: 10000 });
        }
        console.log(" Leave applied successfully!");
        // Close the apply leave dialog so it doesn't block logout/navigation
        if (await this.cancelBtn.isVisible().catch(() => false)) {
          await this.cancelBtn.click();
        } else if (await this.applyCrossIcon.isVisible().catch(() => false)) {
          await this.applyCrossIcon.click();
        }
        break;
      }

      if (
        duplicateAppeared ||
        toastText?.includes("Duplicate leave request") ||
        toastText?.toLowerCase().includes("already")
      ) {
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

      const reasonRowVisible = await this.page
        .locator(`//table//td[contains(normalize-space(), '${reason}')]`)
        .first()
        .isVisible()
        .catch(() => false);
      if (reasonRowVisible) {
        console.log(" Leave appears in the list; treating as success.");
        // Same as above: close the dialog if it's still open
        if (await this.cancelBtn.isVisible().catch(() => false)) {
          await this.cancelBtn.click();
        } else if (await this.applyCrossIcon.isVisible().catch(() => false)) {
          await this.applyCrossIcon.click();
        }
        break;
      }

      if (attempt === maxRetries) {
        throw new Error(
          `Neither success nor duplicate message detected. Last toast: "${toastText || "none"}".`
        );
      }
      // Retry with a new date range
      await this.clearDateRange();
    }
  }
  async getWithDrawLink() {
    const link = this.WithdrawLink.first();
    await link.waitFor({ state: "visible", timeout: 10000 });
    await link.scrollIntoViewIfNeeded();
    await link.click({ force: true });
  }

  async waitForWithdrawSuccessMessage(): Promise<string> {
    const toast = this.page.locator(".Toastify__toast-body").filter({ hasText: /Leave Withdrawn Successfully/i });
    const alert = this.page.getByRole("alert").filter({ hasText: /Leave Withdrawn Successfully/i });
    await Promise.race([
      toast.first().waitFor({ state: "visible", timeout: 12000 }),
      alert.first().waitFor({ state: "visible", timeout: 12000 })
    ]);
    const message = (await toast.first().textContent()) || (await alert.first().textContent()) || "";
    return message.trim();
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
        `.react-datepicker__month .react-datepicker__day--0${String(day).padStart(2, "0")}`
      );

    const today = new Date();
    const currentDay = today.getDate();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    let startDay: number;
    let endDay: number;

    if (attempt === 1) {
      // ✅ Pick a random start day between today+1 and end of month-5
      startDay = currentDay + Math.floor(Math.random() * Math.max(1, daysInMonth - currentDay - 5)) + 1;
      endDay = startDay + 4; // fixed 4-day duration
    } else {
      // Move to next month for retries
      const nextArrow = this.page.locator(".react-datepicker__navigation--next");
      if ((await nextArrow.isVisible()) && (await nextArrow.isEnabled())) {
        await nextArrow.click();
        await this.page.waitForTimeout(500);
      }

      // ✅ Random start day in next month (future month)
      startDay = Math.floor(Math.random() * 26) + 1;
      endDay = startDay + 4;
    }

    // Adjust for month overflow
    if (endDay > daysInMonth) endDay = daysInMonth;

    await getDayLocator(startDay).first().click();
    await getDayLocator(endDay).last().click();

    console.log(
      `Picked ${attempt === 1 ? "random" : "retry"} range: ${startDay} → ${endDay}`
    );
  }

}
