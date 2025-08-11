import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { DummyResume, AadharNumber, panCardNumber, PassportNumber, MaritalStatus, doj, dob, phoneNumber, alternateNumber, relationShip, presentAddress, permanentAddress, domain, expectedSuccessMessageITApproval, expectedSuccessMessageHRMISAccountCreated } from '../utils/constants';
import { Employee_Onboarding } from '../pages/Employee_Onboarding';
import { Employee_CreateEmployee } from '../pages/Employee_CreateEmployee';
import { Employee_ITApproval } from '../pages/Employee_ITApproval';
import { Employee_HRSetup } from '../pages/Employee_HRSetup';



let EmployeeOnboarding: Employee_Onboarding
let Employee_CreateEmployeForm: Employee_CreateEmployee
let Employee_ITApprovalTable: Employee_ITApproval
let Employe_HRSetupTable: Employee_HRSetup

test.describe.serial("'Employee Management module'", () => {
    let Employee_emailID: string;
    let Emplpoyee_nameObj: string;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        EmployeeOnboarding = new Employee_Onboarding(page)
        await EmployeeOnboarding.expandEmployeeOnboardingTab();
        await EmployeeOnboarding.naviagateToOnboardingForm();

    });

    test("Submit Onboarding form ", async ({ page, context, browser }) => {


        Employee_emailID = await EmployeeOnboarding.generateRandomString() + "@yopmail.com";
        console.log(Employee_emailID);

        Emplpoyee_nameObj = await EmployeeOnboarding.generateRandomString(6);
        console.log(Emplpoyee_nameObj);

        await EmployeeOnboarding.clickOnInviteEmployeeBttn();
        await EmployeeOnboarding.fillOnboardingForm(Employee_emailID, Emplpoyee_nameObj);
        await EmployeeOnboarding.uploadAndVerifyFile(DummyResume, page, EmployeeOnboarding.submitButton)
        await EmployeeOnboarding.waitforLoaderToDisappear();
        let message = await EmployeeOnboarding.toastMessage();
        expect(message).toEqual("Onboarding welcome mail sent");
    });


    test(" Verify and submit the hire is able to submit onboard form", async ({ page, context, browser }) => {
        // 2nd test case
        await page.waitForTimeout(5000);
        const yopmailUrl = `https://yopmail.com/?${Employee_emailID}`;
        const newTab = await EmployeeOnboarding.openYopmailandNavigaeToVerifyPopup(yopmailUrl, context, Employee_emailID);

        Employee_CreateEmployeForm = new Employee_CreateEmployee(newTab)
        const lname = await Employee_CreateEmployeForm.generateRandomString();
        const alternateName = await Employee_CreateEmployeForm.generateRandomString();


        const latestJoiningDate = await Employee_CreateEmployeForm.getTodayDate();

        await Employee_CreateEmployeForm.enterPersonalEmailToVerifyandSubmit(Employee_emailID);
        await Employee_CreateEmployeForm.fillCreateEmployeeForm(Emplpoyee_nameObj, lname, 'A+ve', AadharNumber, panCardNumber, PassportNumber, MaritalStatus, dob, latestJoiningDate, phoneNumber, alternateNumber, relationShip, alternateName, presentAddress, permanentAddress);
        await EmployeeOnboarding.waitforLoaderToDisappear();

        const successMessage = await Employee_CreateEmployeForm.getSuccessMessageTxt();
        await page.waitForTimeout(2000);
        expect(successMessage).toEqual("Thank you!");

    });

    test(" verify that new onboarding form appear under IT approval", async ({ page, context, browser }) => {
        Employee_ITApprovalTable = new Employee_ITApproval(page)
        await Employee_ITApprovalTable.navigateToITApproval();
        const lastRecordName = await Employee_ITApprovalTable.fetchLastRecordView('40');
        expect(lastRecordName).toEqual(Emplpoyee_nameObj);

        // click on view link and approve tab
        await Employee_ITApprovalTable.clickOnViewLink();
        await Employee_ITApprovalTable.clickOnApproveTab();

        const finalEmail = Emplpoyee_nameObj + domain;
        // const finalEmail = "knUvew@caeliusconsulting.com";
        await Employee_ITApprovalTable.fillEmailID(finalEmail);

        await Employee_ITApprovalTable.clickOnSubmitBttn();
        await Employee_ITApprovalTable.waitforLoaderToDisappear();
        let successMessage = await Employee_ITApprovalTable.toastMessage();
        expect(successMessage).toEqual(expectedSuccessMessageITApproval);

        // await page.pause();


    })


    test("Verify that Profile appear under the HRSetup and Verify that Profile update successfully", async ({ page, context, browser }) => {

        Employe_HRSetupTable = new Employee_HRSetup(page);
        await Employe_HRSetupTable.navigateToHRSetup();
        const HRaaprovedname = await Employe_HRSetupTable.fetchLastRecordView('40');
        expect(HRaaprovedname).toEqual(Emplpoyee_nameObj);

        await Employe_HRSetupTable.clickOnViewLink();
        await Employe_HRSetupTable.clickOnApproveTab();
        // await page.pause();

        await Employe_HRSetupTable.fillHrApprovalForm(page, {
            department: "APIs",
            designation: "Customer Success Manager",
            assignManager: "Elon Mask",
            leaveManager: "Autom Mation User",
            employeeType: "REGULAR",
            employeeSubType: "Full time"
        });


        await Employe_HRSetupTable.clickApprovBttn();
        // await page.pause()

        let HRMISsuccessMessage = await Employe_HRSetupTable.toastMessage();
        expect(HRMISsuccessMessage).toEqual(expectedSuccessMessageHRMISAccountCreated);


    })


});