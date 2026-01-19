import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StorePage } from '../pages/StorePage';
import * as testData from '../testData/testData.json';
import { assert } from 'node:console';

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
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.backToProductBtn.click();
  await storePage.assertFilterOptionIsDisplayed();
  await storePage.backPackTitleLink.click();
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.backToProductBtn.click();
  await storePage.assertFilterOptionIsDisplayed();
});

test('verify that the user can add or remove items to cart from items page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.backPackImageLink.click();
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.addToCartFromItemPage.click();
  await storePage.assertCartItemCounter("1");
  await storePage.removeFromCartFromItemPage.click();
  await storePage.assertCartItemCounterNotDisplayed();
});

test('verify that the user can navigate between cart and store pages', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.addToCartBtnOnsie.click();
  await storePage.cartBtn.click();
  await storePage.assertCartItemOnsieIsVisible();
  await storePage.cartContinueShopBtn.click();
  await storePage.assertFilterOptionIsDisplayed();
});


test('verify accuracy of items added to cart from both item details and store main page as well as empty cart view', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.addToCartBtnOnsie.click();
  await storePage.backPackImageLink.click();
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.addToCartFromItemPage.click();
  await storePage.assertCartItemCounter("2");
  await storePage.cartBtn.click();
  await storePage.assertCartContinueShoppingBtnIsDisplayed();
  await storePage.remToCartBtnOnsie.click();
  await storePage.assertCartItemCounter("1");
  await storePage.remToCartBtnBackPack.click();
  await storePage.assertCartItemCounterNotDisplayed();
  await storePage.assertCartItemBackPackisNotVisible();
  await storePage.assertCartItemOnsieIsNotVisible();
});

test('verify that the user is not able to continue to checkout overview without information input', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.addToCartBtnOnsie.click();
  await storePage.cartBtn.click();
  await storePage.assertCartItemOnsieIsVisible();
  await storePage.checkoutBtn.click();
  await storePage.assertCheckoutYourInfoPageLoaded(testData.checkoutPageInfo.yourInfoPageName);
  await storePage.checkoutContinueBtn.click();
  await storePage.assertCheckoutYourInfoError(testData.checkoutPageInfo.noFirstNameError);
});

test('verify that the user is able to complete a checkout with a successful purchase and price verification', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.addToCartBtnOnsie.click();
  await storePage.cartBtn.click();
  await storePage.assertCartItemOnsieIsVisible();
  await storePage.checkoutBtn.click();
  await storePage.assertCheckoutYourInfoPageLoaded(testData.checkoutPageInfo.yourInfoPageName);
  await storePage.checkoutFirstNameField.fill(testData.checkoutPageInfo.firstName);
  await storePage.checkoutLastNameField.fill(testData.checkoutPageInfo.lastName);
  await storePage.checkoutZipPostalField.fill(testData.checkoutPageInfo.zipPostalCode);
  await storePage.checkoutContinueBtn.click();
  await storePage.assertItemDetailsName(testData.availableItems.onsie);
  await storePage.assertItemCheckoutPrice(testData.checkoutPageInfo.onsiePrice);
  await storePage.checkoutFinishBtn.click();
  await storePage.assertCheckoutFinishMessage(testData.checkoutPageInfo.orderCompleteMessage);
});

