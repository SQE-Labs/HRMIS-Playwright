import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Employee_Onboarding } from '../../pages/Employee_Onboarding';
import { Employee_CreateEmployee } from '../../pages/Employee_CreateEmployee';
import {
  DummyResume,
  AadharNumber,
  panCardNumber,
  PassportNumber,
  MaritalStatus,
  dob,
  phoneNumber,
  alternateNumber,
  relationShip,
  presentAddress,
  permanentAddress,
} from '../../utils/constants';

test.describe('Employee Onboarding E2E', () => {
  test('Pre-join invite → Yopmail verify → submit onboard form @smoke @reg', async ({
    page,
    context,
  }) => {
    test.setTimeout(300_000);

    const loginPage = new LoginPage(page);
    const onboarding = new Employee_Onboarding(page);

    let employeeEmail = '';
    let firstName = '';
    let lastName = '';

    await test.step('Login and open Onboarding Form', async () => {
      await loginPage.loginAsRole();
      await onboarding.expandEmployeeOnboardingTab();
      await onboarding.naviagateToOnboardingForm();
    });

    await test.step('Send pre-join invite to random Yopmail', async () => {
      employeeEmail = `${await onboarding.generateRandomString()}@yopmail.com`;
      firstName = await onboarding.generateRandomString(6);

      await onboarding.clickOnInviteEmployeeBttn();
      await onboarding.fillOnboardingForm(employeeEmail, firstName);
      await onboarding.uploadAndVerifyFile(DummyResume, page, onboarding.submitButton);
      await onboarding.waitforLoaderToDisappear();

      const toast = await onboarding.toastMessage();
      expect(toast).toEqual('Onboarding welcome mail sent.');
    });

    await test.step('Open Yopmail, open invite mail, click verification link', async () => {
      const yopmailUrl = `https://yopmail.com/?${employeeEmail}`;
      const onboardTab = await onboarding.openYopmailandNavigaeToVerifyPopup(
        yopmailUrl,
        context,
        employeeEmail
      );

      const createEmployeeForm = new Employee_CreateEmployee(onboardTab);
      lastName = await createEmployeeForm.generateRandomString();
      const alternateName = await createEmployeeForm.generateRandomString();
      const joiningDate = await createEmployeeForm.getTodayDate();

      await test.step('Verify personal email and fill all onboarding tabs', async () => {
        await createEmployeeForm.enterPersonalEmailToVerifyandSubmit(employeeEmail);
        await createEmployeeForm.fillCreateEmployeeForm(
          firstName,
          lastName,
          'A+ve',
          AadharNumber,
          panCardNumber,
          PassportNumber,
          MaritalStatus,
          dob,
          joiningDate,
          phoneNumber,
          alternateNumber,
          relationShip,
          alternateName,
          presentAddress,
          permanentAddress
        );
        await createEmployeeForm.waitforLoaderToDisappear();

        const successMessage = await createEmployeeForm.getSuccessMessageTxt();
        expect(successMessage).toEqual('Thank you!');
      });
    });
  });
});
