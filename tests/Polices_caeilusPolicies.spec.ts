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

    test("Create a new policy with file upload and verify success message @smoke @reg", async ({ page, context, browser }) => {

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

    test("Update Policy @smoke @reg", async ({ page, context, browser }) => {

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
    // Cannot find the locator of Download pdf icon as it is embedded from the external source 
    // test("Download the Policy.  @smoke", async ({ page }) => {

    //     await Polices_caeliusPolicy.naviagateToPolicyViewerPage();
    //     await helper.fetchLastRecordView('40');
    //     const downloadPath = await utils.verifyXLSXDownload(page, async () => {

    //         await Polices_caeliusPolicy.clickOnViewLink();

    //     });

    //     expect(path.extname(downloadPath)).toBe('.pdf');

    // });
});

