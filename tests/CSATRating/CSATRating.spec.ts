import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CSATRatingPage } from '../../pages/CSATRating';
import { MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD, CSAT_PROJECT_NAME, CSAT_TEAM_MEMBER_NAME } from '../../utils/constants';

test('CSAT_EM_1 Verify Project Name and the associated employee is visible', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

  const csatRatingPage = new CSATRatingPage(page);
  await csatRatingPage.openCSATRatingPage();
  await csatRatingPage.selectProject(CSAT_PROJECT_NAME);
  await csatRatingPage.verifyTeamMemberVisible(CSAT_TEAM_MEMBER_NAME);
});

test('CSAT_EM_2 Verify Employee Name and the associated project is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

    const csatRatingPage = new CSATRatingPage(page);
    await csatRatingPage.openCSATRatingPage();
    await csatRatingPage.selectEmployee(CSAT_TEAM_MEMBER_NAME);
    await csatRatingPage.verifyProjectVisible(CSAT_PROJECT_NAME);

});