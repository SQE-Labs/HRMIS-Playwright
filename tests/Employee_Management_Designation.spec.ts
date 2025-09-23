import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import * as constants from '../utils/constants';




let EmployeeDirectory: Employee_Management

test.describe("'Employee Management > Document Upload module @smoke'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigateToDesignations()
        await EmployeeDirectory.waitforLoaderToDisappear()
    });


    test("Validate Designation Add, Edit, Cancel functionality in Employee Directory @smoke", async ({ page }) => {
        let name = await EmployeeDirectory.generateRandomString(7)
        let name1 = await EmployeeDirectory.generateRandomString(7)

        // Select department and validate initial grid headers are visible
        await EmployeeDirectory.selectDepartment(3)
        await EmployeeDirectory.waitforLoaderToDisappear()
        await expect(page.getByText("S.No.")).toBeVisible()

        // Then validate that the new designation is NOT added
        await expect(page.getByText("Creation Date")).toBeVisible()
        await expect(page.getByText("Status")).toBeVisible()
        await expect(page.getByText("Action").last()).toBeVisible()
        await EmployeeDirectory.clickOnAddDesignation()
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await EmployeeDirectory.fillNameField(name)
        await page.getByText("Cancel").last().click()
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await expect(page.getByText(name)).not.toBeVisible()


        // Again click on 'Add Designation', fill name and click 'Submit'
        await EmployeeDirectory.clickOnAddDesignation()
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await EmployeeDirectory.fillNameField(name)
        await page.getByText("Submit").click()
        await EmployeeDirectory.verifySuccessMessage(constants.DESIGNATION_SUCESSMESSSAGE) 
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await expect(page.getByText(name)).toBeVisible()

        // Then validate that the old name is still visible
        await EmployeeDirectory.clickOnEditIcon(name)
        await EmployeeDirectory.fillNameField(name1)
        await page.getByText("Update ").last().click()
        await EmployeeDirectory.verifySuccessMessage(constants.DESIGNATION_UPDATE_SUCESSMESSSAGE)
        await EmployeeDirectory.waitForDotsLoaderToDisappear()
        await expect(page.getByText(name)).not.toBeVisible()
        await expect(page.getByText(name1)).toBeVisible()

    })

})