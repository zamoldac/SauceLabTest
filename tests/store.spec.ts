import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as testData from '../testData/testData.json';

test('this test verifies listed items have images displayed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(loginPage.verifyTitle).toBeTruthy();
  await loginPage.fillUsername(testData.invalidUser.username);
  await loginPage.fillPassword(testData.invalidUser.password);
  await loginPage.clickLogin();
  await loginPage.assertLoginError(testData.invalidUser.expectedError);

});