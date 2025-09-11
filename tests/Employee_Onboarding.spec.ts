import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { DummyResume, AadharNumber, panCardNumber, PassportNumber, MaritalStatus, doj, dob, phoneNumber, alternateNumber, relationShip, presentAddress, permanentAddress, domain, expectedSuccessMessageITApproval, expectedSuccessMessageHRMISAccountCreated, actualSuccessMessage } from '../utils/constants';
import { Employee_Onboarding } from '../pages/Employee_Onboarding';
import { Employee_CreateEmployee } from '../pages/Employee_CreateEmployee';
import { Employee_ITApproval } from '../pages/Employee_ITApproval';
import { Employee_HRSetup } from '../pages/Employee_HRSetup';
import { Employee_EmailSetup } from "../pages/Employee_EmailSetup";
import { CommonUtils } from '../utils/commonUtils';
import * as path from 'path';
import { Employee_EmailApprove } from "../pages/Employee_EmailApprove";



let EmployeeOnboarding: Employee_Onboarding
let Employee_CreateEmployeForm: Employee_CreateEmployee
let Employee_ITApprovalTable: Employee_ITApproval
let Employe_HRSetupTable: Employee_HRSetup
let Employee_EmailSetupPage: Employee_EmailSetup
let utils: CommonUtils;
let approveEmailSetupPage: Employee_EmailApprove
let suggestedNameTxt: string;




test.describe.serial("'Employee Onboarding module'", () => {
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

    test("Submit Onboarding form @smoke", async ({ page, context, browser }) => {


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


    test(" Verify and submit the hire is able to submit onboard form @smoke", async ({ page, context, browser }) => {
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

    test(" verify that new onboarding form appear under IT approval @smoke", async ({ page, context, browser }) => {
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


    test("Verify that Profile appear under the HRSetup and Verify that Profile update successfully @smoke", async ({ page, context, browser }) => {
        test.setTimeout(480000);
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
            employeeSubType: "Full time",
            employeeFlag: "CCI_INDIA"
        });


        await Employe_HRSetupTable.clickApprovBttn();
        // await page.pause()

        let HRMISsuccessMessage = await Employe_HRSetupTable.toastMessage();
        expect(HRMISsuccessMessage).toEqual(expectedSuccessMessageHRMISAccountCreated);
    })

    test("Fill Email Setup Request form @smoke", async ({ page }) => {
        const emailSetupPage = new Employee_EmailSetup(page);

        await emailSetupPage.navigateToEmailSetupPage();
        await emailSetupPage.clickOnAddrequestBttn();
        // await page.pause();

        const purposedEmailtxt = await emailSetupPage.generateRandomString(5)
            + domain;
        suggestedNameTxt = await emailSetupPage.generateRandomString(5)
        const personalEmailtxt = suggestedNameTxt + "@yopmail.com";
        const phoneNumberTxt = await emailSetupPage.generateRandomInteger(10);


        await emailSetupPage.fillAndSubmitForm({
            purposedEmail: purposedEmailtxt,
            suggestedName: suggestedNameTxt,
            personalEmail: personalEmailtxt,
            phoneNumber: phoneNumberTxt,
            comment: "Urgent email creation request."

        });
        await emailSetupPage.waitforLoaderToDisappear();
        const successMessage = await emailSetupPage.toastMessage();
        expect(successMessage).toEqual(actualSuccessMessage);

    });


    test("Export the excel @smoke", async ({ page }) => {
        const emailSetupPage = new Employee_EmailSetup(page);
        utils = new CommonUtils;
        await emailSetupPage.navigateToEmailSetupPage();
        const downloadPath = await utils.verifyXLSXDownload(page, async () => {
            await emailSetupPage.clickOnExportToExcelBttn();
        });
        expect(path.extname(downloadPath)).toBe('.xlsx');

    });

    test("View option @smoke", async ({ page }) => {
        approveEmailSetupPage = new Employee_EmailApprove(page);
        utils = new CommonUtils;
        await approveEmailSetupPage.navigateToApproveEmailSetupPage();
        await approveEmailSetupPage.clickViewByName(suggestedNameTxt);
        const suggestedEmailTxt = "Auto" + await approveEmailSetupPage.generateRandomString(5)
            + domain;
        await approveEmailSetupPage.fillApproveEmailForm(
            "Approved",
            suggestedEmailTxt,
            "StrongPassword123",
            "Approved email creation request"
        );

        const successMessage = await approveEmailSetupPage.toastMessage();
        expect(successMessage).toEqual("Successfully updated");
    });

});