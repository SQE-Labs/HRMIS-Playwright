import { test, expect } from '@playwright/test'
import path from 'path'
import { LoginPage } from '../../pages/LoginPage'
import { PolicyEditor } from '../../pages/PolicyEditor'
import testData from '../../testData/testData.json'
import {
    DummyResume,
    POLICY_DESCRIPTION,
    POLICY_REGION,
    POLICY_TITLE_PREFIX,
    POLICY_UPDATED_DESCRIPTION,
    POLICY_UPDATED_REGION,
    POLICY_UPDATED_TITLE_PREFIX,
    POLICY_UPDATED_VALID_FROM_DAY,
    POLICY_VALID_FROM_DAY,
} from '../../utils/constants'

let policyEditor: PolicyEditor

test.describe.serial('Policy Editor Add and Update Policy', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.validLogin(testData.SuperUser.UserEmail, testData.SuperUser.UserPassword)

        policyEditor = new PolicyEditor(page)
        await policyEditor.expandTab()
        await policyEditor.navigateToPolicyEditorPage()
    })

    test('HRMIS_CP_1 HRMIS_CP_2 HRMIS_CP_6 HRMIS_CP_19 HRMIS_CP_20 HRMIS_CP_21 Add a new policy @smoke @reg @ci', async ({ page }) => {
        const policyTitle = `${POLICY_TITLE_PREFIX}${Date.now()}`
        const policyDocumentPath = path.resolve(process.cwd(), 'files', DummyResume)

        await policyEditor.clickAddPolicy()
        await expect(policyEditor.policyTitleInput).toBeVisible()

        await policyEditor.fillPolicyTitle(policyTitle)
        await policyEditor.selectRegion('India')
        await policyEditor.uploadPolicyDocument(policyDocumentPath)
        await policyEditor.selectValidFromDate(4)
        await policyEditor.fillPolicyDescription('Test')
        await policyEditor.submitPolicy()

        await policyEditor.searchPolicy(policyTitle)
        await expect(page.getByRole('cell', { name: policyTitle, exact: true })).toBeVisible()
    })

    test('HRMIS_CP_11 HRMIS_CP_12 HRMIS_CP_13 Update, Inactivate and Activate Policy @smoke @reg @ci', async ({ page }) => {
        const createdPolicy = {
            title: `${POLICY_TITLE_PREFIX}${Date.now()}`,
            region: POLICY_REGION,
            validFromDay: POLICY_VALID_FROM_DAY,
            description: POLICY_DESCRIPTION,
        }

        const updatedPolicy = {
            title: `${POLICY_UPDATED_TITLE_PREFIX}${Date.now()}`,
            region: POLICY_UPDATED_REGION,
            validFromDay: POLICY_UPDATED_VALID_FROM_DAY,
            description: POLICY_UPDATED_DESCRIPTION,
        }

        const createdPolicyDocumentPath = path.resolve(process.cwd(), 'files', DummyResume)

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
})
