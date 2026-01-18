import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as testData from '../testData/testData.json';

test('this test verifies that invalid credentials lead to unsuccessful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername(testData.invalidUser.username);
  await loginPage.fillPassword(testData.invalidUser.password);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.invalidUser.expectedError);

});

test('this test verifies that valid credentials lead to successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername("standard_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickLogin();
  await loginPage.loginSuccessful();

});

test('this test verifies login page behavior for empty username field login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickLogin();
  await loginPage.assertLoginError("Epic sadface: Username is required");
});

test('this test verifies login page behavior for empty password field login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername("standard_user");
  await loginPage.clickLogin();
  await loginPage.assertLoginError("Epic sadface: Password is required");

});

test('this test verifies login page behavior for locked out user credentials login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername("locked_out_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickLogin();
  await loginPage.assertLoginError("Epic sadface: Sorry, this user has been locked out.");

});

test('this test verifies login page behavior for missmatch password login attempt', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername("standard_user");
  await loginPage.fillPassword("xyz");
  await loginPage.clickLogin();
  await loginPage.assertLoginError("Epic sadface: Username and password do not match any user in this service");

});
