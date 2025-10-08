import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Analytics_Insights } from "../pages/Analytics_&_Insights";
import testData from "../testData/testData.json";

let analyticsInsights: Analytics_Insights;

test.describe("Analytics & Insights module", () => {
    test.beforeEach(async ({ page }) => {
        const loginObj = new LoginPage(page);
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );

        analyticsInsights = new Analytics_Insights(page);
        console.log(">> Starting test case : " + test.info().title);
    });

    test("HRMIS_2 , HRMIS_4 User Role Report functionality @smoke", async ({ page }) => {
        // Navigate to User Role Report page
        await analyticsInsights.navigateToUserRoleReport();
        // Verify Page elements
        expect(await page.getByPlaceholder('Search By Employee Name').isVisible()).toBeTruthy();
        expect(await page.locator('#department').isVisible()).toBeTruthy();
        expect(await page.locator('#selectedStatus').isVisible()).toBeTruthy();
        expect(await page.getByRole("heading", { name: "User's Role Report" }).isVisible()).toBeTruthy();
        expect(await page.getByText("S.No.").isVisible()).toBeTruthy();
        expect(await page.getByText("Employee Name").last().isVisible()).toBeTruthy();
        expect(await page.locator('//th[text() = "Email"]').isVisible()).toBeTruthy();
        expect(await page.getByText("Employee Type").isVisible()).toBeTruthy();
        expect(await page.locator('//th[text() = "Department"]').isVisible()).toBeTruthy();
        expect(await page.locator('//th[text() = "Designation"]').isVisible()).toBeTruthy();
        expect(await page.locator('//th[text() = "Roles"]').isVisible()).toBeTruthy();
        expect(await page.getByText("Action").last().isVisible()).toBeTruthy();

        // Verify Search functionality
        await page.getByPlaceholder('Search By Employee Name').fill('Vishal   Thakur')
        await analyticsInsights.waitforLoaderToDisappear();
        var name = await page.locator('tr>td').nth(1).textContent();
        expect(name).toEqual('Vishal   Thakur');
        console.log(name);
    });

    test("HRMIS_4 Reimbursement Report functionality @smoke", async ({ page }) => {
        // Navigate to Asset Report page
        await analyticsInsights.navigateToAssetReport();
        
    });

});