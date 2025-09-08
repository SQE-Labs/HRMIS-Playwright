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
        await EmployeeDirectory.clickOnCrossButton(EmployeeDirectory.CrossButton)
        await expect(EmployeeDirectory.PopupHeader).toBeHidden()

    })

    test("should close Assign Manager popup when cancel button is clicked", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnActionButton()
        await EmployeeDirectory.clickOnCancelButton(EmployeeDirectory.CancelButton)
        await expect(EmployeeDirectory.PopupHeader).toBeHidden()

    })

    test(" assign manager successfully when valid selection is made @smoke", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnActionButton()
        await EmployeeDirectory.PopupDropDown.click()
        await EmployeeDirectory.selectionofAssignManager(0)
        await EmployeeDirectory.PopupSubmitButton.click()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toEqual("Successfully Assigned!")
    })
    test("show error when employee is assigned as their own manager", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.selectEmployeeOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnActionButton()
        await EmployeeDirectory.PopupDropDown.click()
        await EmployeeDirectory.selectionofAssignManager(2)
        await EmployeeDirectory.PopupSubmitButton.click()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toEqual("An employee cannot be their own manager")
    })


    
    test("navigate to Leave Manager tab and verify header", async ({ page }) => {
        await EmployeeDirectory.clickOnAssignManagerSubTabLeaveManager()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let LeaveManagerHeader = await page.locator("(//h3[@class = 'heading'])[2]").textContent()
        expect(LeaveManagerHeader).toEqual("Leave Manager")
        // await EmployeeDirectory.Assign_Leave_Manager()
    })

    test("assign leave manager and verify column count", async ({ page }) => {
        await EmployeeDirectory.clickOnAssignManagerSubTabLeaveManager()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.LeaveManagerPopupDropDown.click()
        await EmployeeDirectory.selectionOfLeaveManager(1)
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.getColumnCount()
    })

    test("conditionally assign and attempt to delete leave manager, then cancel deletion ", async ({ page }) => {
        await EmployeeDirectory.clickOnAssignManagerSubTabLeaveManager()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.LeaveManagerPopupDropDown.click()
        await EmployeeDirectory.selectionOfLeaveManager(1)
        await EmployeeDirectory.waitforLoaderToDisappear()
        let Coloumncount = await EmployeeDirectory.getColumnCount()
        if (Coloumncount === 0) {
            expect(EmployeeDirectory.noRecord(1)).toEqual("Leave manager not assigned")
            await EmployeeDirectory.AssignButton.click()
            await EmployeeDirectory.waitforLoaderToDisappear()
            await EmployeeDirectory.PopupDropDown.click()
            await EmployeeDirectory.selectionofAssignManager(1)
            await EmployeeDirectory.PopupSubmitButton.click()
            let message = await EmployeeDirectory.toastMessage()
            expect(message).toEqual("Successfully Assigned!")
        }
        await EmployeeDirectory.LeaveManagerActionButton.click()
        var LeavePopupheader = await EmployeeDirectory.Pop_Up_Header.textContent()
        expect(LeavePopupheader).toEqual("Are you sure you want to delete ?")
        await EmployeeDirectory.clickOnNOButton()
        await expect(EmployeeDirectory.Pop_Up_Header).toBeHidden()
    })

    test("conditionally assign and delete leave manager, then verify removal @smoke ", async ({ page }) => {
        await EmployeeDirectory.clickOnAssignManagerSubTabLeaveManager()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.LeaveManagerPopupDropDown.click()
        await EmployeeDirectory.selectionOfLeaveManager(1)
        await EmployeeDirectory.waitforLoaderToDisappear()
        let Coloumncount = await EmployeeDirectory.getColumnCount()
        if (Coloumncount === 0) {
            expect(EmployeeDirectory.noRecord(1)).toEqual("Leave manager not assigned")
            await EmployeeDirectory.AssignButton.click()
            await EmployeeDirectory.waitforLoaderToDisappear()
            await EmployeeDirectory.PopupDropDown.click()
            await EmployeeDirectory.selectionofAssignManager(1)
            await EmployeeDirectory.PopupSubmitButton.click()
            let message = await EmployeeDirectory.toastMessage()
            expect(message).toEqual("Successfully Assigned!")
        }
        await EmployeeDirectory.LeaveManagerActionButton.click()
        var LeavePopupheader = await EmployeeDirectory.Pop_Up_Header.textContent()
        expect(LeavePopupheader).toEqual("Are you sure you want to delete ?")
        await EmployeeDirectory.clickOnYesButton()
        let messgae = await EmployeeDirectory.toastMessage()
        expect(messgae).toEqual("Leave Manager removed successfully")
        expect(EmployeeDirectory.noRecord(1)).toEqual("Leave manager not assigned")
    })

})