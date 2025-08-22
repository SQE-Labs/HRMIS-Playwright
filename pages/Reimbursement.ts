import { Page, Locator, expect } from "@playwright/test";
import { Loader } from "../components/loaders";
import fs from "fs";
import { AssetHelper } from "../utils/AssetHelpers";
import { BasePage } from "./Basepage";


export class Reimbursement extends BasePage {
    public Reimbursement_Tab: Locator
    public Reimburement_subtab: Locator
    public subtabs: string[]
    public Reimbursement_Page: Locator
    public Header: Locator
    public Table: Locator

    public SearchBar: Locator
    public No_Record: Locator
    public Withdraw: Locator
    public cross_icon: Locator
    public Withdraw_popUp_body: Locator
    public Cancel_button: Locator
    public Comment_Field: Locator
    public Sumbit_button: Locator
    public View_Link: Locator
    public ReimbursementRequest: Locator
    public Back_to_Reimbursement: Locator
    public Reimbursement_Type: Locator
    public Invoice_Date: Locator
    public Invoice_Number: Locator
    public To_Date: Locator
    public From_Date: Locator
    public Receipt: Locator
    public Amount: Locator
    public From: Locator
    public To: Locator
    public Reset_Button: Locator
    public nextButton: Locator;
    public vechileType: Locator;
    public distance: Locator;


    constructor(page: Page) {
        super(page);
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
        this.vechileType = page.locator("#vehicleType");
        this.distance = page.locator("(//input[@name= 'distance'])");

    }

    async expandReimburmentTab(): Promise<void> {
        await AssetHelper.expandIfCollapsed(this.Reimbursement_Tab);
    }
    async isExpanded(): Promise<boolean> {
        return await AssetHelper.isExpanded(this.Reimbursement_Tab);
    }
    async collapseReimburmentTab(): Promise<void> {
        await AssetHelper.collapseIfExpanded(this.Reimbursement_Tab);
    }
    async isCollapsed(): Promise<boolean> {
        return await AssetHelper.isCollapsed(this.Reimbursement_Tab);
    }

    async navigateToreimbursementTab() {

    }

    async verifySubtabs() {
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

    async naviagteToReimbursementRequest() {
        await this.Reimbursement_Page.click();
        await this.waitforLoaderToDisappear();
    }

    async getExistingnameFromTable(): Promise<string> {
        const name = await this.page.locator("table>tbody>tr:nth-child(1)>td:nth-child(2)").textContent();
        return name ? name.trim() : "";
    }
    async searchExistingData(data: string) {
        await this.SearchBar.fill(data);
        await this.page.waitForTimeout(2000);
        const isVisible = await this.page.locator(`table>tbody>tr>td:nth-child(2):has-text("${data}")`).first().isVisible();
        expect(isVisible).toBeTruthy();
        if (isVisible) {
            console.log(`Data "${data}" found in the table.`);
        } else {
            console.error(`Data "${data}" not found in the table.`);
        }
    }

    async clickOnRowHeader(columnIndex: number) {
        const headerIcon = this.page.locator(`tr > th:nth-child(${columnIndex}) > img`);
        await headerIcon.waitFor({ state: 'visible' });
        await headerIcon.click();

        // Add a short wait to allow sorting animation/data update
        await this.page.waitForTimeout(2000);
    }


    async getRowdata(columnIndex: number): Promise<string[]> {
        // Wait for at least one cell in the desired column to appear
        await this.page.waitForSelector(`tbody > tr > td:nth-child(${columnIndex})`);

        const rows = await this.page.locator('tbody > tr');
        const columnData: string[] = [];

        const rowCount = await rows.count();

        if (rowCount === 0) {
            console.warn("No data rows found in <tbody>.");
            return [];
        }

        for (let i = 0; i < rowCount; i++) {
            const cell = rows.nth(i).locator(`td:nth-child(${columnIndex})`);
            await cell.waitFor({ state: 'visible' });
            const text = await cell.textContent();
            columnData.push((text ?? '').trim());
        }

        console.log(`Column ${columnIndex} data:`, columnData);
        return columnData;
    }



    async withdrawal() {
        while (true) {
            const isWithdrawVisible = await this.Withdraw.isVisible();
            if (isWithdrawVisible) {
                // Found the Withdraw button on the current page
                await this.Withdraw.click();
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


    async clickOnReimbursementRequestButton() {
        await this.ReimbursementRequest.click();
        await this.waitforLoaderToDisappear();
    }


    async getCurrentDate(daysAgo: number = 0): Promise<string> {
        const today = new Date();

        // Subtract days if specified
        today.setDate(today.getDate() - daysAgo);

        const currentDate = today.toISOString().split('T')[0];
        console.log(`Date (${daysAgo} days ago):`, currentDate);

        return currentDate;
    }
}
