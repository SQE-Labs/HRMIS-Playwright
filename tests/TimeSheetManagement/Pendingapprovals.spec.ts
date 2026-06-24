import { test, Page } from "@playwright/test";
import { PendingApprovals } from "../../pages/PendingApprovals";
import { LoginPage } from "../../pages/LoginPage";
import testData from "../../testData/testData.json";
import { TimesheetApi } from "../../api/TimesheetManagement/TimesheetApi";


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
    
    
});