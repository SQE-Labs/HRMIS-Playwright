import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { MyProfilePage } from '../../pages/MyProfile';
import testData from '../../testData/testData.json';

test('Login and verify My Profile page opens', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

  const myProfilePage = new MyProfilePage(page);
  await myProfilePage.openMyProfile();

  await expect(page).toHaveURL(/dashboard\/myProfile/i);
  await myProfilePage.verifyGeneralInformationTabVisible();
});

test('HRMIS_EM_2 Verify Change Password popup opens on My Profile', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

  const myProfilePage = new MyProfilePage(page);
  await myProfilePage.openMyProfile();
  await myProfilePage.clickChangePassword();
  await myProfilePage.verifyChangePasswordPopupVisible();
});

test('HRMIS_EM_3 Verify Change Password functionality and restore original password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myProfilePage = new MyProfilePage(page);

  const email = testData.SuperUser.UserEmail;
  const originalPassword = testData.SuperUser.UserPassword;
  const temporaryPassword = 'Temp@1234';

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

