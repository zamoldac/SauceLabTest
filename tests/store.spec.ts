import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StorePage } from '../pages/StorePage';
import * as testData from '../testData/testData.json';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.validUser.username);
  await loginPage.fillPassword(testData.validUser.password);
  await loginPage.clickLogin();
  await loginPage.loginSuccessful();
  });

test('verify that the user can logout from the store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.hamburgerMenuBtn.click();
  await storePage.logoutBtn.click();
  await storePage.assertHamburgerMenuBtnNotPresent();
});

test('verify that the user can add and remove items to the shopping cart', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.addToCartBtnOnsie.click();
  await storePage.assertCartItemCounter("1");
  await storePage.addToCartBtnRedShirt.click();
  await storePage.assertCartItemCounter("2");
  await storePage.addToCartBtnBackPack.click();
  await storePage.assertCartItemCounter("3");
  await storePage.addToCartBtnBikeLight.click();
  await storePage.assertCartItemCounter("4");
  await storePage.addToCartBtnTShirt.click();
  await storePage.assertCartItemCounter("5");
  await storePage.addToCartBtnFJacket.click();
  await storePage.assertCartItemCounter("6");
  await storePage.remToCartBtnFJacket.click();
  await storePage.assertCartItemCounter("5");
  await storePage.remToCartBtnTShirt.click();
  await storePage.assertCartItemCounter("4");
  await storePage.remToCartBtnBikeLight.click();
  await storePage.assertCartItemCounter("3");
  await storePage.remToCartBtnBackPack.click();
  await storePage.assertCartItemCounter("2");
  await storePage.remToCartBtnRedShirt.click();
  await storePage.assertCartItemCounter("1");
  await storePage.remToCartBtnOnsie.click();
  await storePage.assertCartItemCounterNotDisplayed();
});