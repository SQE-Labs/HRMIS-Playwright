import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProjectManagement } from '../pages/ProjectManagement'
import testData from '../testData/testData.json'
import projectData from '../testData/testData.json'
import { CommonUtils } from '../utils/commonUtils'
import { Helper } from '../utils/Helper'
import { ProjectReport } from '../pages/ProjectReport'
import * as constants from "../utils/constants"
import path from 'path'
import { MIMEType } from 'util'
import { MyProjects } from '../pages/MyProjects'
import { ShadowResources } from '../pages/ShadowResources'

let projectReportObj: ProjectReport
let ProjectManagementObj: ProjectManagement
let myProjectsPage: MyProjects
let ShadowResourcesPage: ShadowResources
let utils: CommonUtils
let helper: Helper

let projectName: string;
let projectButton: any;
test.describe.serial("Project TeamFlow Project List", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword)

        utils = new CommonUtils()
        helper = new Helper(page)

        ProjectManagementObj = new ProjectManagement(page)
        await ProjectManagementObj.expandTab()
        await ProjectManagementObj.navigateToProjectListTab()
    })
    test("HRMIS_PTF_2 Verify project management page elements are visible @smoke @reg", async ({ page }) => {
        await expect(ProjectManagementObj.searchInput).toBeVisible();
        await expect(ProjectManagementObj.createProjectBtn).toBeVisible();
        await expect(ProjectManagementObj.projectHeader).toBeVisible();
    })
    test("HRMIS_PTF_9, HRMIS_PTF_10 Verify project creation form fields are visible and cancel closes form @smoke @reg", async ({ page }) => {
        await ProjectManagementObj.clickCreateProject()
        await expect(ProjectManagementObj.projectNameInput).toBeVisible();
        await expect(ProjectManagementObj.projectTypeDropdown).toBeVisible();
        await expect(ProjectManagementObj.deliveryLeadDropdown).toBeVisible();
        await expect(ProjectManagementObj.projectManagerDropdown).toBeVisible();
        await expect(ProjectManagementObj.principalSponsorDropdown).toBeVisible();
        await expect(ProjectManagementObj.leadBusinessAnalystDropdown).toBeVisible();
        await expect(ProjectManagementObj.projectDescriptionInput).toBeVisible();
        await expect(ProjectManagementObj.sowStartDateInput).toBeVisible();
        await expect(ProjectManagementObj.sowEndDateInput).toBeVisible();
        await expect(ProjectManagementObj.actualStartDateInput).toBeVisible();
        await expect(ProjectManagementObj.actualEndDateInput).toBeVisible();
        await expect(ProjectManagementObj.submitBtn).toBeVisible();
        await expect(ProjectManagementObj.cancelBtn).toBeVisible();

        await ProjectManagementObj.cancelBtn.click();
        await expect(ProjectManagementObj.projectHeader).toBeVisible();
    })
    test("HRMIS_PTF_11 Create a new project successfully @smoke @reg", async ({ page }) => {
        await ProjectManagementObj.clickCreateProject()
        // Read data from JSON file ...
        const rawData = projectData.Projects.Project1;
        projectName = rawData.name + await utils.generateRandomInteger(2);
        console.log(projectName);

        const projectPayload = {
            ...rawData, name: projectName, // make unique
        }

        await ProjectManagementObj.fillAndSubmitProjectForm(projectPayload)
        const successToast = await ProjectManagementObj.toastMessage()
        expect(successToast).toEqual(constants.PROJECT_CREATED_SUCCESSMESSAGE)
        //HRMIS_PTF_3
        await ProjectManagementObj.searchProject(projectName);
        await expect(page.locator(`button:has-text("${projectName}"):has-text("Active")`)).toBeVisible();
    })

    test("HRMIS_PTF_4 Toggle project accordion expands and collapses @smoke @reg", async ({ page }) => {
        await ProjectManagementObj.searchProject(projectName);
        const projectButton = page.locator(`button:has-text("${projectName}"):has-text("Active")`);
        await expect(projectButton).toBeVisible();
        await expect(ProjectManagementObj.accordion).toBeHidden();
        await projectButton.click();
        await expect(ProjectManagementObj.accordion).toBeVisible();
        await projectButton.click();
        await expect(ProjectManagementObj.accordion).toBeHidden();
    })

    test("HRMIS_PTF_5, HRMIS_PTF_6 Verify push notification flow for project creation @smoke @reg", async ({ page }) => {
        await ProjectManagementObj.searchProject(projectName);
        projectButton = page.locator(`button:has-text("${projectName}"):has-text("Active")`);
        await projectButton.click();
        await ProjectManagementObj.clickOnPushNotificationBtn();
        await expect(page.getByText("Send Notification")).toBeVisible();
        await expect(page.getByText("Select Reason")).toBeVisible();
        await ProjectManagementObj.reasonDropdown.click();
        await ProjectManagementObj.reasonDropdown.fill('Project Created');
        await ProjectManagementObj.reasonDropdown.press('Enter');
        await ProjectManagementObj.clickOnSendBtn();
        await ProjectManagementObj.clickOnYesBtn()
        const notificationToast = await ProjectManagementObj.toastMessage()
        expect(notificationToast).toEqual(constants.NOTIFICATION_SENT_SUCCESSMESSAGE)
    })

    test("HRMIS_PTF_7,HRMIS_PTF_8  Verify add project team member flow @smoke @reg", async ({ page }) => {
        await ProjectManagementObj.searchProject(projectName);
        projectButton = page.locator(`button:has-text("${projectName}"):has-text("Active")`);
        await projectButton.click();
        await ProjectManagementObj.clickOnAddMembersBtn();

        const rawData = projectData.Projects.AddNewMember;
        const projectPayload = {
            ...rawData
        }
        await ProjectManagementObj.addNewMember(projectPayload)

        const addMemberToast = await ProjectManagementObj.toastMessage()
        expect(addMemberToast).toEqual(constants.MEMBER_ASSIGNED_SUCCESSMESSAGE)
        await expect(page.locator(`text=${projectPayload.employeeName}`).last()).toBeVisible()
    })

    test("HRMIS_PTF_14,HRMIS_PTF_15 Filter project report by project name @smoke @reg", async ({ page }) => {
        projectReportObj = new ProjectReport(page)
        await projectReportObj.navigateToProjectReport();
        await expect(projectReportObj.filterByDropdown).toBeVisible();
        await expect(projectReportObj.projectNameDropdown).toBeVisible();
        await expect(projectReportObj.downloadButton).toBeVisible();
        await projectReportObj.filterByProjectName()
        await projectReportObj.selectProjectByName(projectName);
        const filePath = await utils.verifyXLSXDownload(page, async () => {
            await projectReportObj.clickDownloadButton();
        });
        expect(path.extname(filePath)).toBe('.xlsx');
    })

    test("HRMIS_PTF_20,HRMIS_PTF_21,HRMIS_PTF_22,HRMIS_PTF_23,HRMIS_PTF_24 Verify Shadow Resources page elements are visible @smoke @reg", async ({ page }) => {
        ShadowResourcesPage = new ShadowResources(page)
        await ShadowResourcesPage.navigateToShadowResources();
        await expect(ShadowResourcesPage.shadowResourcesHeader).toBeVisible();
        await expect(ShadowResourcesPage.searchInput).toBeVisible();
        const countBefore = await ShadowResourcesPage.resourcesList.count();
        console.log(`Total shadow resources before search: ${countBefore}`);
        expect(countBefore).toEqual(await ShadowResourcesPage.getTotalResources());
        // Search and verify the project
        await ShadowResourcesPage.searchResource(projectName)
        await ShadowResourcesPage.verifyResourceInList(projectName)
        //Add shadow member to the project
        projectButton = page.locator(`button:has-text("${projectName}"):has-text("Active")`);
        await projectButton.click();
        await page.waitForTimeout(2000);
        await expect(page.getByText("Shadow Members")).toBeVisible();
        const rawData = projectData.Projects.AddShadowMember;
        const projectPayload = {
            ...rawData
        }
        await ShadowResourcesPage.addShadowMember(projectPayload)

        const addMemberToast = await ProjectManagementObj.toastMessage()
        expect(addMemberToast).toEqual(constants.MEMBER_ASSIGNED_SUCCESSMESSAGE)
        await expect(page.locator(`text=${projectPayload.shadowName}`)).toBeVisible()
    })

    test("HRMIS_PTF_16,HRMIS_PTF_17 Verify project appears in My Projects page @smoke @reg", async ({ page }) => {
        myProjectsPage = new MyProjects(page)
        await myProjectsPage.navigateToMyProjects();
        await expect(myProjectsPage.projectHeader).toBeVisible();
        await expect(myProjectsPage.searchInput).toBeVisible();
        const countBefore = await myProjectsPage.projectsList.count();
        console.log(`Total projects before search: ${countBefore}`);
        expect(countBefore).toEqual(await myProjectsPage.getTotalProjectsAssigned());
        // Search and verify the project
        await myProjectsPage.searchProject(projectName)
        await myProjectsPage.verifyProjectInList(projectName)

    })
});
