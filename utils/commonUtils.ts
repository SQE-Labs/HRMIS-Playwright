
import * as fs from 'fs';
import * as path from 'path';
import { expect, Page, Download, Locator } from '@playwright/test';

export class CommonUtils {

    async verifyXLSXDownload(page: Page, exportTrigger: () => Promise<void>): Promise<void> {
        const [download] = await Promise.all([
            page.waitForEvent('download', { timeout: 5000 }),
            exportTrigger(),
        ]);

        const downloadedFile = await download.suggestedFilename();
        expect(downloadedFile).toBeTruthy();

        const downloadDir = path.join(process.cwd(), 'Download');
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        const downloadPath = path.join(downloadDir, downloadedFile);
        await download.saveAs(downloadPath);

        expect(fs.existsSync(downloadPath)).toBe(true);

        const fileStats = fs.statSync(downloadPath);
        expect(fileStats.size).toBeGreaterThan(0);

        expect(path.extname(downloadedFile)).toBe('.xlsx');
        console.log(`File successfully downloaded: ${downloadPath}`);

        fs.unlinkSync(downloadPath);
        expect(fs.existsSync(downloadPath)).toBe(false);
        console.log(`File cleaned up: ${downloadPath}`);
    }

    async verifyRowsSorting(rowsLocator, sortingType = 'asc') {
        let elementsText = (await rowsLocator.allTextContents()).map((s: string) => s.trim());
        // console.log("unsorted " + elementsText)
        let sortedElements;
        if (sortingType.toLowerCase().includes("asc")) {

            sortedElements = [...elementsText].sort((a: string, b: any) => a.localeCompare(b));
        }
        else {
            sortedElements = [...elementsText].sort((a: any, b: string) => b.localeCompare(a));
        }
        //console.log("sorted" + sortedElements)

        expect(elementsText).toEqual(sortedElements)

    }
    async generateRandomInteger(length: number) {
        const characters = '0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async generateRandomAlphaNum(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0234567891';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async generateRandomString(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async uploadAndVerifyFile(
        fileName: string,
        page: Page,
        submitButton?: Locator,
        popupMessage?: Locator
    ) {
        let fileInputSelector = "//input[@type = 'file']"
        // Construct full cross-platform file path
        const filePath = path.resolve(__dirname, '..', 'files', fileName);

        // Validate file before uploading
        expect(fs.existsSync(filePath)).toBe(true);
        const fileStats = fs.statSync(filePath);
        expect(fileStats.size).toBeGreaterThan(0);
        expect(path.extname(filePath)).toMatch(/\.xlsx|\.docx|\.pdf/); // adjust if needed

        // Upload file
        await page.setInputFiles(fileInputSelector, filePath);
        await page.waitForSelector(fileInputSelector, { state: 'attached' });


        // Submit
        if (!submitButton) {
            throw new Error('Submit button locator is not provided.');
        }
        await submitButton.click();
        // await popupMessage.waitFor({ state: 'visible' });

        // // Log result
        // const messages = await page.locator('div>ol').allInnerTexts();
        // console.log(`Upload result for ${fileName}:\n`, messages);

        // // Close popup
        // await page.locator(".btn-close").click();
        // await page.waitForTimeout(500);
    }


    async openYopmailandNavigaeToVerifyPopup(yopmailUrl: string, context, emailID?: string) {

        // 1.  open new tab for Yopmail
        const yopmailPage = await context.newPage();
        await yopmailPage.goto(yopmailUrl);

        // 2. Click the first email (in ifinbox iframe)
        const inboxFrame = yopmailPage.frameLocator('iframe#ifinbox');
        await inboxFrame.locator('text=HRMIS SYSTEM').first().click();

        // switch to email content
        const mailFrame = yopmailPage.frameLocator('iframe#ifmail');

        // wait for and click the Onboard Employee Form link
        const onboardLink = mailFrame.locator('text=Onboard Employee Form');

        const [newTab] = await Promise.all([
            // waits for new tab
            context.waitForEvent('page'),
            onboardLink.click()
        ]);

        // wait for the new tab to load
        await newTab.waitForLoadState('load');

        return newTab;
    }

    async getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

}
