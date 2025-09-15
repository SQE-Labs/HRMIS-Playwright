import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';
import { AttendanceLeaveTab } from '../pages/Attendance&Leaves';

let attendanceLeaveTab : AttendanceLeaveTab

test.describe('Attendance and Leave tests', () => {
     // Define subTabsTitles as a constant if only used locally in this file
      const subTabsTitles: string[] = [
      'Apply Leaves',
      'My Team Leave',
      'Approve Leave (HR)',
      'Punch Details', 'Download Attendance', 'My Attendance', 'Request Leave Credits', 'Approve Leave Credits', 'Holiday Management',
      'Holiday List', 'Out Of Office', 'Apply Regularization', 'My Team Regularizations','Approve Regularizations(HR)', 'On Official Duty ', 'On Official Duty (DL)', 'On Official Duty (HR)', 'Download Leaves Report'
    ];

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
         await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        attendanceLeaveTab = new AttendanceLeaveTab(page);

    });
    
      test(' HRMIS_1 Attendance& Leave accordion expands and displays correct sub-tabs @smoke', async ({ page }) => {
          console.debug('Expanding Attendance&Leave Tab...');
          await attendanceLeaveTab.expandAttendanceAndLeaveTab();

           console.debug('Verifying sub-tabs visibility...');
           expect(await attendanceLeaveTab.verifySubTabs(subTabsTitles)).toBeTruthy();
    });

    test(' HRMIS_2 User navigates to Apply Leave subtab after clicking on it @smoke', async ({page})=>{
        await attendanceLeaveTab.navigateToAttendanceTab('Apply Leaves');
        await expect(page.getByRole('heading', { name: 'Apply Leaves' })).toBeVisible();

    });


});


