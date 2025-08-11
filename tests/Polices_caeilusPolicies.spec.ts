import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import { Employee_Management } from '../pages/Employee_Management';
import testData from '../testData/testData.json';
import { DummyResume, actualSuccessMessage } from '../utils/constants';
import { Polices_caeliusPolicies } from '../pages/Polices_caeliusPolicies';
import { CommonUtils } from '../utils/commonUtils';




let Polices_caeliusPolicy: Polices_caeliusPolicies
let utils: CommonUtils;

test.describe.serial("'Caelius Polices'", () => {
    let randomTitle;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        utils = new CommonUtils;
        Polices_caeliusPolicy = new Polices_caeliusPolicies(page)
        await Polices_caeliusPolicy.expandTab();
        await Polices_caeliusPolicy.naviagateToPolicyEditorPage();

    });

    test("Create a new policy with file upload and verify success message", async ({ page, context, browser }) => {

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

    })

    test("Update Policy", async ({ page, context, browser }) => {



    })


});