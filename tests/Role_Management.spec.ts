import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../testData/testData.json";
import { RoleManagement } from "../pages/Role_Management";
import * as constants from "../utils/constants";

let loginObj: LoginPage;
let roleManagement: RoleManagement; 
test.describe("Role Management Tests", () => {
    test.beforeEach(async ({ page }, testInfo) => {
        loginObj = new LoginPage(page); 
        await loginObj.validLogin(
            testData.SuperUser.UserEmail,
            testData.SuperUser.UserPassword
        );          
        roleManagement = new RoleManagement(page);
        console.log(">> Starting test case : " + testInfo.title);
    });

    test('RM_1, Verify that Role Management UI elements are present @smoke @eti', async ({ page }) => {
        const roleName = "Automation Test Role";
        const roleDescription = "This is a role created by automation test.";
        const updatedRoleName = "Auto_Role_Updated";
        const updatedRoleDescription = "This role has been updated by automation test.";

        // Navigating to Role Management tab
        await roleManagement.roleManagementTab.click();
        await roleManagement.navigateToRoleManagementTab("Role List");
        await page.waitForLoadState();

        // Adding new Role
        await roleManagement.addRole(roleName, roleDescription);
        // verify toast message
        let message = await roleManagement.toastMessage();
        console.log("Success  message: " + message);
        expect(message).toContain(constants.ROLE_ADD_SUCCESSMESSAGE);

        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });
        
        await roleManagement.fetchLastRecordView("40");
        await page.waitForLoadState();
        // searching the created role
        await roleManagement.searchRoleByName(roleName);
        // waiting for search results to load
        await page.waitForLoadState();

        // --- VERIFY ROLE AND EDIT USING RELATIVE LOCATOR ---
        const roleRow = page.locator(`tr:has-text("${roleName}")`);
        await expect(roleRow).toBeVisible();

        const editButton = roleRow.getByText('Edit');
        await editButton.click();

        await roleManagement.roleTitleField.fill(updatedRoleName);
        await roleManagement.descriptionField.fill(updatedRoleDescription);
        await roleManagement.submitButton.click();

        // refreshing the page to avoid stale element reference
        await page.reload();
        await page.waitForLoadState();
        await roleManagement.fetchLastRecordView("40");
        await page.waitForLoadState();
        // searching the updated role
        await roleManagement.searchRoleByName(updatedRoleName);
        // verify the updated role is present in the search result
        const updatedRoleTitle = page.getByText(updatedRoleName);
        await expect(updatedRoleTitle).toBeVisible();

        // navigate to Menu Assigment sub tab of Role Management
        await roleManagement.roleManagementTab.click();
        await roleManagement.navigateToRoleManagementTab("Menu Assignment");
        await page.waitForLoadState();

        // Select the updated role from the dropdown
        await roleManagement.selectRole(updatedRoleName);
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // Check all sub tab checkboxes under "Analytics&Insights" tab
        await roleManagement.checkSubTabCheckbox("Analytics&Insights");

        // click on submit button
        await roleManagement.submitButton.click();
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // verify toast message
        let message2 = await roleManagement.toastMessage();
        console.log("Success  message: " + message2);
        // Successfully updated. message
        expect(message2?.trim()).toContain(constants.ROLE_UPDATE_SUCCESSMESSAGE);
        await page.waitForSelector('.Toastify__toast-body', { state: 'hidden', timeout: 5000 });

        // verify the information text
        await expect(roleManagement.successMsg).toBeVisible();
        await page.waitForLoadState();
        

        // Navigate back to Role List tab to delete the created role
       // await roleManagement.roleManagementTab.click();
        await roleManagement.navigateToRoleManagementTab("Role List");
        await page.waitForLoadState(); 
        await page.reload(); 
        await page.waitForLoadState();

        await roleManagement.fetchLastRecordView("40");
        await page.waitForLoadState();

        // searching the updated role to delete
        await roleManagement.searchRoleByName(updatedRoleName); 
        // waiting for search results to load
        await page.waitForLoadState();  


        // --- VERIFY ROLE AND DELETE USING RELATIVE LOCATOR ---
        const deleteRoleRow = page.locator(`tr:has-text("${updatedRoleName}")`);

        // Wait for the row to appear
        await expect(deleteRoleRow).toBeVisible({ timeout: 5000 });

        // Wait for Delete button inside this row
        const deleteButton = deleteRoleRow.getByText('Delete');
        await expect(deleteButton).toBeVisible({ timeout: 5000 });

        // Click Delete
        await deleteButton.click();
        await roleManagement.yesButton.click();
        await roleManagement.waitForSpinnerLoaderToDisappear();

        // verify toast message 
        let deleteMessage = await roleManagement.toastMessage();
        console.log("Delete Success  message: " + deleteMessage);
        expect(deleteMessage).toContain("Successfully deleted");   
       
    });

});