import { expect, type Locator, type Page } from '@playwright/test';

export class StorePage {
  readonly page: Page;
  readonly pageTitle: Locator;



  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText("Swag Labsa");
  }

  async goToLoginPage() {
    await this.page.goto('https://www.saucedemo.com');
  }
  }