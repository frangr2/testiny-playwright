import { GooglePage } from '../pages/google.pom';
import { Page } from '@playwright/test';
// import { handleErrors } from '../steps/errorHandling';

export class GoogleActions extends GooglePage {
    constructor(page: Page) {
        super(page);
    }

    // @handleErrors
    async searchFor(term: string) {
        const searchBox = await this.getSearchBox();
        await searchBox.click();
        await searchBox.fill(term);
        await searchBox.press('Enter');
    }

    // @handleErrors
    async clickFirstResult() {
        const firstResult = await this.getFirstResult();
        await firstResult.click();
    }

    // @handleErrors
    async verifyTitleContains(term: string) {
        const title = await this.getPageTitle();
        if (!title.includes(term)) {
            throw new Error(
                `Expected title to contain '${term}', but got '${title}'`
            );
        }
    }
}
