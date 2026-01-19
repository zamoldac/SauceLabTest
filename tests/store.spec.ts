import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StorePage } from '../pages/StorePage';
import * as testData from '../testData/testData.json';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await expect(page).toHaveTitle(testData.loginPage.pageName);
  await loginPage.loginToStore();
  });

test('verify that the user can properly open and close the side menu in the store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.clickOpenHamburgerMenu();
  await storePage.assertHamMenuAboutIsDisplayed();
  await storePage.assertHamMenuAllitemsIsDisplayed();
  await storePage.assertHamMenuResetIsDisplayed();
  await storePage.assertHamMenuLogOutIsDisplayed();
  await storePage.clickCloseHamburgerMenu();
  await storePage.assertHamMenuAboutIsNotVisible();
});


test('verify that the user can logout from the store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.clickOpenHamburgerMenu();
  await storePage.logoutFromStore();
  await storePage.assertHamburgerMenuBtnNotPresent();
});

test('verify that the user can add and remove items to the shopping cart fron the store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.addToCart(testData.availableItems.onsie);
  await storePage.assertCartItemCounter("1");
  await storePage.addToCart(testData.availableItems.backpack);
  await storePage.assertCartItemCounter("2");
  await storePage.removeFromCart(testData.availableItems.backpack)
  await storePage.assertCartItemCounter("1");
  await storePage.removeFromCart(testData.availableItems.onsie)
  await storePage.assertCartItemCounterNotDisplayed();
});

test('verify that the items added in the cart are persisted and accurate on re-login in store page context', async ({ page }) => {
  const storePage = new StorePage(page);
  const loginPage = new LoginPage(page);
  await storePage.addToCart(testData.availableItems.onsie);
  await storePage.addToCart(testData.availableItems.backpack);
  await storePage.assertCartItemCounter("2");
  await storePage.clickOpenHamburgerMenu();
  await storePage.logoutFromStore();
  await loginPage.loginToStore();
  await storePage.removeFromCart(testData.availableItems.backpack)
  await storePage.assertCartItemCounter("1");
  await storePage.removeFromCart(testData.availableItems.onsie)
  await storePage.assertCartItemCounterNotDisplayed();
});

test('verify that the user can acess item page by clicking on either title or image and navigate back to store page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.clickOnBackPackImage();
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.backToStoreFromItemDetails();
  await storePage.assertFilterOptionIsDisplayed();
  await storePage.clickOnBackPackItem();
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.backToStoreFromItemDetails();
  await storePage.assertFilterOptionIsDisplayed();
});

test('verify that the user can add or remove items to cart from items page', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.clickOnBackPackImage();
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.addToCartFromItemDetailsPage();
  await storePage.assertCartItemCounter("1");
  await storePage.removeFromCartFromItemDetailsPage();
  await storePage.assertCartItemCounterNotDisplayed();
});

test('verify that the user can navigate between cart and store pages', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.assertCartItemCounterNotDisplayed();
  await storePage.addToCart(testData.availableItems.onsie);
  await storePage.assertCartItemCounterIsDisplayed();
  await storePage.clickOnCartButton();
  await storePage.assertCartItemOnsieIsVisible();
  await storePage.clickOnContinueShopFromCartPage();
  await storePage.assertFilterOptionIsDisplayed();
});


test('verify accuracy of items added to cart from both item details and store main page as well as empty cart view', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.assertCartItemCounterNotDisplayed();
  await storePage.addToCart(testData.availableItems.onsie);
  await storePage.assertCartItemCounterIsDisplayed();
  await storePage.clickOnBackPackImage();
  await storePage.assertItemDetailsName(testData.availableItems.backpack);
  await storePage.addToCartFromItemDetailsPage();
  await storePage.assertCartItemCounter("2");
  await storePage.clickOnCartButton();
  await storePage.assertCartContinueShoppingBtnIsDisplayed();
  await storePage.removeFromCart(testData.availableItems.onsie)
  await storePage.assertCartItemCounter("1");
  await storePage.removeFromCart(testData.availableItems.backpack)
  await storePage.assertCartItemCounterNotDisplayed();
  await storePage.assertCartItemBackPackisNotVisible();
  await storePage.assertCartItemOnsieIsNotVisible();
});

test('verify that the user is not able to continue to checkout overview without information input', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.assertCartItemCounterNotDisplayed();
  await storePage.addToCart(testData.availableItems.onsie);
  await storePage.assertCartItemCounterIsDisplayed();
  await storePage.clickOnCartButton();
  await storePage.assertCartItemOnsieIsVisible();
  await storePage.clickOnCheckOutButton();
  await storePage.assertCheckoutYourInfoPageLoaded(testData.checkoutPageInfo.yourInfoPageName);
  await storePage.clickOnContinueCheckout();
  await storePage.assertCheckoutYourInfoError(testData.checkoutPageInfo.noFirstNameError);
});

test('verify that the user is able to complete a checkout with a successful purchase and price verification', async ({ page }) => {
  const storePage = new StorePage(page);
  await storePage.assertCartItemCounterNotDisplayed();
  await storePage.addToCart(testData.availableItems.onsie);
  await storePage.assertCartItemCounterIsDisplayed();
  await storePage.clickOnCartButton();
  await storePage.assertCartItemOnsieIsVisible();
  await storePage.clickOnCheckOutButton();
  await storePage.assertCheckoutYourInfoPageLoaded(testData.checkoutPageInfo.yourInfoPageName);
  await storePage.fillCheckOutUserInfo(testData.checkoutPageInfo.firstName,testData.checkoutPageInfo.lastName,testData.checkoutPageInfo.zipPostalCode);
  await storePage.clickOnContinueCheckout();
  await storePage.assertItemDetailsName(testData.availableItems.onsie);
  await storePage.assertItemCheckoutPrice(testData.checkoutPageInfo.onsiePrice);
  await storePage.clickOnCheckOutFinishBtn();
  await storePage.assertCheckoutFinishMessage(testData.checkoutPageInfo.orderCompleteMessage);
});

