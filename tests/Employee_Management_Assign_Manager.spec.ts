import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/Loginpage';
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
        await EmployeeDirectory.navigateToAssignManager()
        await EmployeeDirectory.waitforLoaderToDisappear()
    });

    test("hould display Assign Manager tab with Manager and Leave Manager sub-tabs", async ({ page }) => {
        let AssignHeader = await EmployeeDirectory.AssignManagerHeader.textContent()
        expect(AssignHeader).toEqual("Assign Manager")
        expect(EmployeeDirectory.AssignManagerSubTabManager).toHaveText('Manager')
        expect(EmployeeDirectory.AssignManagerSubTabLeaveManager).toHaveText('Leave Manager')

    })



    test("should get column count after selecting an employee from dropdown", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.getColumnCount()
    })
    test("should open Assign Manager popup after selecting employee and clicking action button", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnActionButton()
        var PopupHeader = await EmployeeDirectory.PopupHeader.textContent()
        expect(PopupHeader).toEqual("Assign Manager")

    })

    test("should close Assign Manager popup when cross button is clicked", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnActionButton()
        await EmployeeDirectory.clickOnCrossButton()
        await expect(EmployeeDirectory.PopupHeader).toBeHidden()

    })

    test("should close Assign Manager popup when cancel button is clicked", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnActionButton()
        await EmployeeDirectory.clickOnCancelButton()
        await expect(EmployeeDirectory.PopupHeader).toBeHidden()

    })

    test(" close Assign Manager popup when cancel button is clicked", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnActionButton()
        await page.locator("#react-select-3-option-2").click()
        await EmployeeDirectory.PopupSubmitButton.click()
        let message = await EmployeeDirectory.toastMessage()
        

    })

    
    test("Assign Leave manager tab ", async ({ page }) => {
        await EmployeeDirectory.Assign_Leave_Manager()
    })




})