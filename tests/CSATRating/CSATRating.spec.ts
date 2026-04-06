import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CSATRatingPage } from '../../pages/CSATRating';
import { MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD, CSAT_PROJECT_NAME, CSAT_TEAM_MEMBER_NAME } from '../../utils/constants';


test('@csat CSAT_EM_1 Verify Project Name and the associated employee is visible', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

  const csatRatingPage = new CSATRatingPage(page);
  await csatRatingPage.openCSATRatingPage();
  await csatRatingPage.manageSelectProject(CSAT_PROJECT_NAME);
  await csatRatingPage.verifyManageTeamMemberVisible(CSAT_TEAM_MEMBER_NAME);
});

test('@csat CSAT_EM_2 Verify Employee Name and the associated project is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

    const csatRatingPage = new CSATRatingPage(page);
    await csatRatingPage.openCSATRatingPage();
    await csatRatingPage.manageSelectEmployee(CSAT_TEAM_MEMBER_NAME);
    await csatRatingPage.verifyManageProjectVisible(CSAT_PROJECT_NAME);

});

test('@csat CSAT_EM_3 Verify updating project rating for an employee is successful', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

    const csatRatingPage = new CSATRatingPage(page);
    await csatRatingPage.openCSATRatingPage();
    await csatRatingPage.manageSelectProject(CSAT_PROJECT_NAME);
    await csatRatingPage.verifyManageTeamMemberVisible(CSAT_TEAM_MEMBER_NAME);
    await csatRatingPage.manageUpdateRating(4);
    await page.waitForTimeout(4000);
    
});
test('@csat CSAT_EM_4 Verify adding CSAT rating for an employee is successful', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);
    const csatRatingPage = new CSATRatingPage(page);
    await csatRatingPage.openCSATRatingPage();
    await csatRatingPage.addCSATSelectProject(CSAT_PROJECT_NAME, 5); 
});