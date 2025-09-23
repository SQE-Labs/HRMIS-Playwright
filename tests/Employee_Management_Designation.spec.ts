import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { FILL_OUT_FIELD, FILL_IN_FIELD } from '../utils/constants';



let EmployeeDirectory: Employee_Management

test.describe("'Employee Management > Document Upload module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigateToDesignations()
        await EmployeeDirectory.waitforLoaderToDisappear()
    });


    test("wqewq", async ({ page }) => {
        let name = await EmployeeDirectory.generateRandomString(7)
       
        await EmployeeDirectory.selectDepartment(3) 
        await EmployeeDirectory.waitforLoaderToDisappear()
        await expect(page.getByText("S.No.")).toBeVisible()
        // await expect(page.getByText("Designation").nth(6)).toBeVisible()
        await expect(page.getByText("Creation Date")).toBeVisible()
        await expect(page.getByText("Status")).toBeVisible()
        await expect(page.getByText("Action").last()).toBeVisible()

        await EmployeeDirectory.clickOnAddDesignation()
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await EmployeeDirectory.fillNameField(name)
        await page.getByText("Cancel").last().click()
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await expect(page.getByText(name)).not.toBeVisible()

        await EmployeeDirectory.clickOnAddDesignation()
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await EmployeeDirectory.fillNameField(name)
        await page.getByText("Submit").click()
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await expect(page.getByText(name)).toBeVisible()

    })

})