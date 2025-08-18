import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData/testData.json';
import { Reimbursement } from '../pages/Reimbursement';
import { BasePage } from '../pages/Basepage';
import { FILL_FIELD, SELECT_ITEM } from '../utils/constants';


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

    test("TC_MR_001 Reimbursement page", async ({ page }) => {
        await reimbursement.verifySubtabs();
    });
    test("TC_MR_002 Reimbursement page Collapse", async ({ page }) => {
        await reimbursement.collapseReimburmentTab();
    });


    test("TC_MR_003 Reimbursement Request page", async ({ page }) => {
        await expect(reimbursement.Header).toBeVisible();
        let Header = await reimbursement.Header.textContent();
        expect(Header).toEqual('Reimbursement Requests');
        await expect(reimbursement.Table).toBeVisible();
    });

    test("TC_MR_004 Search Valid Data", async ({ page }) => {
        let name = await reimbursement.getExistingnameFromTable()
        await reimbursement.searchExistingData(name);
    });


    test("TC_MR_005 Search Invalid Data", async ({ page }) => {
        let name = await reimbursement.generateRandomString(6);
        await reimbursement.SearchBar.pressSequentially(name);
        await expect(reimbursement.No_Record).toBeVisible();
        let No_Record = await reimbursement.No_Record.textContent();
        expect(No_Record).toStrictEqual("No Record Available");
    });


    //  To-do:
    test("TC_MR_006 Sorting", async ({ page }) => {

        await reimbursement.clickOnRowHeader(1);
        var ascData = await reimbursement.getRowdata(1);
        await reimbursement.verifyRowsSorting(ascData, "asc");
        await reimbursement.clickOnRowHeader(1);
        var descData = await reimbursement.getRowdata(1);
        await reimbursement.verifyRowsSorting(descData, "desc");

        await reimbursement.clickOnRowHeader(3);
        var ascData = await reimbursement.getRowdata(3);
        await reimbursement.verifyRowsSorting(ascData, "asc");
        await reimbursement.clickOnRowHeader(3);
        var descData = await reimbursement.getRowdata(3);
        await reimbursement.verifyRowsSorting(descData, "desc");

        await reimbursement.clickOnRowHeader(4);
        var ascData = await reimbursement.getRowdata(4);
        await reimbursement.verifyRowsSorting(ascData, "asc");
        await reimbursement.clickOnRowHeader(4);
        var descData = await reimbursement.getRowdata(4);
        await reimbursement.verifyRowsSorting(descData, "desc");


        await reimbursement.clickOnRowHeader(6);
        var ascData = await reimbursement.getRowdata(6);
        await reimbursement.verifyRowsSorting(ascData, "asc");
        await reimbursement.clickOnRowHeader(6);
        var descData = await reimbursement.getRowdata(6);
        await reimbursement.verifyRowsSorting(descData, "desc");

    });




    test("TC_MR_013 Reimbursement Request", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await expect(page.locator(".card")).toBeVisible();
    });

    test("TC_MR_014 Back to Reimbursement", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Back_to_Reimbursement.click();
        await reimbursement.waitforLoaderToDisappear();
        await expect(page.locator(".card")).toBeHidden();
        let Header = await reimbursement.Header.textContent();
        expect(Header).toEqual('Reimbursement Requests');

    });
    test("should_show_travel_specific_fields_for_travel_expense_claim_type", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        expect(reimbursement.From).toBeVisible();
        expect(reimbursement.To).toBeVisible();
        expect(reimbursement.vechileType).toBeVisible();
        expect(reimbursement.distance).toBeVisible();

    })

    test("should_validate_all_required_fields_in_reimbursement_request_form", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Sumbit_button.click();
        let message = await reimbursement.getValidationMessage(reimbursement.Reimbursement_Type);
        expect(message).toEqual(SELECT_ITEM);

        await reimbursement.Reimbursement_Type.selectOption("Travel Expense");
        await reimbursement.Sumbit_button.click();
        let message1 = await reimbursement.getValidationMessage(reimbursement.Invoice_Date);
        expect(message).toEqual(SELECT_ITEM);

        let currentDate = await reimbursement.getCurrentDate();
        await reimbursement.Invoice_Date.fill(currentDate);
        await reimbursement.Sumbit_button.click();
        let message2 = await reimbursement.getValidationMessage(reimbursement.Invoice_Number);
        expect(message2).toEqual(FILL_FIELD);

        let SerialNumber = await reimbursement.generateRandomString(6);
        await reimbursement.Invoice_Number.fill(SerialNumber);
        await reimbursement.Sumbit_button.click();
        let message3 = await reimbursement.getValidationMessage(reimbursement.From_Date);
        expect(message3).toEqual(FILL_FIELD);

        currentDate = await reimbursement.getCurrentDate(1);
        await reimbursement.From_Date.fill(currentDate);
        await reimbursement.Sumbit_button.click();
        let message4 = await reimbursement.getValidationMessage(reimbursement.To_Date);
        expect(message2).toEqual(FILL_FIELD);

        await reimbursement.To_Date.fill(currentDate);
        await reimbursement.Sumbit_button.click();
        let message5 = await reimbursement.getValidationMessage(reimbursement.Receipt);
        expect(message5).toEqual("Please select a file.");

        await reimbursement.Receipt.setInputFiles("./files/screenshot.png");
        await reimbursement.Sumbit_button.click();
        let message6 = await reimbursement.getValidationMessage(reimbursement.From);
        expect(message6).toEqual(FILL_FIELD);

        let text = await reimbursement.generateRandomString(8);
        await reimbursement.From.fill(text);
        await reimbursement.Sumbit_button.click();
        let message7 = await reimbursement.getValidationMessage(reimbursement.To);
        expect(message7).toEqual(FILL_FIELD);

        text = await reimbursement.generateRandomString(8);
        await reimbursement.To.fill(text);
        await reimbursement.Sumbit_button.click();
        let message8 = await reimbursement.getValidationMessage(reimbursement.vechileType);
        expect(message8).toEqual(SELECT_ITEM);


        await reimbursement.vechileType.selectOption("Two Wheeler");
        await reimbursement.Sumbit_button.click();
        let message9 = await reimbursement.getValidationMessage(reimbursement.distance);
        expect(message9).toEqual(FILL_FIELD);

        let distance = await reimbursement.generateRandomInteger(4);
        await reimbursement.distance.fill(distance);
        await reimbursement.Sumbit_button.click();
        let message10 = await reimbursement.getValidationMessage(reimbursement.Amount);
        expect(message10).toEqual(FILL_FIELD);

        let amount = await reimbursement.generateRandomInteger(4);
        await reimbursement.Amount.fill(amount);
        await reimbursement.Sumbit_button.click();
        let message11 = await reimbursement.getValidationMessage(reimbursement.Comment_Field);
        expect(message11).toEqual(FILL_FIELD);


    });


    test("should_submit_travel_expense_reimbursement_when_all_fields_are_valid", async ({ page }) => {
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

    test("should reset all reimbursement form fields and hide conditional inputs", async ({ page }) => {
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

    test("should_show_error_for_unsupported_file_type_in_receipt_upload", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Receipt.setInputFiles("./files/abc.docx");
        let message = await reimbursement.toastMessage();
        expect(message).toEqual("Unsupported file type. Please upload a valid document, PDF, JPG, PNG and JPEG.")
    });


    test("should_show_error_for_file_size_exceeding_limit_in_receipt_upload", async ({ page }) => {
        await reimbursement.clickOnReimbursementRequestButton();
        await reimbursement.Back_to_Reimbursement.click();
        await reimbursement.waitforLoaderToDisappear();
        expect(await reimbursement.Header.textContent()).toEqual('Reimbursement Requests');
        await expect(reimbursement.ReimbursementRequest).toBeVisible();

    });



    test("TC_MR_007 Withdrawal", async ({ page }) => {
        await reimbursement.withdrawal();
        await expect(reimbursement.Withdraw_popUp_body).toBeVisible();
    });
    test("TC_MR_008 Withdrawal Cross Button", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.cross_icon.click();
        await expect(reimbursement.Withdraw_popUp_body).toBeHidden();
    });
    test("TC_MR_009 Withdrawal Cancel Button", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.Cancel_button.click();
        await expect(reimbursement.Withdraw_popUp_body).toBeHidden();
    });
    test("TC_MR_010 Withdraw Empty Comment Field", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.Sumbit_button.click();
        let message = await reimbursement.getValidationMessage(reimbursement.Comment_Field);
        expect(message).toEqual(FILL_FIELD);
    });
    test("TC_MR_011 Withdraw View Link Functionality", async ({ page }) => {
        await reimbursement.withdrawal();
        await reimbursement.verifyXLSXDownload(page, async () => {
            await reimbursement.View_Link.click();
        });
    });
    test("TC_MR_012 Withdraw Fill All Mandatory Field", async ({ page }) => {
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
