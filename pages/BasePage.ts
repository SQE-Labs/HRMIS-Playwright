import { Page } from '@playwright/test';

export class BasePage{
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string): Promise<void> {
        await this.page.goto(url);
    }
}