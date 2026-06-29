import { expect, Locator, Page } from "@playwright/test";
import { ApiResponseCapture } from "../utils/ApiResponseCapture";
import { BasePage } from "./Basepage";

export interface WeeklyTimesheetData {
  weekStart: string;
  weekEnd: string;
  totalHours: number;
}

export interface PendingRequestData {
  type: string;
  id: number;
  description: string;
  status: string;
  fullName: string;
}

export interface MonthlyAttendanceData {
  month: string;
  year: number;
  workingDays: number;
  presentDays: number;
  percentage: number;
}

export interface AttendanceAnalyticsData {
  monthlyData: MonthlyAttendanceData[];
  weeklyWorkingDays: number;
}

export interface TodayPunchData {
  date: string;
  employeeId: number;
  inTime: string | null;
  outTime: string | null;
  workingHours: string | null;
  leaveType: string;
  activeWorkingHours: number;
  location: string | null;
}

export interface EmployeeProjectData {
  projectId: number;
  projectName: string;
  members?: EmployeeProjectMember[];
}

export interface EmployeeProjectMember {
  id: number;
  fullName: string;
}

export interface EmployeeProjectsData {
  projectMemberProjects: number;
  totalProjects: number;
  projects: EmployeeProjectData[];
}

export interface LeaveBalanceEntry {
  total: number;
  used: number;
  balance: number;
}

export interface LeaveBalanceData {
  wfh: LeaveBalanceEntry;
  cl: LeaveBalanceEntry;
  pl: LeaveBalanceEntry;
}

export class Dashboard extends BasePage {

  private readonly actionCentreList: Locator;
  private readonly actionCentreCards: Locator;
  private readonly attendanceAnalyticsCurrentMonthPercentage: Locator;
  private readonly officeInTime: Locator;
  private readonly officeOutTime: Locator;
  private readonly myProjectsList: Locator;
  private readonly myProjectItems: Locator;
  private readonly leaveBalanceGrid: Locator;
  private readonly timesheetSummaryCard: Locator;
  private readonly weeklyTimesheetWeekRange: Locator;
  private readonly weeklyTimesheetTotalHours: Locator;
  private readonly viewAttendanceWeeklyLogsLink: Locator;
  private readonly assetRequestHardwareLink: Locator;
  private readonly reimbursementsExpenseClaimsLink: Locator;
  private readonly submitTimesheetsLink: Locator;
  private readonly viewAllProjectsLink: Locator;
  private readonly raiseConcernLink: Locator;
  private readonly requestLeavePlanTimeOffLink: Locator;
  private readonly viewAllSessionsLink: Locator;
  private readonly viewFullTeamCalender: Locator;
  

  constructor(page: Page) {
    super(page);

    this.actionCentreList = page.locator(
      '[class*="action-center-card_actionsList"]'
    );
    this.actionCentreCards = this.actionCentreList.locator(
      '[class*="action-center-card_item"]'
    );

    this.attendanceAnalyticsCurrentMonthPercentage = page
      .locator('[class*="attendance-analytics-card_statItem"]')
      .filter({ hasText: "Current Month" })
      .locator("span.heading-xl.font-700");
    this.officeInTime = page.locator('[class*="attendance-card_officeIn__"]');
    this.officeOutTime = page.locator('[class*="attendance-card_officeOut__"]');
    this.myProjectsList = page.locator('[class*="my-projects_projectList"]');
    this.myProjectItems = this.myProjectsList.locator(
      'article[class*="my-projects_row"]'
    );
    this.leaveBalanceGrid = page.locator(
      '[class*="leave-balance-overview-card_grid"]'
    );

    this.timesheetSummaryCard = page.locator(
      '[class*="timesheet-summary-card_cardContainer"]'
    );
    this.weeklyTimesheetWeekRange =
      this.timesheetSummaryCard.getByText(/^Week of /);
    this.weeklyTimesheetTotalHours = this.timesheetSummaryCard.locator(
      '[class*="timesheet-summary-card_totalValue"]'
    );

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

    this.requestLeavePlanTimeOffLink = page.getByRole("link",{
       name: "Request Leave Plan time off",
    });

    this.viewAllSessionsLink = page.getByRole("button", {
      name: "View all sessions",
    });

    this.viewFullTeamCalender = page.getByRole("button", {
      name: "View Full Team Calendar",
    });
  }
  
