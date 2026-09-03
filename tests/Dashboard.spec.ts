import { expect, Page, test } from "@playwright/test";
import { Dashboard, AttendanceAnalyticsData, EmployeeProjectsData, LeaveBalanceData, PendingRequestData, TodayPunchData, WeeklyTimesheetData } from "../pages/Dashboard";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";

let dashboard: Dashboard;
let weeklyTimesheetApiData: WeeklyTimesheetData | undefined;
let pendingRequestsApiData: PendingRequestData[] | undefined;
let attendanceAnalyticsApiData: AttendanceAnalyticsData | undefined;
let todayPunchApiData: TodayPunchData[] | undefined;
let employeeProjectsApiData: EmployeeProjectsData | undefined;
let leaveBalanceApiData: LeaveBalanceData | undefined;

async function verifyNavigation(
  page: Page,
  clickAction: () => Promise<void>
): Promise<void> {
  
  const initialUrl = page.url();
  await clickAction();

  const finalUrl = page.url();
  expect(finalUrl).not.toBe(initialUrl);
}

test.describe("Dashboard Tests", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
<<<<<<< HEAD
=======
    await loginPage.loginAsRole();

>>>>>>> d74c6a6 (Migrate remaining test suites to role login)
    dashboard = new Dashboard(page);
    const isWeeklyTimesheetTest = testInfo.title.includes("HRIMS_DASH_15");
    const isPendingRequestsTest = testInfo.title.includes("HRIMS_DASH_16");
    const isAttendanceAnalyticsTest = testInfo.title.includes("HRIMS_DASH_17");
    const isTodayPunchTest = testInfo.title.includes("HRIMS_DASH_18");
    const isEmployeeProjectsTest = testInfo.title.includes("HRIMS_DASH_19");
    const isLeaveBalanceTest = testInfo.title.includes("HRIMS_DASH_20");

    const weeklyTimesheetPromise = isWeeklyTimesheetTest
      ? dashboard.captureWeeklyTimesheetResponse()
      : undefined;
    const pendingRequestsPromise = isPendingRequestsTest
      ? dashboard.capturePendingRequestsResponse()
      : undefined;
    const attendanceAnalyticsPromise = isAttendanceAnalyticsTest
      ? dashboard.captureAttendanceAnalyticsResponse()
      : undefined;
    const todayPunchPromise = isTodayPunchTest
      ? dashboard.captureTodayPunchResponse()
      : undefined;
    const employeeProjectsPromise = isEmployeeProjectsTest
      ? dashboard.captureEmployeeProjectsResponse()
      : undefined;
    const leaveBalancePromise = isLeaveBalanceTest
      ? dashboard.captureLeaveBalanceResponse()
      : undefined;

    await loginPage.loginAsRole();

    if (
      isWeeklyTimesheetTest ||
      isPendingRequestsTest ||
      isAttendanceAnalyticsTest ||
      isTodayPunchTest ||
      isEmployeeProjectsTest ||
      isLeaveBalanceTest
    ) {
      await dashboard.waitForDashboardToLoad();
    }

    if (weeklyTimesheetPromise) {
      weeklyTimesheetApiData = await weeklyTimesheetPromise;
    }

    if (pendingRequestsPromise) {
      pendingRequestsApiData = await pendingRequestsPromise;
    }

    if (attendanceAnalyticsPromise) {
      attendanceAnalyticsApiData = await attendanceAnalyticsPromise;
    }

    if (todayPunchPromise) {
      todayPunchApiData = await todayPunchPromise;
    }

    if (employeeProjectsPromise) {
      employeeProjectsApiData = await employeeProjectsPromise;
    }

    if (leaveBalancePromise) {
      leaveBalanceApiData = await leaveBalancePromise;
    }
  });

  test("HRIMS_DASH_1, HRIMS_DASH_2, HRIMS_DASH_3, HRIMS_DASH_4, HRIMS_DASH_5, verifying view calender and redirection if view attendence  @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });
    await expect(
    page.locator('h2.heading-lg')).toContainText(/Vishal Dev Thakur/);

    await test.step("Open Attendance Weekly Logs", async () => {
      await dashboard.clickViewAttendanceWeeklyLogs();
      await expect(page.locator('h2.heading-lg')).toHaveText('Work Calender');
    });
  });

  test("HRIMS_DASH_7 @smoke, Verifying asset request hardware functionality", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Asset Request Hardware", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickAssetRequestHardware()
      );
      await expect(page.getByRole('heading', { name: 'Asset Requests', level: 1 })).toBeVisible();
    });
  });

  test("HRIMS_DASH_8 verifying reimbursement functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Reimbursements Expense Claims", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickReimbursementsExpenseClaims()
      );
      await expect(page.locator('h2.heading-lg')).toHaveText('Reimbursements');
    });
  });

  test("HRIMS_DASH_9 verifying raise concern functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Raise Concern", async () => {
      await verifyNavigation(page, () => dashboard.clickRaiseConcern());
      await expect(page.locator('h2.heading-lg')).toHaveText('Attendance Corrections');
    });
  });

  test("HRIMS_DASH_6 verifying request leave functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Request Leave", async () => {
      await verifyNavigation(page, () =>
        dashboard.clickRequestLeavePlanTimeOff()
      );
      await expect(page.locator('h2.heading-lg')).toHaveText('Leave Requests');
    });
  });

  test("HRIMS_DASH_10 verifying submit timesheets functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open Submit Timesheets", async () => {
      await verifyNavigation(page, () => dashboard.clickSubmitTimesheets());
      await expect(page.locator('h2.heading-lg')).toHaveText('My Timesheets');
    });
  });

  test("HRIMS_DASH_11, HRIMS_DASH_12 verifying view all projects functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open View All Projects", async () => {
      await verifyNavigation(page, () => dashboard.clickViewAllProjects());
      await expect(page.locator('h2.heading-lg')).toHaveText('Projects');
    });
  });

  test("HRIMS_DASH_13 verifying view all sessions functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open View All Sessions", async () => {
      await verifyNavigation(page, () => dashboard.clickViewAllSessions());
      await expect(page.locator('h2.heading-lg')).toHaveText('Events');
    });
  });

  test("HRIMS_DASH_14 verifying view full team calendar functionality @smoke", async ({
    page,
  }) => {
    await test.step("Navigate to Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
    });

    await test.step("Open View Full Team Calendar", async () => {
      await verifyNavigation(page, () => dashboard.clickViewFullTeamCalendar());
      await expect(page.locator('h1.heading-lg', {hasText: 'Team Availability'})).toBeVisible();
    });
  });

  test("HRIMS_DASH_15 verifying weekly timesheet API data matches Dashboard UI @smoke", async () => {
    const weeklyTimesheet = weeklyTimesheetApiData!;

    await test.step("Verify Dashboard UI matches API response", async () => {
      await dashboard.verifyWeeklyTimesheetWeekRange(
        Dashboard.formatWeekRangeForUi(
          weeklyTimesheet.weekStart,
          weeklyTimesheet.weekEnd,
        )
      );
      await dashboard.verifyWeeklyTimesheetTotalHours(
        Dashboard.formatTotalHoursForUi(weeklyTimesheet.totalHours)
      );
    });
  });

  test("HRIMS_DASH_16 verifying pending requests API data matches Action Centre UI @smoke", async () => {
    const pendingRequests = pendingRequestsApiData!;

    await test.step("Verify Action Centre UI matches API response", async () => {
      await dashboard.verifyPendingRequestsMatchApi(pendingRequests);
    });
  });

  test("HRIMS_DASH_17 verifying attendance analytics API data matches Dashboard UI @smoke", async () => {
    const attendanceAnalytics = attendanceAnalyticsApiData!;

    await test.step("Verify current month percentage matches API response", async () => {
      await dashboard.verifyAttendanceAnalyticsCurrentMonthPercentage(
        attendanceAnalytics
      );
    });
  });

  test("HRIMS_DASH_18 verifying today punch API data matches Dashboard UI @smoke", async () => {
    const todayPunch = todayPunchApiData!;

    await test.step("Verify office in and office out match API response", async () => {
      await dashboard.verifyTodayPunchOfficeInOut(todayPunch);
    });
  });

  test("HRIMS_DASH_19 verifying employee projects API data matches My Projects UI @smoke", async () => {
    const employeeProjects = employeeProjectsApiData!;

    await test.step("Verify My Projects UI matches API response", async () => {
      await dashboard.verifyEmployeeProjectsMatchApi(employeeProjects);
    });
  });
   
  test("HRIMS_DASH_20 verifying leave balance API data matches Dashboard UI @smoke", async () => {
    const leaveBalance = leaveBalanceApiData!;

    await test.step("Verify leave balance cards match API response", async () => {
      await dashboard.verifyLeaveBalanceMatchApi(leaveBalance);
    });
  });
  test("HRIMS_DASH_24 verifying my profile redirects to profile page @smoke", async () => {
    await test.step("Click My Profile from the dashboard account menu and verify the profile page opens", async () => {
      await dashboard.waitForDashboardToLoad();
      await dashboard.verifyMyProfileRedirect();
    });
  });

  test("HRIMS_DASH_25 verifying logout redirects to login page @smoke", async () => {
    await test.step("Click Logout from the dashboard account menu and verify the login page opens", async () => {
      await dashboard.waitForDashboardToLoad();
      await dashboard.verifyLogoutRedirectToLogin();
    });
  });

  test("HRIMS_DASH_26 verifying upcoming birthday card is visible @smoke", async () => {
    await test.step("Verify the upcoming birthday card is visible on the Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
      await dashboard.verifyUpcomingBirthdayCard();
    });
  });

  test("HRIMS_DASH_27 verifying upcoming work anniversary card is visible @smoke", async () => {
    await test.step("Verify the upcoming work anniversary card is visible on the Dashboard", async () => {
      await dashboard.waitForDashboardToLoad();
      await dashboard.verifyUpcomingWorkAnniversaryCard();
    });
  });
});