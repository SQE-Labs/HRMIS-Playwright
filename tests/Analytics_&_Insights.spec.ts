import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Analytics_Insights } from "../pages/Analytics_&_Insights";
import testData from "../testData/testData.json";
import * as constants from "../utils/constants";


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

    test("HRMIS_AI_2 , HRMIS_AI_4 User Role Report functionality @smoke @reg", async ({ page }) => {
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
        await page.getByPlaceholder('Search By Employee Name').fill(testData.EMPLOYEE_NAME)
        await analyticsInsights.waitforLoaderToDisappear();
        var name = await page.locator('tr>td').nth(1).textContent();
        expect(name).toEqual(testData.EMPLOYEE_NAME);
        console.log(name);
    });

    test("HRMIS_AI_13 Asset Report functionality @smoke @reg", async ({ page }) => {
        // Navigate to Asset Report page
        await analyticsInsights.navigateToAssetReport();
        await analyticsInsights.assetTypeDropdown.selectOption('All');
        await analyticsInsights.ownerDropdown.selectOption('All');
        await analyticsInsights.verifyXLSXDownload(page, async () => {
            await analyticsInsights.downloadButton.click();
        });
    });

    test("HRMIS_AI_13.1 Verify the Reset button functionality of Asset Report @reg, @eti", async ({ page }) => {
        // Navigate to Asset Report page
        await analyticsInsights.navigateToAssetReport();
        await analyticsInsights.assetTypeDropdown.selectOption('All');
        await analyticsInsights.ownerDropdown.selectOption('All');
        await analyticsInsights.resetButton.click();

        const assetTypeText = await analyticsInsights.assetTypeDropdown.textContent();
        const ownerText = await analyticsInsights.ownerDropdown.textContent();

        expect(assetTypeText).toContain('Select');
        expect(ownerText).toContain('Select');

    });

    test("HRMIS_AI_13.2 Verify the validation tooltip functionality of Asset Report @reg, @eti", async ({ page }) => {
        // Navigate to Asset Report page
        await analyticsInsights.navigateToAssetReport();
        await page.waitForLoadState()
        await analyticsInsights.downloadButton.click();
        // verify the tooltip for Asset Type field
        await analyticsInsights.verifyTooltipMessage(analyticsInsights.assetTypeDropdown, constants.SELECT_ITEM)
        
        // verify the tooltip for Owner field 
        await analyticsInsights.assetTypeDropdown.selectOption('All');
        await analyticsInsights.downloadButton.click();
        await analyticsInsights.verifyTooltipMessage(analyticsInsights.ownerDropdown, constants.SELECT_ITEM)
 
    })


    test("HRMIS_AI_14 User Attendance Report functionality @smoke @reg", async ({ page }) => {
        await analyticsInsights.navigateToUserAttendanceReport();
        await analyticsInsights.monthDropdown.waitFor({ state: 'visible', timeout: 30000 });
        await analyticsInsights.monthDropdown.selectOption("April");
        await analyticsInsights.waitForDotsLoaderToDisappear();
        await analyticsInsights.selectEmployeeDropdown.click();
        await page.getByText("Vishal Dev Thakur").waitFor({ state: 'visible', timeout: 60000 });
        await page.getByText("Vishal Dev Thakur").click();
        await analyticsInsights.waitForDotsLoaderToDisappear();
        await analyticsInsights.verifyXLSXDownload(page, async () => {
            await analyticsInsights.compileAndDownloadButton.click();
        });
    });
});


