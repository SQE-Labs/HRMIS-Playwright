import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';
import { AttendanceLeaveTab } from '../pages/Attendance&Leaves';
import * as constants from '../utils/constants';
import { MyTeamLeavePage } from '../pages/myTeamLeave';


let myTeamLeave: MyTeamLeavePage;
test.describe("My Team Leave Page", () => {
    test.beforeEach(async ({ page }, testInfo) => {
        const loginObj = new LoginPage(page);
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );
        myTeamLeave = new MyTeamLeavePage(page);
        console.log(">> Starting test case : " + testInfo.title);
    });

    test('HRMIS_2,HRMIS_4 Validate My Team Leave Page UI Elements @smoke', async ({ page }) => {
        const attendanceLeaveTab = new AttendanceLeaveTab(page);
        await attendanceLeaveTab.navigateToAttendanceTab('My Team Leave');

        // verify the default status of dropdown
        await myTeamLeave.verifyDefaultValueOfStatusDropdown();

        // verify the default select by emplyoee name field
        expect(await myTeamLeave.isSearchBoxVisible()).toBeTruthy();

        // Select any leave status
    
        await myTeamLeave.selectLeaveStatus(constants.APPROVED_STATUS);
        await myTeamLeave.waitforLoaderToDisappear();

        // verify the leave status dropdown value
        await myTeamLeave.selectLeaveStatus(constants.APPROVED_STATUS);

        const selectedValue = await myTeamLeave.statusDropdown.inputValue();
        expect(selectedValue).toBe(constants.APPROVED_STATUS);
        await myTeamLeave.waitforLoaderToDisappear();
   
        // Entering partial value in the search employee name field
        await myTeamLeave.searchEmployee(testData.LEAVE_EMP_NAME);
        await myTeamLeave.waitforLoaderToDisappear();
        

        // Wait for search results to appear
        await myTeamLeave.employeeRows.first().waitFor({ state: 'visible' });

        // Now get all employee names
        const employees = await myTeamLeave.getEmployeeNames();
        console.log("Search results:", employees);

        // Verify that each employee name contains the search term (case-insensitive)
        for (let name of employees) {
    if (name) {
        expect(name.trim().toLowerCase()).toContain(
            testData.LEAVE_EMP_NAME.toLowerCase()
        );
    }
}


    });
});
