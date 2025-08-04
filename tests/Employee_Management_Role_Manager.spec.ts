import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';

let EmployeeDirectory: Employee_Management
test.describe("'Employee Management > Assign Manager module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigateToRoleManagement()
        await EmployeeDirectory.waitforLoaderToDisappear()
    });
    test("Role Management subtab ", async ({ page }) => {
        var header = await EmployeeDirectory.Role_Header.textContent()
        expect(header).toEqual("Role Management")
    })
    test("Role Management Dropdown ", async ({ page }) => {

        await EmployeeDirectory.Dropdown.click()
        var optioncount = await page.locator(".css-10wo9uf-option").count()
        console.log(optioncount)
        for (let i = 0; i < optioncount; i++) {
            let option = await page.locator(".css-10wo9uf-option").nth(i)
            await expect(option).toBeVisible();
            let text = await page.locator(".css-10wo9uf-option").nth(i).textContent()
            console.debug(text)
        }
        await EmployeeDirectory.DropdownOption.click()
        await page.locator(".theme-button.ms-2 ").click()
        console.log(await page.locator(".Toastify__toast-body").textContent())
        expect(await page.locator(".Toastify__toast-body").isVisible())

        let message = await page.locator(".badge.badge-success.fs-5").textContent()
        console.log(message)
        expect(message).toContain(" The role has been successfully assigned")

    })

})