  async waitForDashboardToLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.waitforLoaderToDisappear();
  }

  captureWeeklyTimesheetResponse(): Promise<WeeklyTimesheetData> {
    return ApiResponseCapture.capture<WeeklyTimesheetData>(
      this.page,
      "/dashboard/weekly-timesheet"
    );
  }

  capturePendingRequestsResponse(): Promise<PendingRequestData[]> {
    return ApiResponseCapture.capture<PendingRequestData[]>(
      this.page,
      "/dashboard/pending-requests"
    );
  }

  captureAttendanceAnalyticsResponse(): Promise<AttendanceAnalyticsData> {
    return ApiResponseCapture.capture<AttendanceAnalyticsData>(
      this.page,
      "/dashboard/attendance-analytics"
    );
  }

  captureTodayPunchResponse(): Promise<TodayPunchData[]> {
    return ApiResponseCapture.capture<TodayPunchData[]>(
      this.page,
      "/dashboard/today-punch"
    );
  }

  captureEmployeeProjectsResponse(): Promise<EmployeeProjectsData> {
    return ApiResponseCapture.capture<EmployeeProjectsData>(
      this.page,
      "/project/projects-by-employee/"
    );
  }

  captureLeaveBalanceResponse(): Promise<LeaveBalanceData> {
    return ApiResponseCapture.capture<LeaveBalanceData>(
      this.page,
      "/dashboard/leave-balance"
    );
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

  async clickViewAllSessions(): Promise<void> {
    await this.clickAndWait(this.viewAllSessionsLink);
  }

  async clickViewFullTeamCalendar(): Promise<void> {
    await this.clickAndWait(this.viewFullTeamCalender);
  }

  static formatWeekRangeForUi(weekStart: string, weekEnd: string): string {
    return `Week of ${Dashboard.formatApiDateForUi(weekStart)} - ${Dashboard.formatApiDateForUi(weekEnd)}`;
  }

  static formatTotalHoursForUi(totalHours: number): string {
    const displayValue =
      totalHours % 1 === 0 ? String(Math.trunc(totalHours)) : String(totalHours);
    return `${displayValue} hrs`;
  }

  static formatRequestTypeForUi(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }

  static formatLeaveBalanceValueForUi(value: number): string {
    return value % 1 === 0 ? String(Math.trunc(value)) : String(value);
  }

  static formatMemberCountForUi(memberCount: number): string {
    return `${memberCount} members`;
  }

  static getProjectMemberCount(project: EmployeeProjectData): number {
    return project.members?.length ?? 0;
  }

  static getCurrentMonthAttendance(
    analytics: AttendanceAnalyticsData
  ): MonthlyAttendanceData {
    const now = new Date();
    const currentMonth = now
      .toLocaleString("en-US", { month: "long" })
      .toUpperCase();
    const currentYear = now.getFullYear();

    const monthData = analytics.monthlyData.find(
      (entry) => entry.month === currentMonth && entry.year === currentYear
    );

    if (!monthData) {
      throw new Error(
        `No attendance analytics found for ${currentMonth} ${currentYear}`
      );
    }

    return monthData;
  }

  static formatPercentageForUi(percentage: number): string {
    const displayValue =
      percentage % 1 === 0
        ? String(Math.trunc(percentage))
        : percentage.toFixed(2).replace(/\.?0+$/, "");

    return `${displayValue}%`;
  }

  static getTodayPunchRecord(todayPunchData: TodayPunchData[]): TodayPunchData {
    const today = new Date();
    const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const todayPunch = todayPunchData.find((entry) => entry.date === todayDate);

    if (!todayPunch) {
      throw new Error(`No today-punch entry found for ${todayDate}`);
    }

    return todayPunch;
  }

  async verifyWeeklyTimesheetWeekRange(expectedWeekRange: string): Promise<void> {
    await expect(this.timesheetSummaryCard).toBeVisible();
    await expect(this.weeklyTimesheetWeekRange).toHaveText(expectedWeekRange);
  }

  async verifyWeeklyTimesheetTotalHours(expectedTotalHours: string): Promise<void> {
    await expect(this.timesheetSummaryCard).toBeVisible();
    await expect(this.weeklyTimesheetTotalHours).toHaveText(expectedTotalHours);
  }

  async verifyPendingRequestsMatchApi(
    pendingRequests: PendingRequestData[]
  ): Promise<void> {
    await expect(this.actionCentreList).toBeVisible();
    await expect(this.actionCentreCards).toHaveCount(pendingRequests.length);

    for (let index = 0; index < pendingRequests.length; index++) {
      const request = pendingRequests[index];
      const card = this.actionCentreCards.nth(index);

      await expect(card).toBeVisible();
      await expect(
        card.locator('[class*="action-center-card_name"]')
      ).toHaveText(request.fullName);
      await expect(card.locator("span[class*='badge']")).toHaveText(
        Dashboard.formatRequestTypeForUi(request.type)
      );
    }
  }

  async verifyAttendanceAnalyticsCurrentMonthPercentage(
    analytics: AttendanceAnalyticsData
  ) {
    const currentMonth = Dashboard.getCurrentMonthAttendance(analytics);

    await expect(this.attendanceAnalyticsCurrentMonthPercentage).toBeVisible();
    await expect(this.attendanceAnalyticsCurrentMonthPercentage).toHaveText(
      Dashboard.formatPercentageForUi(currentMonth.percentage)
    );
  }

  async verifyTodayPunchOfficeInOut(todayPunchData: TodayPunchData[]) {
    const todayPunch = Dashboard.getTodayPunchRecord(todayPunchData);
    const expectedOfficeIn = todayPunch.inTime ?? "--:--";
    const expectedOfficeOut = todayPunch.outTime ?? "--:--";

    await expect(this.officeInTime).toBeVisible();
    await expect(this.officeOutTime).toBeVisible();
    await expect(this.officeInTime).toHaveText(expectedOfficeIn);
    await expect(this.officeOutTime).toHaveText(expectedOfficeOut);
  }

  async verifyEmployeeProjectsMatchApi(
    projectsData: EmployeeProjectsData,
    projectCount = 4
  ): Promise<void> {
    const projectsToVerify = projectsData.projects.slice(0, projectCount);
    const firstProject = projectsData.projects[0];

    await expect(this.myProjectsList).toBeVisible();
    await expect(this.myProjectItems).toHaveCount(projectsData.totalProjects);

    const firstProjectItem = this.myProjectItems.first();
    await expect(
      firstProjectItem.locator('[class*="my-projects_metaItem"]')
    ).toHaveText(
      Dashboard.formatMemberCountForUi(
        Dashboard.getProjectMemberCount(firstProject)
      )
    );

    for (let index = 0; index < projectsToVerify.length; index++) {
      const project = projectsToVerify[index];
      const projectItem = this.myProjectItems.nth(index);

      await expect(projectItem).toBeVisible();
      await expect(projectItem).toHaveAttribute(
        "aria-label",
        project.projectName
      );
    }
  }

  async verifyLeaveBalanceMatchApi(
    leaveBalance: LeaveBalanceData
  ): Promise<void> {
    const leaveTypes = [
      leaveBalance.pl,
      leaveBalance.cl,
      leaveBalance.wfh,
    ];

    await expect(this.leaveBalanceGrid).toBeVisible();

    const tiles = this.leaveBalanceGrid.locator(
      'article[class*="leave-balance-overview-card_tile"]'
    );

    for (let index = 0; index < leaveTypes.length; index++) {
      const entry = leaveTypes[index];
      const tile = tiles.nth(index);

      await expect(tile).toBeVisible();

      const stats = tile.locator(
        '[class*="leave-balance-overview-card_statsRow"] p'
      );

      await expect(
        tile.locator('[class*="leave-balance-overview-card_daysValue"]')
      ).toHaveText(Dashboard.formatLeaveBalanceValueForUi(entry.balance));
      await expect(stats.nth(0)).toHaveText(
        `Used: ${Dashboard.formatLeaveBalanceValueForUi(entry.used)}`
      );
      await expect(stats.nth(1)).toHaveText(
        `Total: ${Dashboard.formatLeaveBalanceValueForUi(entry.total)}`
      );
    }
  }

  private static formatApiDateForUi(isoDate: string): string {
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const shortMonth = date.toLocaleString("en-US", { month: "short" });

    return `${shortMonth} ${date.getDate()}`;
  }
}