import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { asyncWrapProviders } from 'async_hooks';


let EmployeeDirectory: Employee_Management
test.describe("'Employee Management module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigateToPromotionManagement()
        await EmployeeDirectory.waitforLoaderToDisappear()
    });


    test("verify Promotion Management tab header is visible", async ({ page }) => {

        let header = await EmployeeDirectory.PromotionHeader.textContent()
        await expect(EmployeeDirectory.PromotionHeader).toBeVisible()
        expect(header).toEqual("Promotion Management")
    })

    test("select Promotion from dropdown and verify data table renders", async ({ page }) => {

        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.LeaveManagerData()
    })


    test("click Promote button and verify Promote Employee popup header", async ({ page }) => {


        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.PromoteButton.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let header = await EmployeeDirectory.PromotionPopUpHeader.textContent()
        expect(header).toEqual("Promote Employee")
    })
    test("close Promote Employee popup using cross button", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.PromoteButton.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.CrossButton.click()
        await expect(EmployeeDirectory.PromotionPopUpHeader).toBeHidden()

    })

    test("close Promote Employee popup using cancel button", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.PromoteButton.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.PromotionCancelButton.click()
        await expect(EmployeeDirectory.PromotionPopUpHeader).toBeHidden()

    })

    test("close  Employee popup using cancel button", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.PromoteButton.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.DepartmentDropdown, "5")
        await expect(EmployeeDirectory.PromotionPopUpHeader).toBeHidden()
        await EmployeeDirectory.getDesignationoptionCount()
    })

    test("promote employee by selecting department and designation, then verify success message", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.PromoteButton.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.DepartmentDropdown.selectOption({ value: '5' })
        await EmployeeDirectory.getDesignationoptionCount()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.DesignationDropdown, 'Sr. Solution Architect')
        await EmployeeDirectory.PromoteEmployeePopUpSubmitButton.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        console.log(await page.locator(".Toastify__toast-body").textContent())
        expect(await page.locator(".Toastify__toast-body").isVisible())


    })

})