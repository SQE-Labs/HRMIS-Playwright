import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { FILL_FIELD } from '../utils/constants';


let EmployeeDirectory: Employee_Management

test.describe("'Employee Management > Assign Manager module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigateToDocumentUploadTab()
        await EmployeeDirectory.waitforLoaderToDisappear()
    });


    test("Documents Upload Tab", async ({ page }) => {
        await EmployeeDirectory.Document_upload_Header.isVisible()
        var header = await EmployeeDirectory.Document_upload_Header.textContent()
        expect(header).toEqual("Document Upload")
    })
    test("Documents Upload Dropdown", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        var ColoumnCount = await EmployeeDirectory.Document_Upload_Column.count()
        console.log(ColoumnCount)
        for (let i = 0; i < ColoumnCount; i++) {
            var coloumnText = await EmployeeDirectory.Document_Upload_Column.nth(i).textContent()
            console.log(coloumnText)
            expect(coloumnText).toEqual(EmployeeDirectory.Document_Upload_Column_text[i])
        }
    })

    test("Documents Upload upload button ", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Upload_Icon.click()
        var PopUp_Header = await EmployeeDirectory.PopUp_Header.textContent()
        await EmployeeDirectory.PopUp_Header.isVisible()
        expect(PopUp_Header).toEqual("Upload Document Action")
    })


    test("Documents Upload upload button cancel button functionality ", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Upload_Icon.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Popup_Cancel_button.click()
        await EmployeeDirectory.PopUp_Header.isHidden()
    })
    test("Documents Upload upload button cross icon functionality ", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Upload_Icon.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Popup_Cross_button.click()
        await EmployeeDirectory.PopUp_Header.isHidden()
  
    })
    test("Documents Upload PopUp Functionality ", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Upload_Icon.click()
        await EmployeeDirectory.PopUP_Submit_button.click()
        let validationmesssage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.Choose_file)
        expect(validationmesssage).toEqual('Please select a file.')
    })

    test("shows validation message if comment field is empty", async ({ page }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Upload_Icon.click()
        await EmployeeDirectory.uploadAndVerifyFile("screenshot.png", page, EmployeeDirectory.PopUP_Submit_button)
        await EmployeeDirectory.waitforLoaderToDisappear()
        let validationmesssage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.PopUp_comment)
        expect(validationmesssage).toEqual(FILL_FIELD)
    })

    test("Upload document with comment and opens preview tab", async ({ page, context }) => {
        await EmployeeDirectory.Dropdown.click()
        await EmployeeDirectory.DropdownOption.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.Upload_Icon.click()
        await EmployeeDirectory.uploadAndVerifyFile("screenshot.png", page)
        await EmployeeDirectory.waitforLoaderToDisappear()
        
        await EmployeeDirectory.PopUp_comment.fill("Thank you !!")
        await EmployeeDirectory.PopUP_Submit_button.click()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toContain("uploaded")
        await EmployeeDirectory.PopUp_Header.isHidden()
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // listens for new page (tab/window)
            EmployeeDirectory.EyeIcon.click()          // triggers opening the new page
        ]);

        await newPage.waitForLoadState('load');
        const newPageUrl = newPage.url();
        expect(newPageUrl).toContain("screenshot.png");
        await newPage.close();
        await EmployeeDirectory.waitforLoaderToDisappear()
    })


})