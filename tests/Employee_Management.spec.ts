import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { AADHAAR_FIELD, FILL_FIELD, PANCARD_FIELD, PASSPORT_FIELD, SELECT_ITEM } from '../utils/constants';

let EmployeeDirectory: Employee_Management
test.describe("'Employee Management module'", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeDirectory = new Employee_Management(page)
        await EmployeeDirectory.expandEmployeeManagementTab()
        await EmployeeDirectory.naviagteToEmployeeDirectoryTab()
        // await EmployeeDirectory.waitforLoaderToDisappear()

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
        let Norecord = await EmployeeDirectory.noRecord(0)
        expect(Norecord).toEqual("No Record Available")
    })

    test("verify Employee Count Matches After Department Filter Applied", async ({ page }) => {
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectDepartment, 'Technical')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        expect(TotalCards).toEqual(TotalEmployeecount)
    })

    test("verify Employee Count After Selecting Status Filter", async ({ page }) => {
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'LEFTOUT (Permanently Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        expect(TotalCards).toEqual(TotalEmployeecount)
    })

    test("verify Department Filter Results With Or Without Employees", async ({ page }) => {
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectDepartment, 'Admin')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        if (TotalCards === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No Record Available")
        } else {
            expect(TotalCards).toEqual(TotalEmployeecount)
        }
    })

    test("verify Status Filter Results With Or Without Employees", async ({ page }) => {
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectDepartment, 'Technical')
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'BLOCKED (Temporally Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        if (TotalCards === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
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
        await EmployeeDirectory.verifyCollapseIsHidden(1)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnBasicInfo()
        await EmployeeDirectory.verifyCollapseIsHidden(1)
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnBasicInfo()
        await EmployeeDirectory.verifyCollapseIsHidden(1)

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
        await EmployeeDirectory.BasicInfoMiddleName.fill(randomMiddlename)
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
        await EmployeeDirectory.verifyCollapseIsHidden(2)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnWorkAccordion()
        await EmployeeDirectory.verifyCollapseIsHidden(2)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnWorkAccordion()
        await EmployeeDirectory.verifyCollapseIsHidden(2)

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
        await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeType, 'Full time')
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

    test("Verify Personal Details Toggle Behavior", async ({ page }) => {

        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.verifyCollapseIsHidden(3)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.verifyCollapseIsHidden(3)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnEducation()
        await EmployeeDirectory.verifyCollapseIsHidden(3)


        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnWorkExperience()
        await EmployeeDirectory.verifyCollapseIsHidden(3)


        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnDependents()
        await EmployeeDirectory.verifyCollapseIsHidden(3)
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnAssignedAssets()
        await EmployeeDirectory.verifyCollapseIsHidden(3)

    })

    test("verify Validation Message When Date Is Cleared In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.PersonalDetailsDate.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.PersonalDetailsDate)
        expect(tooltipMessage).toBe(FILL_FIELD)
    })

    test("verify Validation Message When Aadhaar number Is Cleared In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.AadhaarCardNumber.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.AadhaarCardNumber)
        expect(tooltipMessage).toBe(AADHAAR_FIELD)
    })

    test("verify Validation Message When Pan number Is Cleared In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.PanCardNumber.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.PanCardNumber)
        expect(tooltipMessage).toBe(PANCARD_FIELD)
    })

    test("verify Validation Message When Present Address Is Cleared In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.PresentAddress.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.PresentAddress)
        expect(tooltipMessage).toBe(FILL_FIELD)
    })

    test("verify Validation Message When Blood Group option selects 'Select blood Group' In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.BloodGroup, 'Select Blood Group')
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.BloodGroup)
        expect(tooltipMessage).toBe(SELECT_ITEM)
    })

    test("verify Validation Message When Marital status selects 'Select Marital Status' In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.MaritalStatus, 'Select Marital Status')
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.MaritalStatus)
        expect(tooltipMessage).toBe(SELECT_ITEM)
    })

    test("verify Validation Message When Alternate number Is Cleared In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.AlternateNumber.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.AlternateNumber)
        expect(tooltipMessage).toBe(FILL_FIELD)
    })


    test("verify Validation Message When Permanent Address Is Cleared In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.PermanentAddress.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.PermanentAddress)
        expect(tooltipMessage).toBe(FILL_FIELD)
    })


    test("verify Validation Message When Passport Number Is Cleared In Perosnal Details", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.PassportNumber.clear()
        await EmployeeDirectory.clickOnUpdateButton()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.PassportNumber)
        expect(tooltipMessage).toBe(PASSPORT_FIELD)
    })

    test("verify Profile Update With Random Peronal Details clicking on closw button ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        let { OriginalaadharNumber, OriginalPanCardNumber, OriginalpermanentAddress } = await EmployeeDirectory.getOriginalPeronalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.AadhaarCardNumber.fill("765432131242")
        await EmployeeDirectory.PanCardNumber.fill("2324354231")
        await EmployeeDirectory.PermanentAddress.fill("Hello")
        await EmployeeDirectory.clickOnCloseButton()

        let { currentaadharNumber, currentPanCardNumber, CurrentpermanentAddress } = await EmployeeDirectory.getUpdatedPerosnalDetails()
        expect(OriginalaadharNumber).toEqual(currentaadharNumber)
        expect(OriginalPanCardNumber).toEqual(currentPanCardNumber)
        expect(OriginalpermanentAddress).toEqual(CurrentpermanentAddress)
    })


    test("verify Profile Update With Random Perosnal details Info Fields", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnPersonalDetails()
        let { OriginalaadharNumber, OriginalPanCardNumber, OriginalpermanentAddress } = await EmployeeDirectory.getOriginalPeronalDetails()
        await EmployeeDirectory.clickOnPersonalDetailEdit()
        await EmployeeDirectory.AadhaarCardNumber.fill(await EmployeeDirectory.generateRandomInteger(12))
        await EmployeeDirectory.PanCardNumber.fill(await EmployeeDirectory.generateRandomInteger(10))
        await EmployeeDirectory.PermanentAddress.fill(await EmployeeDirectory.generateRandomString(5))
        await EmployeeDirectory.AlternateNumber.fill(await EmployeeDirectory.generateRandomInteger(10))
        await EmployeeDirectory.clickOnUpdateButton()


        let message = await EmployeeDirectory.toastMessage()
        expect(message).toEqual("Profile updated successfully")
        let { currentaadharNumber, currentPanCardNumber, CurrentpermanentAddress } = await EmployeeDirectory.getUpdatedPerosnalDetails()
        expect(OriginalaadharNumber).not.toEqual(currentaadharNumber)
        expect(OriginalPanCardNumber).not.toEqual(currentPanCardNumber)
        expect(OriginalpermanentAddress).not.toEqual(CurrentpermanentAddress)

    })

    test("verify Employee have work experience or not ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnWorkExperience()
        let TotalExperience = await EmployeeDirectory.getWorkExperience()
        if (TotalExperience === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No records available")
        } else {
            console.debug("Employee have work Experience")
        }
    })
    test("Verify Work Experience  Toggle Behavior", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.verifyCollapseIsHidden(4)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnWorkExperience()
        await EmployeeDirectory.verifyCollapseIsHidden(4)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnWorkExperience()
        await EmployeeDirectory.verifyCollapseIsHidden(4)

    })

    test("verify Employee have Education or not ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnWorkExperience()
        let EmloyeeEducation = await EmployeeDirectory.getEmployeeEducation()
        if (EmloyeeEducation === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No records available")
        } else {
            console.debug("Employee have Education")
        }
    })

    test("Verify Education  Toggle Behavior", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.verifyCollapseIsHidden(5)
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnEducation()
        await EmployeeDirectory.verifyCollapseIsHidden(5)

        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnEducation()
        await EmployeeDirectory.verifyCollapseIsHidden(5)

    })

    test("verify Employee have Dependents or not ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnDependents()
        let EmloyeeEducation = await EmployeeDirectory.getEmployeeDependents()
        if (EmloyeeEducation === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No records available")
        } else {
            console.debug("Employee have Dependents")
        }
    })

    test("Verify Dependents  Toggle Behavior", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.verifyCollapseIsHidden(6)
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnDependents()
        await EmployeeDirectory.verifyCollapseIsHidden(6)
        await page.waitForTimeout(1000)
        await EmployeeDirectory.clickOnDependents()
        await EmployeeDirectory.verifyCollapseIsHidden(6)

    })

    test("Navigating to the Employee Directory tab > Assigned Assets ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnAssignedAssets()
        await EmployeeDirectory.waitforLoaderToDisappear()
        expect(EmployeeDirectory.refreshbutton).toBeVisible()
        let AssignedAsset = await EmployeeDirectory.getAssignedAssets()
        if (AssignedAsset === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No records available")
        } else {
            expect(EmployeeDirectory.AssignedAsset.first()).toBeVisible()
        }
    })

    // test("Verify Assigned assets show according to itemPer page selected", async ({ page }) => {
    //     await EmployeeDirectory.clickOnEmployeeCard()
    //     await EmployeeDirectory.waitforLoaderToDisappear()
    //     await EmployeeDirectory.clickOnAssignedAssets()
    //     await EmployeeDirectory.waitforLoaderToDisappear()
    //     let AssignedAsset = await EmployeeDirectory.getAssignedAssets()
    //     if (AssignedAsset === 0) {
    //         var Norecord = await EmployeeDirectory.noRecord(1)
    //         expect(Norecord).toEqual("No records available")
    //     } else {
    //         let ItemPerpage = await EmployeeDirectory.getItemPerPage()
    //         expect(AssignedAsset).toEqual(ItemPerpage);
    //         expect(await EmployeeDirectory.PreviousButton.isDisabled()).toBeTruthy();
    //         const pageCountText = await EmployeeDirectory.pageCount.textContent();
    //         const [currentPage, totalPageCount] = AssetHelper.extractPageCount(pageCountText || '');
    //         const difference = totalPageCount - currentPage;
    //         const pageTotalCount = totalRecordCount * difference;
    //         for (let i = 0; i < difference; i++) {
    //             await EmployeeDirectory.NextButton.click();
    //         }



    //     }

    // })





    test("navigate to Employee Access Block ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnEmployeeAccessSubTab()
        expect(await EmployeeDirectory.CurrentStatus.isVisible())
        expect(await EmployeeDirectory.Status.isVisible())
    })

    test("Verify validation message appears in Employee access status  in  Employee Access Block ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnEmployeeAccessSubTab()
        await EmployeeDirectory.EmployeeAccessSubmitButton.click()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.EmployeeAccessStatus)
        expect(tooltipMessage).toEqual(SELECT_ITEM)
    })

    test("should update employee access status to BLOCKED successfully ", async ({ page }) => {
        let CardName = await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnEmployeeAccessSubTab()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'BLOCKED (Temporally Disable)')
        await EmployeeDirectory.EmployeeAccessSubmitButton.click()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toEqual('Employee access updated successfully')
        await EmployeeDirectory.waitforLoaderToDisappear()

        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'BLOCKED (Temporally Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        let CardsTitle: string[] = [];
        for (let i = 0; i < TotalEmployeecount; i++) {
            let cardTitle = await EmployeeDirectory.Employee_Directory_cards_title.nth(i).textContent();
            if (cardTitle !== null && cardTitle.trim() !== '') {
                CardsTitle.push(cardTitle.trim());
            }
        }
        console.debug(CardsTitle);
        expect(CardsTitle).toContain(CardName);
    })
    test("should update BLOCKED employee status to VERIFIED and confirm card appears in list", async ({ page }) => {
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'BLOCKED (Temporally Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let cardsCount = await EmployeeDirectory.Card.count()
        if (cardsCount === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No records available")
        } else {
            let CardName = await EmployeeDirectory.Card.nth(1).textContent()
            await EmployeeDirectory.Card.nth(1).click()
            await EmployeeDirectory.clickOnEmployeeAccessSubTab()
            await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'VERIFIED')
            await EmployeeDirectory.LeftOutSubmitbutton.click()
            let message = await EmployeeDirectory.toastMessage()
            expect(message).toEqual("Employee access updated successfully")
            await EmployeeDirectory.waitforLoaderToDisappear()
            let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
            let CardsTitle: string[] = [];
            for (let i = 0; i < TotalEmployeecount; i++) {
                let cardTitle = await EmployeeDirectory.Employee_Directory_cards_title.nth(i).textContent();
                if (cardTitle !== null && cardTitle.trim() !== '') {
                    CardsTitle.push(cardTitle.trim());
                }
            }
            console.debug(CardsTitle);
            expect(CardsTitle).toContain(CardName);
        }

    })
    test.skip("should update BLOCKED employee to LEFTOUT and verify card appears in LEFTOUT list", async ({ page }) => {
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'BLOCKED (Temporally Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let cardsCount = await EmployeeDirectory.Card.count()
        if (cardsCount === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No records available")
        } else {
            let CardName = await EmployeeDirectory.Card.nth(1).textContent()
            await EmployeeDirectory.Card.nth(1).click()
            await EmployeeDirectory.clickOnEmployeeAccessSubTab()
            await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'LEFTOUT (Permanently Disable)')
            await EmployeeDirectory.LeftOutDate.click()
            await EmployeeDirectory.leftoutcurrentDate.click()
            await EmployeeDirectory.LeftOutCommentField.fill("Thank you..")
            await EmployeeDirectory.LeftOutSubmitbutton.click()
            let message = await EmployeeDirectory.toastMessage()
            expect(message).toEqual("Employee access updated successfully")
            await EmployeeDirectory.waitforLoaderToDisappear()
            await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'LEFTOUT (Permanently Disable)')
            await EmployeeDirectory.waitforLoaderToDisappear()
            let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
            let CardsTitle: string[] = [];
            for (let i = 0; i < TotalEmployeecount; i++) {
                let cardTitle = await EmployeeDirectory.Employee_Directory_cards_title.nth(i).textContent();
                if (cardTitle !== null && cardTitle.trim() !== '') {
                    CardsTitle.push(cardTitle.trim());
                }
            }
            console.debug(CardsTitle);
            expect(CardsTitle).toContain(CardName);
        }

    })

    test("should Display LeftOut Fields When Status Is LeftOut ", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnEmployeeAccessSubTab()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'LEFTOUT (Permanently Disable)')
        await expect(EmployeeDirectory.LeftOutDate).toBeVisible()
        await expect(EmployeeDirectory.LeftOutCommentField).toBeVisible()
    })

    test("shouldShowValidationMessageWhenLeftOutDateIsEmpty", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnEmployeeAccessSubTab()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'LEFTOUT (Permanently Disable)')
        await EmployeeDirectory.LeftOutSubmitbutton.click()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.LeftOutDate)
        expect(tooltipMessage).toEqual(FILL_FIELD)
    })

    test("shouldShowValidationMessageWhenLeftOutCommentIsEmpty", async ({ page }) => {
        await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnEmployeeAccessSubTab()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'LEFTOUT (Permanently Disable)')
        await EmployeeDirectory.LeftOutDate.click()
        await EmployeeDirectory.leftoutcurrentDate.click()
        await EmployeeDirectory.LeftOutSubmitbutton.click()
        let tooltipMessage = await EmployeeDirectory.getValidationMessage(EmployeeDirectory.LeftOutCommentField)
        expect(tooltipMessage).toEqual(FILL_FIELD)
    })

    test.skip("should Disable Employee Access Permanently", async ({ page }) => {
        let CardName = await EmployeeDirectory.clickOnEmployeeCard()
        await EmployeeDirectory.waitforLoaderToDisappear()
        await EmployeeDirectory.clickOnEmployeeAccessSubTab()
        await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'LEFTOUT (Permanently Disable)')
        await EmployeeDirectory.LeftOutDate.click()
        await EmployeeDirectory.leftoutcurrentDate.click()
        await EmployeeDirectory.LeftOutCommentField.fill("Thank you..")
        await EmployeeDirectory.LeftOutSubmitbutton.click()
        let message = await EmployeeDirectory.toastMessage()
        expect(message).toEqual("Employee access updated successfully")
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'LEFTOUT (Permanently Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let { TotalCards, TotalEmployeecount } = await EmployeeDirectory.totalCardsCount()
        let CardsTitle: string[] = [];
        for (let i = 0; i < TotalEmployeecount; i++) {
            let cardTitle = await EmployeeDirectory.Employee_Directory_cards_title.nth(i).textContent();
            if (cardTitle !== null && cardTitle.trim() !== '') {
                CardsTitle.push(cardTitle.trim());
            }
        }
        console.debug(CardsTitle);
        expect(CardsTitle).toContain(CardName);
    })


    test("should show no records or fail to update left out employee status to verified", async ({ page }) => {
        await EmployeeDirectory.optionSelection(EmployeeDirectory.SelectStatus, 'LEFTOUT (Permanently Disable)')
        await EmployeeDirectory.waitforLoaderToDisappear()
        let cardsCount = await EmployeeDirectory.leftOutCards.count()
        if (cardsCount === 0) {
            var Norecord = await EmployeeDirectory.noRecord(1)
            expect(Norecord).toEqual("No records available")
        } else {
            await EmployeeDirectory.leftOutCards.nth(1).click()
            await EmployeeDirectory.clickOnEmployeeAccessSubTab()
            await EmployeeDirectory.optionSelection(EmployeeDirectory.EmployeeAccessStatus, 'VERIFIED')
            await EmployeeDirectory.LeftOutSubmitbutton.click()
            let message = await EmployeeDirectory.toastMessage()
            expect(message).toEqual("Failed to update the employee status. Please try again after some time")
        }
    })


    //   test("Performance Evaluation subtab ", async ({ page }) => {
    //     await EmployeeDirectory.performance_Evaluation()
    //})

})
