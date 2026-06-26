import { test, Page, expect } from "@playwright/test";
import { PendingApprovals } from "../../pages/PendingApprovals";
import { LoginPage } from "../../pages/LoginPage";
import testData from "../../testData/testData.json";
import { TimesheetApi } from "../../api/TimesheetManagement/TimesheetApi";
import {TIMESHEET_RESUBMISSION_DIALOGBOX_HEADING} from "../../utils/constants";


let PAPage : PendingApprovals;
let loginPage : LoginPage;

test.describe("Pending Approvals", () =>{
    test.beforeEach(async({page})=> {
        PAPage = new PendingApprovals(page);
        loginPage = new LoginPage(page);
    })
    

    test("ApproveTimeSheet", async () =>{
        await TimesheetApi.submit();
        await loginPage.validLogin(testData.ReportingManager.UserEmail, testData.SuperUser.UserPassword);
        await PAPage.navigateToTab("Timesheet Management", "Pending approvals");
        await PAPage.clickOnViewButtonforFirstResult();
        await PAPage.approveAllProjectEntries();
        await PAPage.clickButton("Submit");
    })

    test("RejectTimeSheet", async () =>{
        await TimesheetApi.submit();
        await loginPage.validLogin(testData.ReportingManager.UserEmail, testData.SuperUser.UserPassword);
        await PAPage.navigateToTab("Timesheet Management", "Pending approvals");
        await PAPage.clickOnViewButtonforFirstResult();
        await PAPage.rejectAllProjectEntries();
        await PAPage.clickButton("Submit");
        expect(await PAPage.getResubmissionDialogText()).toEqual(TIMESHEET_RESUBMISSION_DIALOGBOX_HEADING);
        await PAPage.selectResubmissionAllowOption(true);
    })
    
});