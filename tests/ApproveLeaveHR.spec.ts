import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { AttendanceLeaveTab } from "../pages/Attendance&Leaves";
import * as constants from "../utils/constants";
import { MyTeamLeavePage } from "../pages/myTeamLeave";
import { ApplyLeaves } from "../pages/ApplyLeaves"; 
import { ApproveLeaveHR } from "../pages/ApproveLeaveHR";

let loginObj: LoginPage;
let approveLeaveHR: ApproveLeaveHR;

test.describe("Approve Leave HR module ", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    loginObj = new LoginPage(page);
    await loginObj.validLogin(
      testData.SuperUser.UserEmail,
      testData.SuperUser.UserPassword
    );

    console.log(">> Starting test case : " + testInfo.title);
    });


}




    
