import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/Loginpage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { FILL_FIELD, SELECT_ITEM } from '../utils/constants';
import { emit } from 'process';

let EmployeeDirectory: Employee_Management
test.describe("'Employee Management module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.naviagteToEmployeeDirectoryTab()
        await EmployeeDirectory.waitforLoaderToDisappear()

    });

    test("Navigating to the Employee Directory tab.", async ({ page }) => {
        const Directory_Header = await EmployeeDirectory.Employee_Directory_tab_Header.textContent()
        expect(Directory_Header?.trim()).toEqual("Employee Directory")
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        expect(TotalCards).toEqual(TotalEmployeecount)
    })


    test("Verify Search Functionality and Validate Employee Card Details and Count", async ({ page }) => {
        await EmployeeDirectory.searchByEmployeeDirectorySearchBar("Autom Mation User")
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        var TotalCardsText = await EmployeeDirectory.Employee_Directory_cards_title.textContent() || ""
        expect(TotalCardsText.trim().replace(/\s+/g, ' ')).toContain("Autom Mation User")
        expect(TotalCards).toEqual(TotalEmployeecount)
    })

    test("Verify NoRecordMessage For Invalid Employee Search", async ({ page }) => {
        await EmployeeDirectory.searchByEmployeeDirectorySearchBar("978735")  //invalid Employee name
        let Norecord = await EmployeeDirectory.noRecord()
        expect(Norecord).toEqual("No Record Available")
    })

    test("verify Employee Count Matches After Department Filter Applied", async ({ page }) => {
        await EmployeeDirectory.selectDepartment('Technical')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        expect(TotalCards).toEqual(TotalEmployeecount)
    })

    test("verify Employee Count After Selecting Status Filter", async ({ page }) => {
        await EmployeeDirectory.selectStatus('LEFTOUT (Permanently Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        expect(TotalCards).toEqual(TotalEmployeecount)
    })

    test("verify Department Filter Results With Or Without Employees", async ({ page }) => {
        await EmployeeDirectory.selectDepartment('Admin')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        if (TotalCards === 0) {
            var Norecord = await EmployeeDirectory.noRecord()
            expect(Norecord).toEqual("No Record Available")
        } else {
            expect(TotalCards).toEqual(TotalEmployeecount)
        }
    })

    test("verify Status Filter Results With Or Without Employees", async ({ page }) => {
        await EmployeeDirectory.selectDepartment('Technical')
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.selectStatus('BLOCKED (Temporally Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        if (TotalCards === 0) {
            var Norecord = await EmployeeDirectory.noRecord()
            expect(Norecord).toEqual("No Record Available")
        } else {
            expect(TotalCards).toEqual(TotalEmployeecount)
        }
    })

    test("verify Employee Profile Name Matches Card Name ", async ({ page }) => {
        let employeecardName = await EmployeeDirectory.fechingEmployeeName()
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        let EmployeeName = await EmployeeDirectory.EmployeeProfile.textContent()
        expect(employeecardName).toContain(EmployeeName)
    })

    test("verify BasicInfo Accordion Displays Correctly In Employee Profile", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnBasicInfo()
        await EmployeeDirectory.getAccordionBodycountAndText(EmployeeDirectory.AccordionBodyKey, EmployeeDirectory.BasicInfoAccordionBody)
    })

    test("Verify Basic Info Accordion Toggle Behavior", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await expect(page.locator("#collapse1").last()).toBeHidden()
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnBasicInfo()
        await expect(page.locator("#collapse1").last()).toBeVisible()
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnBasicInfo()
        await expect(page.locator("#collapse1").last()).toBeHidden()
    })

    test("verify Validation Message When First Name Is Cleared In BasicInfo", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnBasicInfo()
        await EmployeeDirectory.clickOnBasicInfoEditButton()
        await EmployeeDirectory.BasicInfoFirstname.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.BasicInfoFirstname)
        expect(tooltipMessage).toBe(FILL_FIELD)
    })

    test("verify Validation Message When Last Name Is Cleared In BasicInfo", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnBasicInfo()
        await EmployeeDirectory.clickOnBasicInfoEditButton()
        await EmployeeDirectory.BasicInfoLastName.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.BasicInfoLastName)
        expect(tooltipMessage).toBe(FILL_FIELD)
    })

    test("verify BasicInfo Remains Unchanged After Closing Edit Form", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnBasicInfo()
        let { originalFirstName, originalLastName, originalMiddleName } = await EmployeeDirectory.getOriginalBasicInfoName()
        await EmployeeDirectory.clickOnBasicInfoEditButton()
        await EmployeeDirectory.BasicInfoFirstname.fill('Archit')
        await EmployeeDirectory.BasicInfoLastName.fill('Khurana')
        await EmployeeDirectory.clickOnCloseButton()
        let { updatedFirstName, updatedLastName, updatedMiddleName } = await EmployeeDirectory.getUpdatedBasicInfoName()
        expect(originalFirstName).toEqual(updatedFirstName)
        expect(originalLastName).toEqual(updatedLastName)
        expect(originalMiddleName).toEqual(updatedMiddleName)
    })

    test("verify Profile Update With Random Basic Info Fields", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnBasicInfo()
        let { originalFirstName, originalLastName, originalMiddleName } = await EmployeeDirectory.getOriginalBasicInfoName()
        var randomFirstName = await EmployeeDirectory.generateRandomString(5);
        var randomLastName = await EmployeeDirectory.generateRandomString(5);
        var randomMiddlename = await EmployeeDirectory.generateRandomString(5);

        await EmployeeDirectory.clickOnBasicInfoEditButton()
        await EmployeeDirectory.BasicInfoFirstname.fill(randomFirstName)
        await EmployeeDirectory.BasicInfoLastName.fill(randomLastName)
        await EmployeeDirectory.BasicInfoLastName.fill(randomMiddlename)
        await EmployeeDirectory.clickOnUpdateButton()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toEqual("Profile updated successfully")
        let { updatedFirstName, updatedLastName, updatedMiddleName } = await EmployeeDirectory.getUpdatedBasicInfoName()
        expect(originalFirstName).not.toEqual(updatedFirstName)
        expect(originalMiddleName).not.toEqual(updatedMiddleName)
        expect(originalLastName).not.toEqual(updatedLastName)
    })

    test("verify Work Accordion Accordion Displays Correctly In Employee Profile", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnWorkAccordion()
        await EmployeeDirectory.getAccordionBodycountAndText(EmployeeDirectory.WorkAccordionkey, EmployeeDirectory.WorkAccordionBody)
    })
    test("Verify Work Accordion Toggle Behavior", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await expect(page.locator("#collapse2").last()).toBeHidden()
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnWorkAccordion()
        await expect(page.locator("#collapse2").last()).toBeVisible()
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnWorkAccordion()
        await expect(page.locator("#collapse2").last()).toBeHidden()
    })

    test("verify Validation Message When WorkDate Is Cleared In Work", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnWorkAccordion()
        await EmployeeDirectory.clickOnWorkEditButton()
        await EmployeeDirectory.WorkDate.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.WorkDate)
        expect(tooltipMessage).toBe(FILL_FIELD)
    })

    test("verify Validation Message When EmployeeType no Option is selected In Work", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnWorkAccordion()
        await EmployeeDirectory.clickOnWorkEditButton()
        await EmployeeDirectory.EmployeeType.selectOption({ label: 'Select Employee Sub Type' })
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.EmployeeType)
        expect(tooltipMessage).toBe(SELECT_ITEM)
    })
    test("verify Work Remains Unchanged After Closing Edit Form", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnWorkAccordion()
        let ExistingDate = await EmployeeDirectory.getExistingDate()
        await EmployeeDirectory.clickOnWorkEditButton()
        let futureDate = await EmployeeDirectory.getfutureDate()
        await EmployeeDirectory.WorkDate.fill(futureDate)
        await EmployeeDirectory.clickOnCloseButton()
        let CurrentDate = await EmployeeDirectory.getCurrentDate()
        expect(ExistingDate).toEqual(CurrentDate)
    })

    test("verify Profile Update With Random Work Date Info Fields", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnWorkAccordion()
        let ExistingDate = await EmployeeDirectory.getExistingDate()
        await EmployeeDirectory.clickOnWorkEditButton()
        let futureDate = await EmployeeDirectory.getfutureDate()
        await EmployeeDirectory.WorkDate.fill(futureDate)
        await EmployeeDirectory.clickOnUpdateButton()
        let CurrentDate = await EmployeeDirectory.getCurrentDate()
        expect(ExistingDate).not.toEqual(CurrentDate)
    })

    test("verify Personal Details Accordion Accordion Displays Correctly In Employee Profile", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.getAccordionBodycountAndText(EmployeeDirectory.PersonalDetailsKey, EmployeeDirectory.PersonalDetailsBody)
    })



    test("EmployeeAccessBlock ", async ({ page }) => {
        await EmployeeDirectory.Employee_Access_Block()
    })

    test.skip("EmployeeAccessLeftout ", async ({ page }) => {
        await EmployeeDirectory.Employee_Access_LeftOut()
    })

    test("EmployeeAccess Update Status ", async ({ page }) => {
        await EmployeeDirectory.Update_status()
    })
    test("Assign Manager tab ", async ({ page }) => {
        await EmployeeDirectory.AssignManager()
    })
    test("Assign Leave manager tab ", async ({ page }) => {
        await EmployeeDirectory.Assign_Leave_Manager()
    })

    test("Promotion Management tab ", async ({ page }) => {
        await EmployeeDirectory.Promotion_Management()
    })

    test("Documents Upload Tab", async ({ page }) => {
        await EmployeeDirectory.Document_Upload()
    })
    test("Documents Upload Dropdown", async ({ page }) => {
        await EmployeeDirectory.Document_Upload_DropDown()
    })
    test("Documents Upload upload button ", async ({ page }) => {
        await EmployeeDirectory.Document_Upload_Upload_button()
    })
    test("Documents Upload upload button cancel button functionality ", async ({ page }) => {
        await EmployeeDirectory.Document_Upload_Upload_button_Cancel_button()
    })
    test("Documents Upload upload button cross icon functionality ", async ({ page }) => {
        await EmployeeDirectory.Document_Upload_Upload_button_cross_Icon()
    })
    test("Documents Upload PopUp Functionality ", async ({ page }) => {
        await EmployeeDirectory.Document_upload_PopUp_Functionality()
    })
    // test.only("Document Upload Eye Icon", async ({ page, browser}) => {
    //     await EmployeeDirectory.Document_upload_Eye_Icon()
    // })

    test("Performance Evaluation subtab ", async ({ page }) => {
        await EmployeeDirectory.performance_Evaluation()
    })

    test("Role Management subtab ", async ({ page }) => {
        await EmployeeDirectory.Role_Management()
    })
    test("Role Management Dropdown ", async ({ page }) => {
        await EmployeeDirectory.Role_Management_DropDown()
    })
    test("Approve Document tab ", async ({ page }) => {
        await EmployeeDirectory.approve_document()
    })
    test("Approve Document Document type ", async ({ page }) => {
        await EmployeeDirectory.Approve_Document_Document_type()
    })
    test("Approve Document Employee ", async ({ page }) => {
        await EmployeeDirectory.Approve_Document_Employee()
    })
    test("Approve Document Dropdown ", async ({ page }) => {
        await EmployeeDirectory.Approve_Document_Dropdown()
    })
    test("Approve Employee Dropdown ", async ({ page }) => {
        await EmployeeDirectory.Approve_Employee_Dropdown()
    })
    test("Approve Action Button ", async ({ page }) => {
        await EmployeeDirectory.Approve_Document_Action_button()
    })
    test("Approve Cancel button ", async ({ page }) => {
        await EmployeeDirectory.Action_button_popup_cancel()
    })
    test("Approve Cross Icon ", async ({ page }) => {
        await EmployeeDirectory.Action_button_popup_Cross_icon()
    })
    test("Approve Popup Approve functionaliy ", async ({ page }) => {
        await EmployeeDirectory.Action_Button_Popup_Approved()
    })
    test("Approve Popup Rejected functionality ", async ({ page }) => {
        await EmployeeDirectory.Action_Button_Popup_Rejected()
    })
    test("Departments  ", async ({ page }) => {
        await EmployeeDirectory.Department()
    })
    test("Departments no. of records...  ", async ({ page }) => {
        await EmployeeDirectory.Department_No_of_records()
    })
    test("Departments search bar valid ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Search_Bar_Valid()
    })
    test("Departments search bar Invalid ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Search_Bar_Invalid()
    })
    test("Departments Update Icon ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Update_Icon()
    })

    test("Departments Cancel Button ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_cancel_button()
    })
    test("Departments Cross Icon ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Cross_Icon()
    })
    test("Departments pop up functionality ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Pop_up_functionality()
    })
    test("Departments + Add Department  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Add_Department()
    })
    test("Departments Add Department Cancel Button ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Add_Department_cancel_button()
    })
    test("Departments Add Department Cross Icon ...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Add_Department_Cross_Icon()
    })
    test("Departments + Add Department Functionality...  ", async ({ page }) => {
        await EmployeeDirectory.Departments_Add_Department_functionality()
    })

})