import { Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";

export class Dashboard extends BasePage {

  private readonly viewAttendanceWeeklyLogsLink: Locator;
  private readonly assetRequestHardwareLink: Locator;
  private readonly reimbursementsExpenseClaimsLink: Locator;
  private readonly submitTimesheetsLink: Locator;
  private readonly viewAllProjectsLink: Locator;
  private readonly raiseConcernLink: Locator;
  private readonly requestLeavePlanTimeOffLink: Locator;

  constructor(page: Page) {
    super(page);

    this.viewAttendanceWeeklyLogsLink = page.getByRole("link", {
      name: "View Attendance Weekly logs",
    });

    this.assetRequestHardwareLink = page.getByRole("link", {
      name: /Asset Request Hardware/i,
    });

    this.reimbursementsExpenseClaimsLink = page.getByRole("link", {
      name: "Reimbursements Expense claims",
    });

    this.submitTimesheetsLink = page.getByRole("link", {
      name: "Submit Timesheets",
    });

    this.viewAllProjectsLink = page.getByRole("link", {
      name: "View all projects",
    });

    this.raiseConcernLink = page.getByRole("link", {
      name: "Raise Concern",
    });

    this.requestLeavePlanTimeOffLink = page.getByRole("link", {
      name: "Request Leave Plan time off",
    });
  }

  async waitForDashboardToLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.waitforLoaderToDisappear();
  }

  /**
   * Wait for locator visibility, click, and wait for loader to disappear
   * @param locator - The element to click
   */
  private async clickAndWait(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" });
    await locator.click();
    await this.waitforLoaderToDisappear();
  }

  async clickViewAttendanceWeeklyLogs(): Promise<void> {
    await this.clickAndWait(this.viewAttendanceWeeklyLogsLink);
  }

  async clickAssetRequestHardware(): Promise<void> {
    await this.clickAndWait(this.assetRequestHardwareLink);
  }

  async clickReimbursementsExpenseClaims(): Promise<void> {
    await this.clickAndWait(this.reimbursementsExpenseClaimsLink);
  }

  async clickSubmitTimesheets(): Promise<void> {
    await this.clickAndWait(this.submitTimesheetsLink);
  }

  async clickViewAllProjects(): Promise<void> {
    await this.clickAndWait(this.viewAllProjectsLink);
  }

  async clickRaiseConcern(): Promise<void> {
    await this.clickAndWait(this.raiseConcernLink);
  }

  async clickRequestLeavePlanTimeOff(): Promise<void> {
    await this.clickAndWait(this.requestLeavePlanTimeOffLink);
  }
}