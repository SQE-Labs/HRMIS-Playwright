import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { MyProfilePage } from '../../pages/MyProfile';
import { MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD, MY_PROFILE_TEMP_PASSWORD, WORK_EXPERIENCE_TEST_DATA } from '../../utils/constants';

test('Login and verify My Profile page opens', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

  const myProfilePage = new MyProfilePage(page);
  await myProfilePage.openMyProfile();

  await expect(page).toHaveURL(/dashboard\/myProfile/i);
  await myProfilePage.verifyGeneralInformationTabVisible();
});

test('HRMIS_EM_2 Verify Change Password popup opens on My Profile', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

  const myProfilePage = new MyProfilePage(page);
  await myProfilePage.openMyProfile();
  await myProfilePage.clickChangePassword();
  await myProfilePage.verifyChangePasswordPopupVisible();
});



test('HRMIS_EM_3 Verify Change Password functionality and restore original password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myProfilePage = new MyProfilePage(page);

  const email = MY_PROFILE_USER_EMAIL;
  const originalPassword = MY_PROFILE_USER_PASSWORD;
  const temporaryPassword = MY_PROFILE_TEMP_PASSWORD;

  await loginPage.validLogin(email, originalPassword);
  await myProfilePage.openMyProfile();
  await myProfilePage.clickChangePassword();
  await myProfilePage.fillChangePasswordForm(originalPassword, temporaryPassword, temporaryPassword);
  await myProfilePage.submitChangePassword();

  await expect(page.locator('input[type="email"]')).toBeVisible({ timeout: 10000 });

  await loginPage.validLogin(email, originalPassword);
  await expect(page.getByText('Something went wrong')).toBeVisible({ timeout: 10000 });

  await loginPage.validLogin(email, temporaryPassword);
  await myProfilePage.openMyProfile();
  await myProfilePage.clickChangePassword();
  await myProfilePage.fillChangePasswordForm(temporaryPassword, originalPassword, originalPassword);
  await myProfilePage.submitChangePassword();

  await expect(page.locator('input[type="email"]')).toBeVisible({ timeout: 10000 });

  await loginPage.validLogin(email, originalPassword);
  await expect(page.locator('img[alt="Caelius Consulting Logo"]')).toBeVisible({ timeout: 10000 });
});

test('HRMIS_EM_4 Verify General Information accordions are visible', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

  const myProfilePage = new MyProfilePage(page);
  await myProfilePage.openMyProfile();
  await myProfilePage.verifyGeneralAccordionsPresent();

  await myProfilePage.expandAccordion(myProfilePage.basicInfoAccordion);
  await myProfilePage.expandAccordion(myProfilePage.workAccordion);
  await myProfilePage.expandAccordion(myProfilePage.personalDetailsAccordion);
  await myProfilePage.expandAccordion(myProfilePage.workExperienceAccordion);
});

test('HRMIS_EM_5 Verify Add and Delete Work Experience on My Profile', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

  const myProfilePage = new MyProfilePage(page);
  await myProfilePage.openMyProfile();
  await myProfilePage.openWorkExperienceSection();

  await myProfilePage.clickAddWorkExperience();
  await myProfilePage.fillWorkExperienceForm(WORK_EXPERIENCE_TEST_DATA);
  await myProfilePage.submitWorkExperienceForm();
  await myProfilePage.verifyWorkExperienceRowExists(WORK_EXPERIENCE_TEST_DATA.title);
  await myProfilePage.deleteWorkExperienceRow(WORK_EXPERIENCE_TEST_DATA.title);
  await myProfilePage.verifyWorkExperienceRowNotExists(WORK_EXPERIENCE_TEST_DATA.title);
});