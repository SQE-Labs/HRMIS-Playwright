
import * as fs from 'fs';
import * as path from 'path';
import { expect, Page, Download, Locator, Response, BrowserContext } from '@playwright/test';


export class CommonUtils {


    async verifyXLSXDownload(
        page: Page,
        exportTrigger: () => Promise<void>
    ): Promise<string> {
        const downloadDir = path.join(process.cwd(), 'Download');

        // Ensure the Download directory exists
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        // Auto-delete all files in the folder
        const oldFiles = fs.readdirSync(downloadDir);
        for (const file of oldFiles) {
            fs.unlinkSync(path.join(downloadDir, file));
        }
        // Wait for download and trigger export
        const [download] = await Promise.all([
            page.waitForEvent('download', { timeout: 30000 }),
            exportTrigger(),
        ]);

        const downloadedFile = await download.suggestedFilename();
        const downloadPath = path.join(downloadDir, downloadedFile);

        await download.saveAs(downloadPath);

        return downloadPath;
    }




    async verifyRowsSorting(data: string[], sortingType = 'asc') {
        const trimmedData = data.map(s => s.trim());

        let expectedSortedData = [...trimmedData];

        // Filter out values that are valid dates
        const validDates = expectedSortedData.filter(val => !isNaN(Date.parse(val)));

        const isMostlyDates = validDates.length > expectedSortedData.length * 0.8; // At least 80% must be valid dates

        const isNumeric = expectedSortedData.every(val => {
            const cleaned = val.replace(/,/g, '');
            return !isNaN(Number(cleaned));
        });

        if (isNumeric) {
            expectedSortedData.sort((a, b) => {
                const numA = Number(a.replace(/,/g, ''));
                const numB = Number(b.replace(/,/g, ''));
                return sortingType === 'asc' ? numA - numB : numB - numA;
            });
        } else if (isMostlyDates) {
            expectedSortedData = validDates.sort((a, b) => {
                const dateA = new Date(a).getTime();
                const dateB = new Date(b).getTime();
                return sortingType === 'asc' ? dateA - dateB : dateB - dateA;
            });
        } else {
            expectedSortedData.sort((a, b) => {
                return sortingType === 'asc'
                    ? a.localeCompare(b, 'en', { sensitivity: 'variant', numeric: true })
                    : b.localeCompare(a, 'en', { sensitivity: 'variant', numeric: true });
            });
        }

        // Print out only first few for debug purposes
        console.log(`Trimmed Data (${sortingType}):`, trimmedData.slice(0, 10));
        console.log(`Expected Sorted Data (${sortingType}):`, expectedSortedData.slice(0, 10));

        // Match logic: filter both arrays to only include valid dates
        if (isMostlyDates) {
            const actualValidDates = trimmedData.filter(val => !isNaN(Date.parse(val)));
            expect(actualValidDates).toEqual(expectedSortedData);
        } else {
            expect(trimmedData).toEqual(expectedSortedData);
        }
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

    async uploadFile(
        fileName: string,
        page: Page,

    ) {
        let fileInputSelector = "//input[@type = 'file']"
        // Construct full cross-platform file path
        const filePath = path.resolve(__dirname, '..', 'files', fileName);

        // Validate file before uploading
        expect(fs.existsSync(filePath)).toBe(true);
        const fileStats = fs.statSync(filePath);
        expect(fileStats.size).toBeGreaterThan(0);
        expect(path.extname(filePath)).toMatch(/\.(xlsx|docx|pdf|png)$/); // adjust if needed

        // Upload file
        await page.setInputFiles(fileInputSelector, filePath);
        await page.waitForSelector(fileInputSelector, { state: 'attached' });

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
        expect(path.extname(filePath)).toMatch(/\.(xlsx|docx|pdf|png)$/); // adjust if needed

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


    async openYopmailandNavigaeToVerifyPopup(yopmailUrl: string, context: BrowserContext, emailID?: string) {

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
    

    async pdfViewerDownloadTrigger(page: Page): Promise<void> {
        const downloadButton = page.locator('pdf-viewer#viewer')
            .locator('viewer-toolbar#toolbar')
            .locator('viewer-download-controls#downloads')
            .locator('cr-icon-button#save');

        await downloadButton.waitFor({ state: 'visible' });
        await downloadButton.click();
    }
    
    async downloadAndVerifyFile(
        page: Page,
        downloadTrigger: () => Promise<void>,
        saveFolder: string = 'C:\\Users\\Caelius\\HRMIS-Playwright\\Download',
        saveFileName?: string
    ): Promise<string> {

        // 1️⃣ Ensure folder exists
        if (!fs.existsSync(saveFolder)) {
            fs.mkdirSync(saveFolder, { recursive: true });
        }

        // 2️⃣ Delete all existing files in the folder
        const oldFiles = fs.readdirSync(saveFolder);
        for (const file of oldFiles) {
            fs.unlinkSync(path.join(saveFolder, file));
        }

        // 3️⃣ Trigger the download
        await downloadTrigger();

        // 4️⃣ Wait for file to appear in folder
        const timeout = 30000; // 30s
        const pollingInterval = 500; // check every 0.5s
        const start = Date.now();
        let downloadedFile: string | null = null;

        while (Date.now() - start < timeout) {
            const files = fs.readdirSync(saveFolder);
            if (files.length > 0) {
                downloadedFile = files[0];
                break;
            }
            await new Promise(res => setTimeout(res, pollingInterval));
        }

        if (!downloadedFile) {
            throw new Error(' File download failed or took too long');
        }

        // 5️⃣ Rename file if custom name provided
        const filePath = path.join(saveFolder, saveFileName || downloadedFile);
        if (saveFileName) {
            fs.renameSync(path.join(saveFolder, downloadedFile), filePath);
        }

        console.log('file downloaded successfully at:', filePath);
        return filePath;
    }
}






