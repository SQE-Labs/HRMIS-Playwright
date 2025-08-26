import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { AttendanceTab } from '../pages/Attandance_And_Leave';
import testData from '../testData/testData.json';

test.describe('Attendance & Leave tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

    });

    test('Attendance & Leave accordion expands and displays correct sub-tabs', async ({ page }) => {
        const attendanceTab = new AttendanceTab(page);
        await attendanceTab.applyPrivilegeLeave();
    });
});
