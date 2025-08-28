import { test, expect } from '@playwright/test'
import * as path from 'path';
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

test.describe.serial("Salary Management", () => {
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

   
});