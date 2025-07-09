import { Page, Locator, expect } from "@playwright/test";
import { AssetManagementTab } from "./Asset_Management_Tab";
import { Loader } from "../components/loaders";
import { BasePage } from "./Basepage";
import { OverView } from "./Asset_OverView";
import { text } from "stream/consumers";
import { count } from "console";
import fs from "fs";


export class Reimbursement {
    private Reimbursement_Tab: Locator
    private Reimburement_subtab: Locator
    private subtabs: string[]
    private Reimbursement_Page: Locator
    private Header: Locator
    private Table: Locator
    private loader: Loader
    private SearchBar: Locator
    private No_Record: Locator
    private Withdraw: Locator
    private cross_icon: Locator
    private Withdraw_popUp_body: Locator
    private Cancel_button: Locator
    private Comment_Field: Locator
    private Sumbit_button: Locator
    private View_Link: Locator
    private ReimbursementRequest: Locator
    private Back_to_Reimbursement: Locator
    private Reimbursement_Type: Locator
    private Invoice_Date: Locator
    private Invoice_Number: Locator
    private To_Date: Locator
    private From_Date: Locator
    private Receipt: Locator
    private Amount: Locator
    private From: Locator
    private To: Locator
    private Reset_Button: Locator
    private page: Page
    private nextButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.Reimbursement_Tab = page.locator('//a[text() = "My Reimbursements"]')
        this.Reimburement_subtab = page.locator('//a[text() = "My Reimbursements"]/..//ul//li')
        this.subtabs = [
            "Reimbursement Requests",
            "Approve Reimbursements",
            "Download Reimbursement ",
            "Bulk Reimbursement Payments",
            "Reimbursement History"
        ]
        this.Reimbursement_Page = page.locator('//a[text() = "Reimbursement Requests"]')
        this.Header = page.locator("div>h1")
        this.loader = new Loader(page)
        this.Table = page.locator("div.table-responsive")
        this.SearchBar = page.getByPlaceholder("Search By Reimbursement Type")
        this.No_Record = page.locator("div>h4")
        this.Withdraw = page.locator("(//a[text() = 'Withdraw'])").first()
        this.cross_icon = page.locator('//button[@class = "btn-close"]')
        this.Withdraw_popUp_body = page.locator(".modal-body")
        this.Cancel_button = page.locator("(//button[@type = 'button'])[2]")
        this.Comment_Field = page.locator("//textarea[@name = 'comment']")
        this.Sumbit_button = page.locator("(//button[@type = 'submit'])")
        this.View_Link = page.locator("//a[text() = 'view']")
        this.ReimbursementRequest = page.locator("//a[text() = 'Reimbursement Request']")
        this.Back_to_Reimbursement = page.locator(".brand-color")
        this.Reimbursement_Type = page.locator("#reimbursementType")
        this.Invoice_Date = page.locator("(//input[@type = 'date'])[1]")
        this.Invoice_Number = page.locator("(//input[@name= 'invoiceNo'])")
        this.From_Date = page.locator("(//input[@type = 'date'])[2]")
        this.To_Date = page.locator("(//input[@type = 'date'])[3]")
        this.Receipt = page.locator("#file-input")
        this.Amount = page.locator("(//input[@name= 'reimbursementAmount'])")
        this.From = page.locator("(//input[@name= 'fromPlace'])")
        this.To = page.locator("(//input[@name= 'toPlace'])")
        this.Reset_Button = page.locator("//button[text() = 'Reset']")
        this.nextButton = page.locator("//a[text() = 'Next']");

    }

    async ReimbursementTab() {
        try {
            await this.Reimbursement_Tab.click();
            await expect(this.Reimbursement_Tab).toBeVisible();
        } catch (error) {
            console.error('Reimbursement_Tab Does not expanded', error);
        }
    }
    async Reimbursement_Expand() {
        await this.ReimbursementTab();
        try {
            const expanded = await this.Reimbursement_Tab.getAttribute('aria-expanded');
            await expect(this.Reimbursement_Tab).toHaveAttribute('aria-expanded', 'true');
            return expanded === 'true';
        } catch (error) {
            console.error('Error Checking if My Reimbursement tab is expandable', error);
            return false;
        }
    }

    async verifySubtabs() {
        // TC_MR_001
        await this.Reimbursement_Expand();
        const title = await this.Reimburement_subtab.allTextContents();
        expect(title.length).toBe(this.subtabs.length);
        let allMatched = true;
        for (let i = 0; i < title.length; i++) {
            if (title[i] !== this.subtabs[i]) {
                console.log(`Mismatch found at index ${i}: Expected "${this.subtabs[i]}", but got "${title[i]}"`);
                allMatched = false;
            }
        }
        expect(allMatched).toBe(true);
        if (allMatched) {
            console.log("All subtab titles matched successfully!");
        } else {
            console.log("Some subtab titles did not match.");
            return false;
        }
    }

    async collapsesReimbursementTab() {
        await this.Reimbursement_Tab.click();
        await this.page.waitForTimeout(2000);
        try {
            await this.Reimbursement_Tab.click();
            await expect(this.Reimbursement_Tab).toBeVisible();
            console.log('Reimbursement_Tab collapse Succesfully');
        } catch (error) {
            console.error('Reimbursement_Tab Does not collapse', error);
        }
    }

    async collapsesReimbursement_Tab(): Promise<boolean> {
        // TC_MR_002
        await this.collapsesReimbursementTab();
        try {
            const collapsed = await this.Reimbursement_Tab.getAttribute('aria-expanded');
            await expect(this.Reimbursement_Tab).toHaveAttribute('aria-expanded', 'false');
            return collapsed === 'false';
        } catch (error) {
            console.error('Error Checking if collapsesReimbursement_Tab tab is collapse ', error);
            return false;
        }
    }

    async Reimbursement_Request_page() {
        // TC_MR_003
        await this.Reimbursement_Expand();
        await this.page.waitForTimeout(2000);
        await this.Reimbursement_Page.click();
        await expect(this.loader.getThreeDotLoader()).not.toBeAttached();
        await expect(this.Header).toBeVisible();
        let Header = await this.Header.textContent();
        await expect(Header).toEqual('Reimbursement Requests');
        await expect(this.Table).toBeVisible();
    }
    async Search_Valid_Data() {
        // Valid Data ---- TC_MR_004
        await this.Reimbursement_Request_page();
        await this.page.waitForSelector("div.table-responsive");
        let Valid_Data = await this.page.locator("table>tbody>tr:nth-child(1)>td:nth-child(2)").textContent();
        if (Valid_Data) {
            Valid_Data = Valid_Data.trim();
            console.debug(Valid_Data);
            await this.SearchBar.pressSequentially(Valid_Data);
            await this.page.waitForTimeout(2000);
            await expect(this.page.locator("table>tbody>tr:nth-child(2)")).toBeVisible();
            await expect(this.page.locator("table>tbody>tr:nth-child(1)>td:nth-child(2)")).toHaveText(Valid_Data);
        } else {
            console.error("No data found in the specified cell.");
        }
    }

    async Search_InValid_Data() {
        // InValid Data ---- TC_MR_005
        await this.Reimbursement_Request_page();
        await this.page.waitForSelector("div.table-responsive");
        let Valid_Data = 'QWERTYU';
        await this.SearchBar.pressSequentially(Valid_Data);
        await expect(this.No_Record).toBeVisible();
        let No_Record = await this.No_Record.textContent();
        expect(No_Record).toStrictEqual("No Record Available");
    }

    async Sorting() {
        await this.Reimbursement_Request_page();
        await this.page.waitForTimeout(3000);
        let beforeSorting = await this.page.locator('tr>td:nth-child(6)').allTextContents();
        expect(beforeSorting.length).toBeGreaterThan(1);
        // Click to sort in ascending order
        await this.page.locator(`tr>th:nth-child(6)`).click();
        await this.page.waitForTimeout(1000);
        let afterSortingAsc = await this.page.locator(`tr>td:nth-child(6)`).allTextContents();
        expect(afterSortingAsc.length).toBe(beforeSorting.length);
        let isSortedAsc = true;
        for (let i = 0; i < afterSortingAsc.length - 1; i++) {
            if (Number(afterSortingAsc[i]) > Number(afterSortingAsc[i + 1])) {
                isSortedAsc = false;
                break;
            }
        }
        expect(isSortedAsc).toBe(true);

        // Click again to sort in descending order
        await this.page.locator(`tr>th:nth-child(6)`).click();
        await this.page.waitForTimeout(1000);
        let afterSortingDesc = await this.page.locator(`tr>td:nth-child(6)`).allTextContents();
        expect(afterSortingDesc.length).toBe(beforeSorting.length);

        let isSortedDesc = true;
        for (let i = 0; i < afterSortingDesc.length - 1; i++) {
            if (Number(afterSortingDesc[i]) < Number(afterSortingDesc[i + 1])) {
                isSortedDesc = false;
                break;
            }
        }
        expect(isSortedDesc).toBe(true);
    }

    async withdrawal() {
        // Step 1: Go to the Reimbursement Request page
        await this.Reimbursement_Request_page();

        // Step 2: Loop through pages to find and click Withdraw
        while (true) {
            const isWithdrawVisible = await this.Withdraw.isVisible();

            if (isWithdrawVisible) {
                // Found the Withdraw button on the current page
                await this.Withdraw.click();
                await expect(this.Withdraw_popUp_body).toBeVisible();
                return;
            }

            const isNextEnabled = await this.nextButton.isEnabled();
            if (!isNextEnabled) {
                // Reached the last page and Withdraw not found
                throw new Error("Withdraw button not found on any page.");
            }

            // Click next and wait for the page to update
            await this.nextButton.click();
            await this.page.waitForTimeout(1000);
        }
    }

    async withdrawal_cross_button() {
        // TC_MR_008
        await this.withdrawal();
        await this.page.waitForTimeout(2000);
        await this.cross_icon.click();
        await this.page.waitForTimeout(500);
        await expect(this.Withdraw_popUp_body).toBeHidden();
    }

    async withdrawal_Cancel_button() {
        // TC_MR_009
        await this.withdrawal();
        await this.page.waitForTimeout(2000);
        await this.Cancel_button.click();
        await this.page.waitForTimeout(500);
        await expect(this.Withdraw_popUp_body).toBeHidden();
    }

    async Withdraw_Empty_comment_Field() {
        // TC_MR_010
        await this.withdrawal();
        await this.page.waitForTimeout(2000);
        await this.Sumbit_button.click();
        await this.page.waitForTimeout(500);
        let Comment_Field = await this.Comment_Field;
        var tooltipMessage = await Comment_Field.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log(tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');
    }

    async Withdraw_View_Link_Functionality() {
        // TC_MR_011
        await this.withdrawal();
        await this.page.waitForTimeout(2000);
        try {
            const [download] = await Promise.all([
                this.page.waitForEvent("download", { timeout: 5000 }),
                this.View_Link.click()
            ]);

            const downloadedFile = download.suggestedFilename();
            console.log("Downloaded file:", downloadedFile);

            // Define file save path
            const downloadPath = `C:\\Users\\SQE Labs\\Desktop\\HRMIS-Playwright\\Download\\${downloadedFile}`;
            await download.saveAs(downloadPath);

            // Verify the file exists
            expect(fs.existsSync(downloadPath)).toBeTruthy();
            if (fs.existsSync(downloadPath)) {
                console.log(`File successfully downloaded: ${downloadPath}`);
            } else {
                throw new Error("Error: Downloaded file not found in expected location!");
            }
        } catch (error) {
            console.error("Error during file download:", error);
            expect(error).toBeFalsy();
        }
    }

    async Withdraw_Fill_All_Mandatory_Field() {
        // TC_MR_012
        await this.withdrawal();
        await this.page.waitForTimeout(2000);
        await this.Comment_Field.fill('My Expenses....');
        await this.Sumbit_button.click();
        await this.page.waitForTimeout(500);
        await expect(this.page.locator(".Toastify__toast-body")).toBeVisible();
        let Success_Message = (await this.page.locator(".Toastify__toast-body").textContent());
        expect(Success_Message).toEqual('Successfully Status Changed to Withdraw');
        await this.page.waitForTimeout(1000);
        await expect(this.Withdraw_popUp_body).toBeHidden();
    }

    async Reimbursement_Request() {
        // TC_MR_013
        await this.Reimbursement_Expand();
        await this.page.waitForTimeout(2000);
        await this.Reimbursement_Page.click();
        await this.page.waitForLoadState('networkidle');
        await this.ReimbursementRequest.click();
        await this.page.waitForTimeout(500);
        await expect(this.page.locator(".card")).toBeVisible();
    }

    async BacktoReimbursement() {
        // TC_MR_014
        await this.Reimbursement_Expand();
        await this.page.waitForTimeout(2000);
        await this.Reimbursement_Page.click();
        await this.page.waitForLoadState('networkidle');
        await this.ReimbursementRequest.click();
        await this.page.waitForTimeout(500);
        await expect(this.page.locator(".card")).toBeVisible();

        await this.Back_to_Reimbursement.click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator(".card")).toBeHidden();
        await expect(this.Table).toBeVisible();
        let Header = await this.Header.textContent();
        await expect(Header).toEqual('Reimbursement Requests');
    }

    async Reimbursemnt_Request_page() {
        // TC_MR_015
        await this.Reimbursement_Expand();
        await this.page.waitForTimeout(2000);
        await this.Reimbursement_Page.click();
        await this.page.waitForLoadState('networkidle');
        await this.ReimbursementRequest.click();
        await this.page.waitForTimeout(500);
        await this.Sumbit_button.click();
        //  Reimbursement_Type Field left blank
        var Reimbursement_Type = await this.Reimbursement_Type;
        var tooltipMessage = await Reimbursement_Type.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log("Reimbursement_Type :- ", tooltipMessage);
        expect(tooltipMessage).toBe('Please select an item in the list.');

        // Invoice_Date field empty TC_MR_016
        await this.Reimbursement_Type.selectOption("Internet Claim");
        await this.Sumbit_button.click();
        var Invoice_Date = await this.Invoice_Date;
        tooltipMessage = await Invoice_Date.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Invoice_Date :- ', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // Invoice_no. field Empty TC_MR_017
        let today = new Date();
        let currentDate = today.toISOString().split('T')[0];
        console.log(currentDate);
        await this.Invoice_Date.fill(currentDate);
        await this.Sumbit_button.click();
        var Invoice_Number = await this.Invoice_Number;
        tooltipMessage = await Invoice_Number.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Invoice_Number :- ', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // Form_Date field Empty TC_MR_018
        const usedSerialNumbers = new Set();

        let serialNumber = 0;
        do {
            serialNumber = Math.floor(10000 + Math.random() * 90000);
        } while (usedSerialNumbers.has(serialNumber));

        // Store the serial number to prevent repetition
        usedSerialNumbers.add(serialNumber);
        await this.Invoice_Number.fill(serialNumber.toString());
        await this.Sumbit_button.click();
        var Form_Date = await this.From_Date;
        tooltipMessage = await this.From_Date.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('From_Date :- ', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // To_Date field Empty TC_MR_019
        today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        let previousDate = yesterday.toISOString().split('T')[0];
        console.log(previousDate);
        await this.From_Date.fill(previousDate);
        await this.Sumbit_button.click();
        var To_Date = await this.To_Date;
        tooltipMessage = await this.To_Date.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('To_Date :- ', tooltipMessage);
        expect(tooltipMessage).toBe('Please fill out this field.');

        // Reciept Field Empty  TC_MR_20
        await this.To_Date.fill(currentDate);
        await this.Sumbit_button.click();
        var Receipt = await this.Receipt;
        tooltipMessage = await this.Receipt.evaluate(el => (el as HTMLInputElement).validationMessage);
        console.log('Receipt :- ', tooltipMessage);
        expect(tooltipMessage).toBe('Please select a file.');
    }
}
