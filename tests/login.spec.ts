import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('verify login failed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  // Expect a title "to contain" a substring.
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername("test");
  await loginPage.fillPassword("pass");
  await loginPage.clickLogin();
  await loginPage.assertLoginFailed();

});

test('verify login successful', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  // Expect a title "to contain" a substring.
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername("standard_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickLogin();
  await loginPage.loginSuccessful();

});
