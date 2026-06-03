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

    test("HRMIS_PTF_1 HRMIS_PTF_2 Verify project management page elements are visible @smoke @reg @ci", async ({ page }) => {
        await expect(ProjectManagementObj.searchInput).toBeVisible();
        await expect(ProjectManagementObj.createProjectBtn).toBeVisible();
        await expect(ProjectManagementObj.projectHeader).toBeVisible();
    })

    test("HRMIS_PTF_2 HRMIS_PTF_10 Verify project creation form fields are visible and cancel closes form @smoke @reg @ci", async ({ page }) => {
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

    test("HRMIS_PTF_9 HRMIS_PTF_11 Create a new project successfully @smoke @reg @ci", async ({ page }) => {
        const timestamp = Date.now();
        await ProjectManagementObj.clickCreateProject()
        const rawData = projectData.Projects.Project1;
        projectName = `${rawData.name}_${timestamp}`;
        console.log(projectName);

        const projectPayload = {
            ...rawData, name: projectName,
        }
        await ProjectManagementObj.fillAndSubmitProjectForm(projectPayload)
        const successToast = await ProjectManagementObj.toastMessage()
        expect(successToast).toEqual(constants.PROJECT_CREATED_SUCCESSMESSAGE)
        await ProjectManagementObj.waitforLoaderToDisappear()

        await ProjectManagementObj.searchProject(projectName);
        await expect(ProjectManagementObj.getProjectButton(projectName)).toBeVisible();
    })

    test("HRMIS_PTF_3 HRMIS_PTF_4 Toggle project accordion expands and collapses @smoke @reg @ci", async ({ page }) => {
        await ProjectManagementObj.searchProject(projectName);
        await expect(ProjectManagementObj.getProjectButton(projectName)).toBeVisible();
        await expect(ProjectManagementObj.accordion).toBeHidden();
        await ProjectManagementObj.getProjectButton(projectName).click();
        await expect(ProjectManagementObj.accordion).toBeVisible();
        await ProjectManagementObj.getProjectButton(projectName).click();
        await expect(ProjectManagementObj.accordion).toBeHidden();
    })

    test("HRMIS_PTF_5 Verify push notification flow for project creation @smoke @reg @ci", async ({ page }) => {
        await ProjectManagementObj.searchProject(projectName);
        await ProjectManagementObj.getProjectButton(projectName).click();
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

    test("HRMIS_PTF_6 HRMIS_PTF_7 HRMIS_PTF_8 Verify add project team member flow @smoke @reg @ci", async ({ page }) => {
        await ProjectManagementObj.searchProject(projectName);
        await ProjectManagementObj.getProjectButton(projectName).click();
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

    test("HRMIS_PTF_14 HRMIS_PTF_15 Filter project report by project name @smoke @reg @ci", async ({ page }) => {
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

    test("HRMIS_PTF_19 HRMIS_PTF_20 HRMIS_PTF_21 HRMIS_PTF_22 HRMIS_PTF_23 HRMIS_PTF_24 Verify Shadow Resources page elements are visible @smoke @reg @ci", async ({ page }) => {
        ShadowResourcesPage = new ShadowResources(page)
        await ShadowResourcesPage.navigateToShadowResources();
        await expect(ShadowResourcesPage.shadowResourcesHeader).toBeVisible();
        await expect(ShadowResourcesPage.searchInput).toBeVisible();

        teamMemberName = projectData.Projects.AddNewMember.employeeName;
        await ShadowResourcesPage.searchResource(projectName)
        await ProjectManagementObj.getProjectButton(projectName).click();
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

    test("HRMIS_PTF_16 HRMIS_PTF_17 HRMIS_PTF_18 Verify project appears in My Projects page @smoke @reg @ci", async ({ page }) => {
        await ProjectManagementObj.expandTab();
        await ProjectManagementObj.projectsTab.click();
        await ProjectManagementObj.waitforLoaderToDisappear();

        myProjectsPage = new MyProjects(page)
        await ProjectManagementObj.searchProject(projectName);

        await expect(myProjectsPage.getProjectCard(projectName)).toBeVisible();     // ✅ using page object method
        await myProjectsPage.expandProjectCard(projectName);                        // ✅ using page object method

        const teamMemberNameLocal = projectData.Projects.AddNewMember.employeeName;
        await myProjectsPage.verifyMemberVisibleInCard(projectName, teamMemberNameLocal); // ✅ using page object method

        await myProjectsPage.navigateToShadowTeammembers(projectName);

        const shadowNameLocal = projectData.Projects.AddShadowMember.shadowName;
        await myProjectsPage.verifyMemberVisibleInCard(projectName, shadowNameLocal);     // ✅ using page object method
    })

    test("HRMIS_PTF_10 Edit team member designation to QA @smoke @reg @ci", async ({ page }) => {
        myProjectsPage = new MyProjects(page)

        await ProjectManagementObj.searchProject(projectName)
        await expect(myProjectsPage.getProjectCard(projectName)).toBeVisible();    // ✅ using page object method
        await myProjectsPage.expandProjectCard(projectName);                       // ✅ using page object method

        const teamMemberNameLocal = projectData.Projects.AddNewMember.employeeName
        await myProjectsPage.editTeamMemberDesignation(projectName, teamMemberNameLocal, 'QA')

        const updatedRow = myProjectsPage.getMemberRowInCard(projectName, teamMemberNameLocal); // ✅ using page object method
        await expect(updatedRow.getByText('QA', { exact: true })).toBeVisible()
    })

    test("HRMIS_PTF_11 Delete team member from project @smoke @reg @ci", async ({ page }) => {
        myProjectsPage = new MyProjects(page)

        await ProjectManagementObj.searchProject(projectName)
        await expect(myProjectsPage.getProjectCard(projectName)).toBeVisible();    // ✅ using page object method
        await myProjectsPage.expandProjectCard(projectName);                       // ✅ using page object method

        const teamMemberNameLocal = projectData.Projects.AddNewMember.employeeName
        await myProjectsPage.deleteTeamMember(projectName, teamMemberNameLocal)

        await expect(myProjectsPage.getMemberRowInCard(projectName, teamMemberNameLocal)).toHaveCount(0); // ✅ using page object method
    })
});

test.describe('CSAT Rating', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.validLogin(MY_PROFILE_USER_EMAIL, MY_PROFILE_USER_PASSWORD);

        csatRatingPage = new CSATRatingPage(page);
        await csatRatingPage.openCSATRatingPage();
    });

    test('HRMIS_PTF_25 HRMIS_PTF_26 HRMIS_PTF_27 Verify Employee Name and the associated project is visible @smoke @reg @ci', async () => {
        await csatRatingPage.manageSelectEmployee(CSAT_TEAM_MEMBER_NAME);
        await csatRatingPage.verifyManageProjectVisible(CSAT_PROJECT_NAME);
    });

    test('HRMIS_PTF_28 Verify Project Name and the associated employee is visible @smoke @reg @ci', async () => {
        await csatRatingPage.manageSelectProject(CSAT_PROJECT_NAME);
        await csatRatingPage.verifyManageTeamMemberVisible(CSAT_TEAM_MEMBER_NAME);
    });

    test('Verify updating project rating for an employee is successful @smoke @reg @ci', async ({ page }) => {
        await csatRatingPage.manageSelectProject(CSAT_PROJECT_NAME);
        await csatRatingPage.verifyManageTeamMemberVisible(CSAT_TEAM_MEMBER_NAME);
        await csatRatingPage.manageUpdateRating(4);
    });

    test('HRMIS_PTF_29 HRMIS_PTF_32 HRMIS_PTF_33 HRMIS_PTF_34 HRMIS_PTF_35 Verify adding CSAT rating for an employee is successful @smoke @reg @ci', async () => {
        await csatRatingPage.addCSATSelectProject(CSAT_PROJECT_NAME, 5);
    });

    test('HRMIS_PTF_30 HRMIS_PTF_31 Verify Employee Name and the associated project is visible @smoke @reg @ci', async () => {
        await csatRatingPage.addCSATSelectEmployee(CSAT_TEAM_MEMBER_NAME, 5);
    });

    test('HRMIS_PTF_36 Verify Cancel button clears selections on Add CSAT Ratings page @smoke @reg @ci', async () => {
        await csatRatingPage.verifyAddCSATCancelClearsSelections(CSAT_TEAM_MEMBER_NAME);
    });
});