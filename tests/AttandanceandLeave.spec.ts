import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/Loginpage';
import { Login } from '../support/command';
import { AttendanceTab } from '../pages/Attandance_And_Leave';

test.describe('Attendance & Leave tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);

        await basePage.open('url');
        await page.waitForTimeout(2000);
        await Login.login(page, 'SuperUser');
    });

    test('Attendance & Leave accordion expands and displays correct sub-tabs', async ({ page }) => {
        const attendanceTab = new AttendanceTab(page);
        await attendanceTab.applyPrivilegeLeave();
    });
});
