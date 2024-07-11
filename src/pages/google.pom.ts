import { Page } from 'playwright';

export class GooglePage {
  readonly page: Page;
  readonly searchBox = '[name="q"]';
  readonly firstResult = '#search a';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.google.com/?hl=es');
  }

  async getSearchBox() {
    return this.page.locator(this.searchBox);
  }

  async getFirstResult() {
    return this.page.locator(this.firstResult).first();
  }

  async getPageTitle() {
    return this.page.title();
  }
}
