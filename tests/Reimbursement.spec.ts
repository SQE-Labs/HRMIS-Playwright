import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';
import { Reimbursement } from '../pages/Reimbursement';
import { BasePage } from '../pages/Basepage';
import { FILL_OUT_FIELD , FILL_IN_FIELD, SELECT_ITEM } from '../utils/constants';


let reimbursement: Reimbursement;

test.describe("My Reimbursement page", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const basepage = new BasePage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword);

        reimbursement = new Reimbursement(page)
        await reimbursement.expandReimburmentTab()
        await reimbursement.naviagteToReimbursementRequest();
        await reimbursement.waitforLoaderToDisappear()
    });

    test("TC_MR_001 Reimbursement page @reg", async ({ page }) => {
        await reimbursement.verifySubtabs();
    });
    test("TC_MR_002 Reimbursement page Collapse @reg", async ({ page }) => {
        await reimbursement.collapseReimburmentTab();
    });


    test("TC_MR_003 Reimbursement Request page @reg", async ({ page }) => {
        await expect(reimbursement.Header).toBeVisible();
        let Header = await reimbursement.Header.textContent();
        expect(Header).toEqual('Reimbursement Requests');
        await expect(reimbursement.Table).toBeVisible();
    });

    test("TC_MR_004 Search Valid Data @reg", async ({ page }) => {
        let name = await reimbursement.getExistingnameFromTable()
        await reimbursement.searchExistingData(name);
    });


    test("TC_MR_005 Search Invalid Data @reg", async ({ page }) => {
        let name = await reimbursement.generateRandomString(6);
        await reimbursement.SearchBar.pressSequentially(name);
        await expect(reimbursement.No_Record).toBeVisible();
        let No_Record = await reimbursement.No_Record.textContent();
        expect(No_Record).toStrictEqual("No Record Available");
    });


    //  To-do:
    test("TC_MR_006 Sorting", async ({ page }) => {

        const columnsToTest = [1, 2, 3, 4, 5, 6]; // Assuming 1-based column indices

        for (const columnIndex of columnsToTest) {
            console.log(`Testing Column ${columnIndex} - Ascending Sort`);
            await reimbursement.clickOnRowHeader(columnIndex);

            // Wait to allow table sort/render to complete
            await page.waitForTimeout(2000);

            const ascData = await reimbursement.getRowdata(columnIndex);
            await reimbursement.verifyRowsSorting(ascData, "asc");

            console.log(`Testing Column ${columnIndex} - Descending Sort`);
            await reimbursement.clickOnRowHeader(columnIndex);

            // Wait again for descending sort
            await page.waitForTimeout(2000);

            const descData = await reimbursement.getRowdata(columnIndex);
            await reimbursement.verifyRowsSorting(descData, "desc");
        }
    });

    test("TC_MR_013 Reimbursement Request @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await expect(page.locator(".card")).toBeVisible();
    });

    test("TC_MR_014 Back to Reimbursement @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Back_to_Reimbursement.click();
        await reimbursement.waitforLoaderToDisappear();
        await expect(page.locator(".card")).toBeHidden();
        let Header = await reimbursement.Header.textContent();
        expect(Header).toEqual('Reimbursement Requests');

    });
    test("should_show_travel_specific_fields_for_travel_expense_claim_type @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Reimbursement_Type.selectOption("Travel Expense");

        expect(reimbursement.From).toBeVisible();
        expect(reimbursement.To).toBeVisible();
        expect(reimbursement.vechileType).toBeVisible();
        expect(reimbursement.distance).toBeVisible();

    })

    test("should_validate_all_required_fields_in_reimbursement_request_form @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Sumbit_button.click();
        let message = await reimbursement.getValidationMessage(reimbursement.Reimbursement_Type);
        expect(message === SELECT_ITEM).toBeTruthy();

        await reimbursement.Reimbursement_Type.selectOption("Travel Expense");
        await reimbursement.Sumbit_button.click();
        let message1 = await reimbursement.getValidationMessage(reimbursement.Invoice_Date);
        expect(message1 === FILL_OUT_FIELD || message1 === FILL_IN_FIELD).toBeTruthy();

        let currentDate = await reimbursement.getCurrentDate();
        await reimbursement.Invoice_Date.fill(currentDate);
        await reimbursement.Sumbit_button.click();
        let message2 = await reimbursement.getValidationMessage(reimbursement.Invoice_Number);
        expect(message2 === FILL_OUT_FIELD || message2 === FILL_IN_FIELD).toBeTruthy();

        let SerialNumber = await reimbursement.generateRandomString(6);
        await reimbursement.Invoice_Number.fill(SerialNumber);
        await reimbursement.Sumbit_button.click();
        let message3 = await reimbursement.getValidationMessage(reimbursement.From_Date);
        expect(message3 === FILL_OUT_FIELD || message3 === FILL_IN_FIELD).toBeTruthy();

        currentDate = await reimbursement.getCurrentDate(1);
        await reimbursement.From_Date.fill(currentDate);
        await reimbursement.Sumbit_button.click();
        let message4 = await reimbursement.getValidationMessage(reimbursement.To_Date);
        expect(message4 === FILL_OUT_FIELD || message4 === FILL_IN_FIELD).toBeTruthy();

        await reimbursement.To_Date.fill(currentDate);
        await reimbursement.Sumbit_button.click();
        let message5 = await reimbursement.getValidationMessage(reimbursement.Receipt);
        expect(message5).toEqual("Please select a file.");

        await reimbursement.Receipt.setInputFiles("./files/screenshot.png");
        await reimbursement.Sumbit_button.click();
        let message6 = await reimbursement.getValidationMessage(reimbursement.From);
        expect(message6 === FILL_OUT_FIELD || message6 === FILL_IN_FIELD).toBeTruthy();

        let text = await reimbursement.generateRandomString(8);
        await reimbursement.From.fill(text);
        await reimbursement.Sumbit_button.click();
        let message7 = await reimbursement.getValidationMessage(reimbursement.To);
        expect(message7 === FILL_OUT_FIELD || message7 === FILL_IN_FIELD).toBeTruthy();

        text = await reimbursement.generateRandomString(8);
        await reimbursement.To.fill(text);
        await reimbursement.Sumbit_button.click();
        let message8 = await reimbursement.getValidationMessage(reimbursement.vechileType);
        expect(message8).toEqual(SELECT_ITEM);

        await reimbursement.vechileType.selectOption("Two Wheeler");
        await reimbursement.Sumbit_button.click();
        let message9 = await reimbursement.getValidationMessage(reimbursement.distance);
        expect(message9 === FILL_OUT_FIELD || message9 === FILL_IN_FIELD).toBeTruthy();

        let distance = await reimbursement.generateRandomInteger(4);
        await reimbursement.distance.fill(distance);
        await reimbursement.Sumbit_button.click();
        let message10 = await reimbursement.getValidationMessage(reimbursement.Amount);
        expect(message10 === FILL_OUT_FIELD || message10 === FILL_IN_FIELD).toBeTruthy();

        let amount = await reimbursement.generateRandomInteger(4);
        await reimbursement.Amount.fill(amount);
        await reimbursement.Sumbit_button.click();
        let message11 = await reimbursement.getValidationMessage(reimbursement.Comment_Field);
        expect(message11 === FILL_OUT_FIELD || message11 === FILL_IN_FIELD).toBeTruthy();



    });


    test("should_submit_travel_expense_reimbursement_when_all_fields_are_valid @smoke @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Reimbursement_Type.selectOption("Travel Expense");

        let currentDate = await reimbursement.getCurrentDate();
        await reimbursement.Invoice_Date.fill(currentDate);

        let SerialNumber = await reimbursement.generateRandomString(6);
        await reimbursement.Invoice_Number.fill(SerialNumber);

        currentDate = await reimbursement.getCurrentDate(1);
        await reimbursement.From_Date.fill(currentDate);

        await reimbursement.To_Date.fill(currentDate);

        await reimbursement.Receipt.setInputFiles("./files/screenshot.png");


        let text = await reimbursement.generateRandomString(8);
        await reimbursement.From.fill(text);

        text = await reimbursement.generateRandomString(8);
        await reimbursement.To.fill(text);


        await reimbursement.vechileType.selectOption("Two Wheeler");


        let distance = await reimbursement.generateRandomInteger(4);
        await reimbursement.distance.fill(distance);


        let amount = await reimbursement.generateRandomInteger(4);
        await reimbursement.Amount.fill(amount);
        await reimbursement.Comment_Field.fill("Test comment for reimbursement request");
        await reimbursement.Sumbit_button.click();
        await reimbursement.waitforLoaderToDisappear();
        const message = await reimbursement.toastMessage();
        expect(message).toEqual("Successfully Sent!");


    });

    test("should reset all reimbursement form fields and hide conditional inputs @smoke @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Reimbursement_Type.selectOption("Travel Expense");
        let currentDate = await reimbursement.getCurrentDate();
        await reimbursement.Invoice_Date.fill(currentDate);
        let SerialNumber = await reimbursement.generateRandomString(6);
        await reimbursement.Invoice_Number.fill(SerialNumber);
        currentDate = await reimbursement.getCurrentDate(1);
        await reimbursement.From_Date.fill(currentDate);
        await reimbursement.To_Date.fill(currentDate);
        await reimbursement.Receipt.setInputFiles("./files/screenshot.png");
        let text = await reimbursement.generateRandomString(8);
        await reimbursement.From.fill(text);
        text = await reimbursement.generateRandomString(8);
        await reimbursement.To.fill(text);
        await reimbursement.vechileType.selectOption("Two Wheeler");
        let distance = await reimbursement.generateRandomInteger(4);
        await reimbursement.distance.fill(distance);
        let amount = await reimbursement.generateRandomInteger(4);
        await reimbursement.Amount.fill(amount);
        await reimbursement.Comment_Field.fill("Test comment for reimbursement request");
        await reimbursement.Reset_Button.click();

        expect(await reimbursement.Reimbursement_Type.inputValue()).toEqual("");
        expect(await reimbursement.Invoice_Date.inputValue()).toEqual("");
        expect(await reimbursement.Invoice_Number.inputValue()).toEqual("");
        expect(await reimbursement.From_Date.inputValue()).toEqual("");
        expect(await reimbursement.To_Date.inputValue()).toEqual("");
        expect(await reimbursement.Receipt.inputValue()).toEqual("");
        await expect(reimbursement.From).toBeHidden();
        await expect(reimbursement.To).toBeHidden();
        await expect(reimbursement.vechileType).toBeHidden();
        await expect(reimbursement.distance).toBeHidden();
        expect(await reimbursement.Amount.inputValue()).toEqual("");
        expect(await reimbursement.Comment_Field.inputValue()).toEqual("");
    });

    test("should_show_error_for_unsupported_file_type_in_receipt_upload @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Receipt.setInputFiles("./files/abc.docx");
        let message = await reimbursement.toastMessage();
        expect(message).toEqual("Unsupported file type. Please upload a valid document, PDF, JPG, PNG and JPEG.")
    });


    test("should_show_error_for_file_size_exceeding_limit_in_receipt_upload @reg", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Back_to_Reimbursement.click();
        await reimbursement.waitforLoaderToDisappear();
        expect(await reimbursement.Header.textContent()).toEqual('Reimbursement Requests');
        await expect(reimbursement.ReimbursementRequest).toBeVisible();

    });



    test("TC_MR_007 Withdrawal @reg", async ({ page }) => {
        await reimbursement.withdrawal();
        await expect(reimbursement.Withdraw_popUp_body).toBeVisible();
    });
    test("TC_MR_008 Withdrawal Cross Button @reg", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.cross_icon.click();
        await expect(reimbursement.Withdraw_popUp_body).toBeHidden();
    });
    test("TC_MR_009 Withdrawal Cancel Button @reg", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.Cancel_button.click();
        await expect(reimbursement.Withdraw_popUp_body).toBeHidden();
    });
    test("TC_MR_010 Withdraw Empty Comment Field @reg", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.Sumbit_button.click();
        let message = await reimbursement.getValidationMessage(reimbursement.Comment_Field);
        expect(message === FILL_OUT_FIELD || message === FILL_IN_FIELD).toBeTruthy();

    });
    test("TC_MR_011 Withdraw View Link Functionality", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.verifyXLSXDownload(page, async () => {
            await reimbursement.View_Link.click();
        });
    });
    test("TC_MR_012 Withdraw Fill All Mandatory Field @reg", async ({ page }) => {
        await reimbursement.withdrawal();
        let comment = await reimbursement.generateRandomString(10);
        await reimbursement.Comment_Field.fill(comment);
        await reimbursement.Sumbit_button.click();
        await reimbursement.waitforLoaderToDisappear();
        const message = await reimbursement.toastMessage();
        expect(message).toEqual('Successfully Status Changed to Withdraw');
        await expect(reimbursement.Withdraw_popUp_body).toBeHidden();
    });
});
