import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginBtn: Locator;
  readonly pageTitle: Locator;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly loginError: Locator;
  readonly productPage: Locator;
  readonly loginErrorClose: Locator;



  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText("Swag Labsa");
    this.userNameField = page.locator("#user-name");
    this.passwordField = page.locator("#password");
    this.loginBtn = page.locator("#login-button");
    this.productPage = page.getByText("Products");
    this.loginError = page.locator("[data-test='error']");
    this.loginErrorClose = page.locator("[data-test='error-button']");
  }

  async goToLoginPage() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async verifyTitle() {
    await this.pageTitle.isVisible();
  }

    async fillUsername(username: string) {
    await this.userNameField.fill(username);
  }

    async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

    async clickLogin() {
    await this.loginBtn.click();
    }
    
    async loginSuccessful(){
    await expect(this.productPage).toBeVisible();
    }

    async assertLoginFailed(){
    await expect(this.productPage).not.toBeVisible();  
    }

    async assertLoginError(error:string){
    await expect (this.loginError).toHaveText(error);
    }
    
    async assertLoginErrorPresent(){
    await expect(this.loginErrorClose).toBeVisible();
    }

    async assertLoginErrorNotPresent(){
    await expect(this.loginErrorClose).not.toBeVisible();  
    }
  }