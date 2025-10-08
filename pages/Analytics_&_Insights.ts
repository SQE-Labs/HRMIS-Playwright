import { BasePage } from "./Basepage";
import { expect, Locator, Page } from "@playwright/test";


export class Analytics_Insights extends BasePage {


    async navigateToUserRoleReport() {
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText("User's Role Report").click();
        await this.waitforLoaderToDisappear();
    }

    async navigateToAssetReport() {
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText('Asset Report').click();
        await this.waitforLoaderToDisappear();
    }

    async navigateToUserAttendanceReport() {
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText('Attendance Report').click();
        await this.waitforLoaderToDisappear();
    }

    async navigateToUserReimbursementReport() {
        await this.page.getByText('Analytics & Insights').click();
        await this.page.getByText('Reimbursement Report').click();
        await this.waitforLoaderToDisappear();
    }

}