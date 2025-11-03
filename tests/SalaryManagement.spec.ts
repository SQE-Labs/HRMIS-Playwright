import { test, expect } from '@playwright/test'
import { BasePage } from '../pages/Basepage';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';
import { SalaryManagement } from '../pages/SalaryManagement';
import { CommonUtils } from '../utils/commonUtils';
import { Helper } from '../utils/Helper';
import * as constants from "../utils/constants";

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

    test("Upload Salary Slip successfully @smoke", async ({ page }) => {
        await salaryObj.selectEmployeeType("REGULAR");
        await utils.uploadAndVerifyFile(testData.EXISTINGSERIALNUMBER_COLUMN, page, salaryObj.submitButton);
        await salaryObj.selectMonth("August");
        await salaryObj.submitForm();
        const successToast = await salaryObj.toastMessage();
        await expect(successToast).toEqual("Successfully Uploaded!");
    });

    test ("Verify the Reset functionality @reg, @eti", async({page})=>{
        await salaryObj.selectEmployeeType("REGULAR");
        await utils.uploadAndVerifyFile(testData.EXISTINGSERIALNUMBER_COLUMN, page, salaryObj.submitButton);
        await salaryObj.selectMonth("August");
        await salaryObj.resetButton.click();

        await page.waitForLoadState()

        const resetEmployeeType = await salaryObj.employeeTypeDropdown.inputValue();
        const resetMonth = await salaryObj.monthDropdown.inputValue();

        // Assert the fields are cleared / reset
        expect(resetEmployeeType).toBe("");
        expect(resetMonth).toBe(""); 
    })

    test("Verify the validation tooltip of Salary Management Tab @reg, @eti", async({page})=>{
        // step 1: Leaving all field blank and getting validation tooltip
        await salaryObj.submitForm();
        await salaryObj.verifyTooltipMessage(salaryObj.employeeTypeDropdown, constants.PLEASE_SELECT_ITEM_TOOLTIP)

        // step 2: Verify the tooltip for salary slip field 
        await salaryObj.selectEmployeeType("REGULAR");
        await salaryObj.submitForm();
        await salaryObj.verifyTooltipMessage(salaryObj.salarySlipUpload, constants.PLEASE_SELECT_FILE_TOOLTIP)

        // step 3 verify tooltip for select month field 
        await utils.uploadAndVerifyFile(testData.EXISTINGSERIALNUMBER_COLUMN, page, salaryObj.submitButton);
        await salaryObj.submitForm();
        await salaryObj.verifyTooltipMessage(salaryObj.monthDropdown, constants.PLEASE_SELECT_ITEM_TOOLTIP)
    })

});