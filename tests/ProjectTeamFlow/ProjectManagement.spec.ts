import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { ProjectManagement } from '../../pages/ProjectManagement'
import testData from '../../testData/testData.json'
import projectData from '../../testData/testData.json'
import { CommonUtils } from '../../utils/commonUtils'
import { Helper } from '../../utils/Helper'
import { ProjectReport } from '../../pages/ProjectReport'
import { CSATRatingPage } from '../../pages/CSATRating'
import * as constants from "../../utils/constants"
import { MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD, CSAT_PROJECT_NAME, CSAT_TEAM_MEMBER_NAME } from '../../utils/constants'
import path from 'path'
import { MIMEType } from 'util'
import { MyProjects } from '../../pages/MyProjects'
import { ShadowResources } from '../../pages/ShadowResources'
import * as fs from 'fs'

let projectReportObj: ProjectReport
let ProjectManagementObj: ProjectManagement
let myProjectsPage: MyProjects
let ShadowResourcesPage: ShadowResources
let utils: CommonUtils
let helper: Helper

let projectName: string;
let projectButton: any;
let teamMemberName: string;
let csatRatingPage: CSATRatingPage;

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
    test("HRMIS_PTF_1 HRMIS_PTF_2 Verify project management page elements are visible @smoke @reg", async ({ page }) => {
        await expect(ProjectManagementObj.searchInput).toBeVisible();
        await expect(ProjectManagementObj.createProjectBtn).toBeVisible();
        await expect(ProjectManagementObj.projectHeader).toBeVisible();
    })
    test("HRMIS_PTF_2 HRMIS_PTF_10 Verify project creation form fields are visible and cancel closes form @smoke @reg", async ({ page }) => {
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
    test("HRMIS_PTF_9 HRMIS_PTF_11 Create a new project successfully @smoke @reg", async ({ page }) => {
        // Use timestamp to make project name unique
        const timestamp = Date.now();
        await ProjectManagementObj.clickCreateProject()
        // Read data from JSON file ...
        const rawData = projectData.Projects.Project1;
        projectName = `${rawData.name}_${timestamp}`;
        console.log(projectName);

        const projectPayload = {
            ...rawData, name: projectName, // make unique
        }
        await ProjectManagementObj.fillAndSubmitProjectForm(projectPayload)
        const successToast = await ProjectManagementObj.toastMessage()
        expect(successToast).toEqual(constants.PROJECT_CREATED_SUCCESSMESSAGE)
        await ProjectManagementObj.waitforLoaderToDisappear()
        // Verify the project appears in the list
        //HRMIS_PTF_3
        await ProjectManagementObj.searchProject(projectName);
        await expect(page.locator(`button:has-text("${projectName}"):has-text("Active")`)).toBeVisible();
    })

    test("HRMIS_PTF_3 HRMIS_PTF_4 Toggle project accordion expands and collapses @smoke @reg", async ({ page }) => {
        await ProjectManagementObj.searchProject(projectName);
        const projectButton = page.locator(`button:has-text("${projectName}"):has-text("Active")`);
        await expect(projectButton).toBeVisible();
        await expect(ProjectManagementObj.accordion).toBeHidden();
        await projectButton.click();
        await expect(ProjectManagementObj.accordion).toBeVisible();
        await projectButton.click();
        await expect(ProjectManagementObj.accordion).toBeHidden();
    })

    test("HRMIS_PTF_5 Verify push notification flow for project creation @smoke @reg", async ({ page }) => {
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

    test("HRMIS_PTF_6 HRMIS_PTF_7 HRMIS_PTF_8 Verify add project team member flow @smoke @reg", async ({ page }) => {
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

    test("HRMIS_PTF_14 HRMIS_PTF_15 Filter project report by project name @smoke @reg", async ({ page }) => {
        projectReportObj = new ProjectReport(page)
        await projectReportObj.navigateToProjectReport();
        await expect(projectReportObj.filterByDropdown).toBeVisible();
        await expect(projectReportObj.projectNameDropdown).toBeVisible();
        await expect(projectReportObj.downloadButton).toBeVisible();
        await projectReportObj.filterByProjectName();
        await projectReportObj.selectProjectByName(projectName);
        const filePath = await utils.verifyXLSXDownload(page, async () => {
            await projectReportObj.clickDownloadButton();
        });
        expect(fs.existsSync(filePath)).toBeTruthy();
        expect(path.extname(filePath)).toBe('.xlsx');
    })

    test("HRMIS_PTF_19 HRMIS_PTF_20 HRMIS_PTF_21 HRMIS_PTF_22 HRMIS_PTF_23 HRMIS_PTF_24 Verify Shadow Resources page elements are visible @smoke @reg", async ({ page }) => {
        ShadowResourcesPage = new ShadowResources(page)
        await ShadowResourcesPage.navigateToShadowResources();
        await expect(ShadowResourcesPage.shadowResourcesHeader).toBeVisible();
        await expect(ShadowResourcesPage.searchInput).toBeVisible();

        teamMemberName = projectData.Projects.AddNewMember.employeeName;
        await ShadowResourcesPage.searchResource(projectName)
        projectButton = page.locator(`button:has-text("${projectName}"):has-text("Active")`);
        await projectButton.click();
        await expect(page.getByText("Shadow Members")).toBeVisible();
        const rawData = projectData.Projects.AddShadowMember;
        const projectPayload = {
            ...rawData,
            mainEmployeeName: teamMemberName
        }
        await ShadowResourcesPage.clickAddMemberButton(projectName);
        await ShadowResourcesPage.addShadowMember(projectPayload)

        const addMemberToast = await ProjectManagementObj.toastMessage()
        expect(addMemberToast).toEqual(constants.SHADOW_MEMBER_ASSIGNED_SUCCESSMESSAGE)
        await expect(page.locator(`text=${projectPayload.shadowName}`)).toBeVisible()
    })

    test("HRMIS_PTF_16 HRMIS_PTF_17 HRMIS_PTF_18 Verify project appears in My Projects page @smoke @reg", async ({ page }) => {
        // Click Projects, then search the created project and verify team members and shadow members
        // Click Project TeamFlow then Projects, then search the created project and verify team and shadow members
            await ProjectManagementObj.expandTab();
            await ProjectManagementObj.projectsTab.click();
            await ProjectManagementObj.waitforLoaderToDisappear();
        myProjectsPage = new MyProjects(page)
        await ProjectManagementObj.searchProject(projectName);
            const projectCard = page.locator(`//h2//span[normalize-space()="${projectName}"]/../../..`);
            await expect(projectCard).toBeVisible();
        await projectCard.locator('button.accordion-button').click({ force: true });

        // Verify team member inside the opened project card
        const teamMemberNameLocal = projectData.Projects.AddNewMember.employeeName;
        await expect(projectCard.locator(`text=${teamMemberNameLocal}`).first()).toBeVisible();

        // Switch to the Shadow Team Members tab and verify the shadow member
        await myProjectsPage.navigateToShadowTeammembers(projectName);

        const shadowNameLocal = projectData.Projects.AddShadowMember.shadowName;
        await expect(projectCard.locator(`text=${shadowNameLocal}`).first()).toBeVisible();
    })

    test("HRMIS_PTF_10 Edit team member designation to QA @smoke @reg", async ({ page }) => {
        myProjectsPage = new MyProjects(page)

        await ProjectManagementObj.searchProject(projectName)
        const projectCard = page.locator(`//h2//span[normalize-space()="${projectName}"]/../../..`)
        await expect(projectCard).toBeVisible()
        await projectCard.locator('button.accordion-button').click({ force: true })

        const teamMemberNameLocal = projectData.Projects.AddNewMember.employeeName
        await myProjectsPage.editTeamMemberDesignation(projectName, teamMemberNameLocal, 'QA')

        const updatedRow = projectCard.locator('tbody tr').filter({ hasText: teamMemberNameLocal })
        await expect(updatedRow.getByText('QA', { exact: true })).toBeVisible()
    })

    test("HRMIS_PTF_11 Delete team member from project @smoke @reg", async ({ page }) => {
        myProjectsPage = new MyProjects(page)

        await ProjectManagementObj.searchProject(projectName)
        const projectCard = page.locator(`//h2//span[normalize-space()="${projectName}"]/../../..`)
        await expect(projectCard).toBeVisible()
        await projectCard.locator('button.accordion-button').click({ force: true })

        const teamMemberNameLocal = projectData.Projects.AddNewMember.employeeName
        await myProjectsPage.deleteTeamMember(projectName, teamMemberNameLocal)

        await expect(projectCard.locator('tbody tr').filter({ hasText: teamMemberNameLocal })).toHaveCount(0)
    })
});

test.describe('CSAT Rating', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

        csatRatingPage = new CSATRatingPage(page);
        await csatRatingPage.openCSATRatingPage();
    });

     test('HRMIS_PTF_25 HRMIS_PTF_26 HRMIS_PTF_27 Verify Employee Name and the associated project is visible @smoke @reg @smoke @reg', async () => {
        await csatRatingPage.manageSelectEmployee(CSAT_TEAM_MEMBER_NAME);
        await csatRatingPage.verifyManageProjectVisible(CSAT_PROJECT_NAME);
    });

    test('HRMIS_PTF_28  Verify Project Name and the associated employee is visible @smoke @reg', async () => {
        await csatRatingPage.manageSelectProject(CSAT_PROJECT_NAME);
        await csatRatingPage.verifyManageTeamMemberVisible(CSAT_TEAM_MEMBER_NAME);
    });

    


    test('Verify updating project rating for an employee is successful @smoke @reg', async ({ page }) => {
        await csatRatingPage.manageSelectProject(CSAT_PROJECT_NAME);
        await csatRatingPage.verifyManageTeamMemberVisible(CSAT_TEAM_MEMBER_NAME);
        await csatRatingPage.manageUpdateRating(4);
        await page.waitForTimeout(4000);
    });

    test('HRMIS_PTF_29 HRMIS_PTF_32 HRMIS_PTF_33 HRMIS_PTF_34 HRMIS_PTF_35 Verify adding CSAT rating for an employee is successful @smoke @reg', async () => {
        await csatRatingPage.addCSATSelectProject(CSAT_PROJECT_NAME, 5);
    });

    test('HRMIS_PTF_30  HRMIS_PTF_31 Verify Employee Name and the associated project is visible @smoke @reg', async () => {
        await csatRatingPage.addCSATSelectEmployee(CSAT_TEAM_MEMBER_NAME, 5);
    });

    test('HRMIS_PTF_36 Verify Cancel button clears selections on Add CSAT Ratings page @smoke @reg', async () => {
        await csatRatingPage.verifyAddCSATCancelClearsSelections(CSAT_TEAM_MEMBER_NAME);
    });


});
