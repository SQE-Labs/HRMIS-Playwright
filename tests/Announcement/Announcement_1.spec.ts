import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage';
import testData from '../../testData/testData.json';
import { Announcement1 } from '../../pages/Announcement_1';

let announcement: Announcement1;


    test.beforeEach(async ({ page }) => {
        const loginObj = new LoginPage(page);

        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );

        announcement = new Announcement1(page);
        await announcement.Announcementclick();
    });

    test('Create Announcement', async () => {
        await announcement.fillCreateAnnouncementForm();
        await announcement.submitAnnouncement();
    });
