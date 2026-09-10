import { test, expect } from '@playwright/test'
import path from 'path'
import { LoginPage } from '../../pages/LoginPage'
import { PolicyEditor } from '../../pages/PolicyEditor'
import testData from '../../testData/testData.json'
import * as constant from '../../utils/constants'

let policyEditor: PolicyEditor

test.describe.configure({ mode: 'parallel' });


test.describe('Policy Editor Add and Update Policy', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.loginAsRole()

        policyEditor = new PolicyEditor(page)
        await policyEditor.expandTab()
        await policyEditor.navigateToPolicyEditorPage()
        await expect(
            page.getByRole('heading', { name: 'Policy Editor' })
        ).toBeVisible()
    })

    test('HRMIS_CP_1 HRMIS_CP_2 HRMIS_CP_6 HRMIS_CP_19 HRMIS_CP_20 HRMIS_CP_21 Add a new policy @smoke @reg @ci', async ({ page }) => {
        const policyTitle = `${constant.POLICY_TITLE_PREFIX}${Date.now()}`
        const policyDocumentPath = path.resolve(process.cwd(), 'files', constant.DummyResume)

        await policyEditor.clickAddPolicy()
        await expect(policyEditor.policyTitleInput).toBeVisible()

        await policyEditor.fillPolicyTitle(policyTitle)
        await policyEditor.selectRegion(constant.POLICY_REGION)
        await policyEditor.uploadPolicyDocument(policyDocumentPath)
        await policyEditor.selectValidFromDate(constant.POLICY_VALID_FROM_DAY)
        await policyEditor.fillPolicyDescription(constant.POLICY_DESCRIPTION)
        await policyEditor.submitPolicy()

        await policyEditor.searchPolicy(policyTitle)
        await expect(page.getByRole('cell', { name: policyTitle, exact: true })).toBeVisible()
    })

    test('HRMIS_CP_11 HRMIS_CP_12 HRMIS_CP_13 Update, Inactivate and Activate Policy @smoke @reg @ci', async ({ page }) => {
        const createdPolicy = {
            title: `${constant.POLICY_TITLE_PREFIX}${Date.now()}`,
            region: constant.POLICY_REGION,
            validFromDay: constant.POLICY_VALID_FROM_DAY,
            description: constant.POLICY_DESCRIPTION,
        }

        const updatedPolicy = {
            title: `${constant.POLICY_UPDATED_TITLE_PREFIX}${Date.now()}`,
            region: constant.POLICY_UPDATED_REGION,
            validFromDay: constant.POLICY_UPDATED_VALID_FROM_DAY,
            description: constant.POLICY_UPDATED_DESCRIPTION,
        }

        const createdPolicyDocumentPath = path.resolve(process.cwd(), 'files', constant.DummyResume)

        const formatDateForGrid = (day: number) =>
            new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }).format(new Date(new Date().getFullYear(), new Date().getMonth(), day))

        const updatedValidFrom = formatDateForGrid(updatedPolicy.validFromDay)

        await policyEditor.clickAddPolicy()
        await expect(policyEditor.policyTitleInput).toBeVisible()

        await policyEditor.fillPolicyTitle(createdPolicy.title)
        await policyEditor.selectRegion(createdPolicy.region)
        await policyEditor.uploadPolicyDocument(createdPolicyDocumentPath)
        await policyEditor.selectValidFromDate(createdPolicy.validFromDay)
        await policyEditor.fillPolicyDescription(createdPolicy.description)
        await policyEditor.submitPolicy()

        await policyEditor.searchPolicy(createdPolicy.title)
        await expect(page.getByRole('cell', { name: createdPolicy.title, exact: true })).toBeVisible()

        await policyEditor.clickEditByTitle(createdPolicy.title)
        await expect(policyEditor.policyModal).toBeVisible()

        await policyEditor.fillPolicyTitle(updatedPolicy.title)
        await policyEditor.selectRegion(updatedPolicy.region)
        await policyEditor.selectValidFromDate(updatedPolicy.validFromDay)
        await policyEditor.fillPolicyDescription(updatedPolicy.description)
        await policyEditor.submitPolicy()
        // await policyEditor.toastMessage()

        await policyEditor.searchPolicy(updatedPolicy.title)
        const updatedRow = policyEditor.rowByTitle(updatedPolicy.title)
        await expect(updatedRow).toContainText(updatedPolicy.title)
        await expect(updatedRow).toContainText(updatedPolicy.region)
        await expect(updatedRow).toContainText(updatedValidFrom)
        await expect(updatedRow).toContainText(updatedPolicy.description)

        await policyEditor.clickEditByTitle(updatedPolicy.title)
        await expect(policyEditor.policyModal).toBeVisible()
        await policyEditor.selectPolicyStatus('Inactive')
        await policyEditor.submitPolicy()
        // await policyEditor.toastMessage()

        await policyEditor.searchPolicy(updatedPolicy.title)
        await policyEditor.clickEditByTitle(updatedPolicy.title)
        await expect(policyEditor.policyModal).toBeVisible()
        await expect(policyEditor.policyStatusSwitch).not.toBeChecked()

        await policyEditor.selectPolicyStatus('Active')
        await policyEditor.submitPolicy()
        // await policyEditor.toastMessage()

        await policyEditor.searchPolicy(updatedPolicy.title)
        await policyEditor.clickEditByTitle(updatedPolicy.title)
        await expect(policyEditor.policyModal).toBeVisible()
        await expect(policyEditor.policyStatusSwitch).toBeChecked()


    })

    test('Verify Policy Document Viewer and Download and pagination @smoke @reg @ci', async ({ page }) => {

        await policyEditor.selectRowsPerPage(constant.ROWS_PER_PAGE_20);
        await expect(policyEditor.rowsPerPageSelect).toHaveValue(constant.ROWS_PER_PAGE_20);
        expect(await policyEditor.rows.count()).toBeLessThanOrEqual(Number(constant.ROWS_PER_PAGE_20))
        await policyEditor.selectRowsPerPage(constant.ROWS_PER_PAGE_5);
        await policyEditor.nextPage();
        await policyEditor.previousPage();
        await policyEditor.clickViewByIndex(constant.FIRST_ROW);
        await page.pause()
        await expect(policyEditor.documentViewerModal).toBeVisible();
    })


})
