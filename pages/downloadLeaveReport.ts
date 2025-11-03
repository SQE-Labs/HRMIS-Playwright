import { expect, Locator, Page } from "@playwright/test";
import * as constants from "../utils/constants";
import { BasePage } from "./Basepage";

export class DownloadLeaveReport extends BasePage{


    public toDateField: Locator;
    public fromDateField: Locator;
    public employeeFlag : Locator
    public resetBtn : Locator;
    public downloadButton: Locator;
    public heading : Locator;




    constructor(page: Page) {

        super(page);
        this.toDateField = page.locator("[name='toDate']");
        this.fromDateField = page.locator("[name='fromDate']");
        this.employeeFlag = page.locator("#employee-flag")
        this.resetBtn = page.getByText('Reset')
        this.downloadButton = page.getByRole('button', { name: 'Download' });
        this.heading = page.locator("//h1[text()='Download Leaves Report']")
    }

    async selectDates(fromDate: string, toDate: string) {
        // Both dates are in "dd/mm/yyyy" format
        const [fromDay, fromMonth, fromYear] = fromDate.split('/');
        const formattedFromDate = `${fromYear}-${fromMonth}-${fromDay}`; // yyyy-mm-dd

        const [toDay, toMonth, toYear] = toDate.split('/');
        const formattedToDate = `${toYear}-${toMonth}-${toDay}`; // yyyy-mm-dd

        // Wait and fill From Date
        await this.fromDateField.waitFor({ state: 'visible', timeout: 5000 });
        await this.fromDateField.fill(formattedFromDate);

        // Wait and fill To Date
        await this.toDateField.waitFor({ state: 'visible', timeout: 5000 });
        await this.toDateField.fill(formattedToDate);
    }

    async selectEmployeeFlag(type:string){
        await this.employeeFlag.selectOption(type)
    }
    async selectDates2(fromDate: string, toDate: string) {
        // Both dates are in "dd/mm/yyyy" format
        const [fromDay, fromMonth, fromYear] = fromDate.split('/');
        const formattedFromDate = `${fromMonth}-${fromDay}-${fromYear}`; // mm-dd-yyyy

        const [toDay, toMonth, toYear] = toDate.split('/');
        const formattedToDate = `${toMonth}-${toDay}-${toYear}`; // mm-dd-yyyy

        // Wait and fill From Date
        await this.fromDateField.waitFor({ state: 'visible', timeout: 5000 });
        await this.fromDateField.fill(formattedFromDate);

        // Wait and fill To Date
        await this.toDateField.waitFor({ state: 'visible', timeout: 5000 });
        await this.toDateField.fill(formattedToDate);
    }

    

}