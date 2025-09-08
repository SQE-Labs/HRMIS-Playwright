import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { CommonUtils } from '../utils/commonUtils';
import { FILL_OUT_FIELD , FILL_IN_FIELD, SELECT_ITEM } from '../utils/constants';

let EmployeeDirectory: Employee_Management
test.describe("'Employee Management > Assign Manager module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.navigaeToApproveDocument()
        await EmployeeDirectory.waitforLoaderToDisappear()
    });

    test("Approve Document Tab", async ({ page }) => {


        var header = await EmployeeDirectory.Approve_Header.textContent()
        expect(header).toEqual("Approve Document")
        let labelcount = await EmployeeDirectory.Approve_Label.count()
        for (let i = 0; i < labelcount; i++) {
            let label = await EmployeeDirectory.Approve_Label.nth(i)
            expect(label).toBeVisible()
            let text = await EmployeeDirectory.Approve_Label.nth(i).textContent()
            console.log(text)
        }
    })

    test("compares approved document types in UI with dropdown options", async ({ page }) => {
        // Exit if no records
        if (await EmployeeDirectory.Approve_Label_Exiting_Document_type.count() === 0) {
            console.log("No approved documents found.");
            return;
        }
        // Collect unique approved document types from the UI table
        const uniqueTypes = await EmployeeDirectory.getTextSetFromLocator(
            EmployeeDirectory.Approve_Label_Exiting_Document_type,
            0
        );
        console.log("Approved Document Types from UI:", [...uniqueTypes,]);

        // Open dropdown and collect available options
        await EmployeeDirectory.Approve_Label_Document_type_dropdown.click();
        await page.waitForSelector('[id^="react-select-2-option"]');

        const dropdownTypes = await EmployeeDirectory.getTextSetFromLocator(
            page.locator('[id^="react-select-2-option"]'),
            1 // assuming index 0 is a placeholder like "Select"
        );
        console.log("Dropdown Document Types:", [...dropdownTypes]);


        expect([...uniqueTypes].sort()).toEqual([...dropdownTypes].sort());
    });

    test("compares unique employee types with dropdown options", async ({ page }) => {


        const uniqueTypes = await EmployeeDirectory.getUniqueTextSetFromLocator(EmployeeDirectory.Approve_Label_Exiting_Employee, 0, undefined);
        console.log("Unique Approved Employee Types:", [...uniqueTypes]);

        await EmployeeDirectory.Approve_Label_Employee_dropdown.click();
        await page.waitForTimeout(2000);

        const dropdownTypes = await EmployeeDirectory.getUniqueTextSetFromLocator(page.locator('[id^="react-select-3-option"]'), 1);
        console.log("Dropdown Employee Types:", [...dropdownTypes]);

        expect([...uniqueTypes].sort()).toEqual([...dropdownTypes].sort());
    });

    test("filters employee records based on dropdown selection", async ({ page }) => {


        await EmployeeDirectory.selectDropdownOptionByIndex(2);
        await page.waitForTimeout(500);

        const selectedOption = await page.locator("(//div[@class = ' css-1dimb5e-singleValue'])[2]").textContent();
        console.log("Selected Dropdown Option:", selectedOption);

        await page.waitForTimeout(1500);
        const filteredTypes = await EmployeeDirectory.getUniqueTextSetFromLocator(EmployeeDirectory.Approve_Label_Exiting_Employee);
        console.log("Filtered Employee Types:", [...filteredTypes]);

        expect([...filteredTypes].sort()).toEqual([selectedOption?.trim()]);
    });


    test("opens verify document popup after clicking action button", async ({ page }) => {


        await EmployeeDirectory.Action_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();

        const header = await EmployeeDirectory.Action_Button_popup.textContent();
        console.log("Popup Header:", header);

        expect(header).toEqual('Verify Document');
    });


    test("closes action popup on cancel button click", async ({ page }) => {

        await EmployeeDirectory.Action_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        await page.locator(".cancel-approve").click();
        await page.waitForTimeout(2000);

        expect(await EmployeeDirectory.Action_Button_popup.isHidden()).toBe(true);
    });

    test("closes action popup on close icon click", async ({ page }) => {
        await EmployeeDirectory.Action_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        await page.locator(".btn-close").click();
        await page.waitForTimeout(2000);
        expect(await EmployeeDirectory.Action_Button_popup.isHidden()).toBe(true);
    });

    test("should download file after clicking View button", async ({ page }) => {

        await EmployeeDirectory.Action_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        await EmployeeDirectory.verifyXLSXDownload(page, async () => {
            await EmployeeDirectory.View_button.click();
        });
    })

    test("should show validation message when action is not selected", async ({ page }) => {

        await EmployeeDirectory.Action_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        await EmployeeDirectory.PopUP_Submit_button.click();
        const message = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.Select_action_dropdown)
        expect(message).toEqual(SELECT_ITEM);
    })


    test("should change document status to approved and show success toast", async ({ page }) => {

        await EmployeeDirectory.Action_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        await EmployeeDirectory.Select_action_dropdown.selectOption({ value: 'approved' })
        await EmployeeDirectory.PopUP_Submit_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        const message = await EmployeeDirectory.toastMessage()
        console.log("Toast Message:", message);
        expect(message).toEqual("Document Approval Status Changed to approved");
    })

    test("should validate rejection reason and change status to rejected", async ({ page }) => {

        await EmployeeDirectory.Action_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        await EmployeeDirectory.Select_action_dropdown.selectOption({ value: 'rejected' })

        await expect(EmployeeDirectory.Reason_Section).toBeVisible();
        await EmployeeDirectory.PopUP_Submit_button.click();
        let message1 = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.Reason_Section)
        expect(message1 === FILL_OUT_FIELD || message1 === FILL_IN_FIELD).toBeTruthy();

        await EmployeeDirectory.Reason_Section.fill("Test reason for rejection");
        await EmployeeDirectory.PopUP_Submit_button.click();
        await EmployeeDirectory.waitforLoaderToDisappear();
        let message2 = await EmployeeDirectory.toastMessage()
        console.log("Toast Message:", message2);
        expect(message2).toEqual("Document Approval Status Changed to rejected");
    })

})