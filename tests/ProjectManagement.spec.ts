import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { BasePage } from '../pages/Basepage'
import { ProjectManagement } from '../pages/ProjectManagement'
import testData from '../testData/testData.json'
import projectData from '../testData/testData.json'
import { CommonUtils } from '../utils/commonUtils'
import { Helper } from '../utils/Helper'
import { ProjectReport } from '../pages/ProjectReport'
import path from 'path'

let projectReportObj: ProjectReport
let ProjectManagementObj: ProjectManagement
let utils: CommonUtils
let helper: Helper

test.describe.serial("Project Management", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword)

        utils = new CommonUtils()
        helper = new Helper(page)

        ProjectManagementObj = new ProjectManagement(page)
        await ProjectManagementObj.expandTab()
        await ProjectManagementObj.navigateToProjectListTab()
    })


    let projectName: string;
    test("Create a new project successfully ", async ({ page }) => {

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
        await expect(successToast).toEqual("Project created")
    })



    test("Filter project report by project name ", async ({ page }) => {

        projectReportObj = new ProjectReport(page)
        await projectReportObj.navigateToProjectReport();
        await projectReportObj.filterByProjectName()
        await projectReportObj.selectProjectByName(projectName);
        await expect(projectReportObj.getProjectTable().locator(`text=${projectName}`)).toBeVisible()
    })


    test("Download Project Report file", async ({ page }) => {
        // Download and save locally
        projectReportObj = new ProjectReport(page)
        await projectReportObj.navigateToProjectReport();
        const filePath = await utils.verifyXLSXDownload(page, async () => {
            await projectReportObj.clickDownloadButton();
        });
        expect(path.extname(filePath)).toBe('.xlsx');
    })
});