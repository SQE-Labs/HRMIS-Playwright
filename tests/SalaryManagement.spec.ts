import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';
import { EXISTINGSERIALNUMBER_COLUMN } from '../utils/constants';
import { SalaryManagement } from '../pages/SalaryManagement';
import { CommonUtils } from '../utils/commonUtils';
import { Helper } from '../utils/Helper';

let salaryObj: SalaryManagement
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

        salaryObj = new SalaryManagement(page)
        await salaryObj.expandTab();
        await salaryObj.navigateToUploadSalaryTab();

    });

    test("Upload Salary Slip successfully", async ({ page }) => {
        await salaryObj.selectEmployeeType("REGULAR");
        await utils.uploadAndVerifyFile(EXISTINGSERIALNUMBER_COLUMN, page, salaryObj.submitButton);
        await salaryObj.selectMonth("August");
        await salaryObj.submitForm();
        const successToast = await salaryObj.toastMessage();
        await expect(successToast).toEqual("Successfully Uploaded!");
    });

});