import { test, expect } from "@playwright/test";
import { DownloadLeaveReport } from "../pages/downloadLeaveReport";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import * as fs from 'fs';


let attendanceLeaveTab: AttendanceLeaveTab;
let downloadLeaveReport : DownloadLeaveReport;


test.describe("Download Leave Report", () => {

    test.beforeEach(async ({ page }, testInfo) => {
        let loginObj: LoginPage;

        loginObj = new LoginPage(page);
        attendanceLeaveTab = new AttendanceLeaveTab(page);
        downloadLeaveReport = new DownloadLeaveReport(page)

        await loginObj.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);
        console.log(">> Starting test case : " + testInfo.title);
    })


    test('HRMIS_A&L_134, HRMIS_A&L_137, HRMIS_A&L_138 Verify navigation to the Download Leaves Report page, field reset on Reset click, and report download after selecting an Employee Flag option. @smoke, @eti', async ({page})=>{
        // 1 Navigate to "Download Leaves Report" page
        await attendanceLeaveTab.navigateToAttendanceTab("Download Leaves Report");
        await downloadLeaveReport.waitForDotsLoaderToDisappear();

        // Assert page heading
        const headingText = await downloadLeaveReport.heading.textContent();
        expect(headingText).toContain("Download Leaves Report");

        // 2 Initial selection before reset
        await downloadLeaveReport.selectDates('02/10/2025', '04/10/2025');
        await downloadLeaveReport.selectEmployeeFlag('IRED_INDIA');
        await downloadLeaveReport.heading.click();

        // 3 Click Reset and verify fields are reset
        await downloadLeaveReport.resetBtn.click()
        expect(await downloadLeaveReport.fromDateField.inputValue()).toBe(""); 
        expect(await downloadLeaveReport.toDateField.inputValue()).toBe("");   
        expect(await downloadLeaveReport.employeeFlag.inputValue()).toBe("CCI_INDIA"); 

        // 4 Re-select dates & employee flag after reset
        await downloadLeaveReport.selectDates('02/10/2025', '04/10/2025');
        await downloadLeaveReport.selectEmployeeFlag('IRED_INDIA');
        await downloadLeaveReport.heading.click()

        // 5 Download report and verify
        const filePath = await downloadLeaveReport.verifyXLSXDownload(page, async () => {
            await downloadLeaveReport.downloadButton.click();
        });

        expect(fs.existsSync(filePath)).toBe(true);
        console.log("Downloaded file path:", filePath);
    });
})
