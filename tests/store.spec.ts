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

test('verify that the user can properly open and close the side menu in the store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.hamburgerMenuBtn.click();
  await storePage.assertHamMenuAboutIsDisplayed();
  await storePage.assertHamMenuAllitemsIsDisplayed();
  await storePage.assertHamMenuResetIsDisplayed();
  await storePage.assertHamMenuLogOutIsDisplayed();
  await storePage.closeHamburgerMenuBtn.click();
  await storePage.assertHamMenuAboutIsNotVisible();
});


test('verify that the user can logout from the store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.hamburgerMenuBtn.click();
  await storePage.logoutBtn.click();
  await storePage.assertHamburgerMenuBtnNotPresent();
});

test('verify that the user can add and remove items to the shopping cart fron the store page', async ({ page }) => {
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

test('verify that the items added in the cart are persisted and accurate on re-login in store page context', async ({ page }) => {
  const storePage = new StorePage(page);
  const loginPage = new LoginPage(page);
  await storePage.addToCartBtnOnsie.click();
  await storePage.addToCartBtnRedShirt.click();
  await storePage.assertCartItemCounter("2");
  await storePage.hamburgerMenuBtn.click();
  await storePage.logoutBtn.click();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.fillUsername(testData.validUser.username);
  await loginPage.fillPassword(testData.validUser.password);
  await loginPage.clickLogin();
  await loginPage.loginSuccessful();
  await storePage.remToCartBtnRedShirt.click();
  await storePage.assertCartItemCounter("1");
  await storePage.remToCartBtnOnsie.click();
  await storePage.assertCartItemCounterNotDisplayed();
});

test('verify that the user can acess item page by clicking on either title or image and navigate back to store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.backPackImageLink.click();
  await storePage.assertItemDetailsName(testData.selectedItem.itemName);
  await storePage.backToProductBtn.click();
  await storePage.assertFilterOptionIsDisplayed();
  await storePage.backPackTitleLink.click();
  await storePage.assertItemDetailsName(testData.selectedItem.itemName);
  await storePage.backToProductBtn.click();
  await storePage.assertFilterOptionIsDisplayed();
});

test('verify that the user can add or remove items to cart from items page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.backPackImageLink.click();
  await storePage.assertItemDetailsName(testData.selectedItem.itemName);
  await storePage.addToCartFromItemPage.click();
  await storePage.assertCartItemCounter("1");
  await storePage.removeFromCartFromItemPage.click();
  await storePage.assertCartItemCounterNotDisplayed();
});