import { test, expect } from '@playwright/test'
import * as path from 'path';
import * as fs from 'fs';
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { DummyResume, actualSuccessMessage } from '../utils/constants';
import { Polices_caeliusPolicies } from '../pages/Polices_caeliusPolicies';
import { CommonUtils } from '../utils/commonUtils';
import { Helper } from '../utils/Helper';

let Polices_caeliusPolicy: Polices_caeliusPolicies
let utils: CommonUtils;
let helper: Helper;

test.describe.serial("'Caelius Polices'", () => {
    let randomTitle: string;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        utils = new CommonUtils;
        helper = new Helper(page);

        Polices_caeliusPolicy = new Polices_caeliusPolicies(page)
        await Polices_caeliusPolicy.expandTab();
        await Polices_caeliusPolicy.naviagateToPolicyEditorPage();

    });

    test("Create a new policy with file upload and verify success message @smoke", async ({ page, context, browser }) => {

        await Polices_caeliusPolicy.clickOnAddPolicyBttn();
        const date = await Polices_caeliusPolicy.getTodayDate();
        randomTitle = "WorkFromHome" + await utils.generateRandomInteger(2)
        await Polices_caeliusPolicy.fillAddPolicyForm({
            title: randomTitle,
            validFrom: date,
            description: 'This policy outlines WFH guidelines.'
        });

        await utils.uploadAndVerifyFile(DummyResume, page, Polices_caeliusPolicy.submitBttn);
        await Polices_caeliusPolicy.waitforLoaderToDisappear();
        const successMessage = await Polices_caeliusPolicy.toastMessage();
        expect(successMessage).toEqual(actualSuccessMessage);

    });

    test("Update Policy @smoke", async ({ page, context, browser }) => {

        const lastRecod = await helper.fetchLastRecordView('40');
        console.log(lastRecod);
        console.log(randomTitle);


        await Polices_caeliusPolicy.clickOnLastEditBttn();
        const updatedTitle = randomTitle + "Update";
        await Polices_caeliusPolicy.fillTitle(updatedTitle);
        await Polices_caeliusPolicy.clickOnSubmitBttn();
        const successMessage = await Polices_caeliusPolicy.toastMessage();

        expect(successMessage).toEqual(actualSuccessMessage);

    });

//     test("Download the Policy.  @smoke", async ({ page, context, browser }) => {

//         await Polices_caeliusPolicy.naviagateToPolicyViewerPage();
//         await helper.fetchLastRecordView('40');
//         // const downloadPath = await utils.downloadAndVerifyFile(page, async () => {
        
//             await Polices_caeliusPolicy.clickOnViewLink();
//         // Step 1: Get the iframe
//         const frameElementHandle = await page.waitForSelector('div.modal-pdf iframe');
//         const frame = await frameElementHandle.contentFrame();

//         // Step 2: Get download button inside iframe
//         if (frame) {
//             const downloadButton = frame.locator('cr-icon-button#save');
//             await downloadButton.click();
//         } else {
//             throw new Error('Could not find the iframe content.');
//         }


//         // expect(path.extname(downloadPath)).toBe('.pdf');

// });


    test("Download the Policy.  @smoke", async ({ page, context }) => {

        await Polices_caeliusPolicy.naviagateToPolicyViewerPage();
        await helper.fetchLastRecordView('40');
        await Polices_caeliusPolicy.clickOnViewLink();

        // Step 1: Wait for iframe
        const frameElementHandle = await page.waitForSelector("iframe[src='blob:https://topuptalent.com/8ed987ba-16d3-4ccd-aebf-4d9b22d32b2c']");

        // Step 2: Switch to iframe
        const frame = await frameElementHandle.contentFrame();
        if (!frame) throw new Error('Iframe not found or not loaded');

        // Step 3: Click download button inside iframe
        const downloadButton = frame.locator('cr-icon-button#save');
        await downloadButton.click();


    });
});
