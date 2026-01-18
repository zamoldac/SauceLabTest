import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as testData from '../testData/testData.json';

test('this test verifies that the login page is loaded', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
});

test('this test verifies that invalid credentials lead to unsuccessful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.invalidUser.username);
  await loginPage.fillPassword(testData.invalidUser.password);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.invalidUser.expectedError);
});

test('this test verifies that valid credentials lead to successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.validUser.username);
  await loginPage.fillPassword(testData.validUser.password);
  await loginPage.clickLogin();
  await loginPage.loginSuccessful();

});

test('this test verifies login page behavior for empty username field login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillPassword(testData.validUser.password);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.noUsername.expectedError);
});

test('this test verifies login page behavior for empty password field login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.validUser.username);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.noPassword.expectedError);

});

test('this test verifies login page behavior for locked out user credentials login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.lockedOutUser.username);
  await loginPage.fillPassword(testData.lockedOutUser.password);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.lockedOutUser.expectedError);

});

test('this test verifies login page behavior for missmatch password login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.missmatchPassword.username);
  await loginPage.fillPassword(testData.missmatchPassword.password);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.missmatchPassword.expectedError);
});

test('this test verifies login page error message dismiss', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.missmatchPassword.username);
  await loginPage.fillPassword(testData.missmatchPassword.password);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.missmatchPassword.expectedError);
  await loginPage.assertLoginErrorPresent();
  await loginPage.loginErrorClose.click();
  await loginPage.assertLoginErrorNotPresent();
});
