import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { FILL_OUT_FIELD, FILL_IN_FIELD } from '../utils/constants';

let EmployeeDirectory: Employee_Management
test.describe("'Employee Management > Department module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigateToDepartments()
    });

    test("should display Departments tab with correct header", async ({ page }) => {
        expect(await EmployeeDirectory.Departments_Header.isVisible())
        let header = await EmployeeDirectory.Departments_Header.textContent()
        expect(header).toEqual("Departments")
    });

    test("should display correct number of records in Departments tab", async ({ page }) => {
        let { Name_count, totalNameCount } = await EmployeeDirectory.Department_No_of_records()
        expect(Name_count).toEqual(totalNameCount)
    });

    test("Validate department search bar filters results correctly", async ({ page }) => {
        let { AfterSearchTypes, Entered_Name } = await EmployeeDirectory.validateDepartmentSearchBarFunctionality()
        expect([...AfterSearchTypes].sort()).toEqual(Entered_Name)
    });
    test("should handle invalid search input in Departments tab", async ({ page }) => {
        await EmployeeDirectory.Departments_SearchBar.pressSequentially('utrewqerwq')
        let No_record = await EmployeeDirectory.noRecord(0)
        expect(No_record).toEqual("No Record Available")
    });
    test("Verify update department popup opens with correct header", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        expect(await EmployeeDirectory.Pop_Up_Header.isVisible())
        let header = await EmployeeDirectory.Pop_Up_Header.textContent()
        expect(header).toEqual("Update  Department")
    });

    test("Verify clicking cancel button closes update department popup", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await EmployeeDirectory.clickOnCancelButton(EmployeeDirectory.DepartmentCancelButton)
        await expect(EmployeeDirectory.Pop_Up_Header).toBeHidden()

    });
    test("Verify clicking cross icon closes update department popup", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await EmployeeDirectory.clickOnCrossButton(EmployeeDirectory.CrossButton)
        await expect(EmployeeDirectory.Pop_Up_Header).toBeHidden()
    });
    test("Verify error toast message appears when department name does not changes", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await EmployeeDirectory.PopUP_Submit_button.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toContain("Department not updated. Please try again after some time")
    });

    test("Verify validation message is shown when department name is empty", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await EmployeeDirectory.Name_TextArea.clear()
        await EmployeeDirectory.PopUP_Submit_button.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let message = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.Name_TextArea)
        expect(message === FILL_OUT_FIELD || message === FILL_IN_FIELD).toBeTruthy();

    });

    test("should update department successfully and show success message @smoke", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        let Department_name = await EmployeeDirectory.generateRandomString(6);
        await EmployeeDirectory.Name_TextArea.fill(Department_name)
        await EmployeeDirectory.PopUP_Submit_button.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toContain("Department successfully updated!")
    });

    test("should display Add department popup with correct header", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await expect(EmployeeDirectory.Pop_Up_Header).toBeVisible()
    });

    test("should close update add department popup using cancel button", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await expect(EmployeeDirectory.Pop_Up_Header).toBeVisible()
        await EmployeeDirectory.clickOnCancelButton(EmployeeDirectory.DepartmentCancelButton)
        await expect(EmployeeDirectory.Pop_Up_Header).toBeHidden()
    });
    test("should close update add department popup using cross button", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await EmployeeDirectory.clickOnCrossButton(EmployeeDirectory.CrossButton)
        await expect(EmployeeDirectory.Pop_Up_Header).toBeHidden()
    });
    test("should show validation message when department name is empty", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        await EmployeeDirectory.Name_TextArea.fill("")
        await EmployeeDirectory.PopUP_Submit_button.click()
        let message = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.Name_TextArea)
        expect(message === FILL_OUT_FIELD || message === FILL_IN_FIELD).toBeTruthy();

    });
    test("should add new department and show success message @smoke", async ({ page }) => {
        await EmployeeDirectory.clickOnUpdateIcon()
        let Department_name = await EmployeeDirectory.generateRandomString(6);
        await EmployeeDirectory.Name_TextArea.fill(Department_name)
        await EmployeeDirectory.PopUP_Submit_button.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toContain("Department successfully updated!")
    });

});