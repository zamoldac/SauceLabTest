import { expect, type Locator, type Page } from '@playwright/test';
import * as testData from '../testData/testData.json';

export class StorePage {
  readonly page: Page;
  readonly hamburgerMenuBtn: Locator;
  readonly closeHamburgerMenuBtn: Locator;
  readonly logoutBtn: Locator;
  readonly addToCartBtnBackPack: Locator;
  readonly addToCartBtnBikeLight: Locator;
  readonly addToCartBtnTShirt: Locator;
  readonly addToCartBtnFJacket: Locator;
  readonly addToCartBtnOnsie: Locator;
  readonly addToCartBtnRedShirt: Locator;
  readonly remToCartBtnBackPack: Locator;
  readonly remToCartBtnBikeLight: Locator;
  readonly remToCartBtnTShirt: Locator;
  readonly remToCartBtnFJacket: Locator;
  readonly remToCartBtnOnsie: Locator;
  readonly remToCartBtnRedShirt: Locator;
  readonly cartBtn: Locator;
  readonly cartItemCounter: Locator;
  readonly hamMenuAllItems: Locator;
  readonly hamMenuAbout: Locator;
  readonly hamMenuReset: Locator;
  readonly backPackImageLink: Locator;
  readonly backPackTitleLink: Locator;
  readonly itemDetailsName: Locator;
  readonly backToProductBtn: Locator;
  readonly filterOption: Locator;
  readonly addToCartFromItemPage: Locator;
  readonly removeFromCartFromItemPage: Locator;
  readonly cartContinueShopBtn: Locator;
  readonly cartItemOnsieName: Locator;
  readonly cartItemBackPackName: Locator;
  readonly checkoutBtn: Locator;
  readonly checkoutContinueBtn: Locator;
  readonly checkoutYorInfoPage: Locator;
  readonly checkoutErrorYourInfoPage: Locator;
  readonly checkoutFirstNameField: Locator;
  readonly checkoutLastNameField: Locator;
  readonly checkoutZipPostalField: Locator;
  readonly checkoutFinishBtn: Locator;
  readonly checkoutFinishMessage: Locator;
  readonly checkoutItemPrice: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItemPrice: Locator;


  constructor(page: Page) {
    this.page = page;
    this.hamburgerMenuBtn = page.locator("#react-burger-menu-btn");
    this.closeHamburgerMenuBtn = page.locator("#react-burger-cross-btn")
    this.logoutBtn = page.locator("#logout_sidebar_link");
    this.addToCartBtnBackPack = page.locator("#add-to-cart-sauce-labs-backpack");
    this.addToCartBtnBikeLight = page.locator("#add-to-cart-sauce-labs-bike-light");
    this.addToCartBtnTShirt = page.locator("#add-to-cart-sauce-labs-bolt-t-shirt");
    this.addToCartBtnFJacket = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
    this.addToCartBtnOnsie = page.locator("#add-to-cart-sauce-labs-onesie");
    this.addToCartBtnRedShirt = page.locator("[id='add-to-cart-test.allthethings()-t-shirt-(red)']");
    this.remToCartBtnBackPack = page.locator("#remove-sauce-labs-backpack");
    this.remToCartBtnBikeLight = page.locator("#remove-sauce-labs-bike-light");
    this.remToCartBtnTShirt = page.locator("#remove-sauce-labs-bolt-t-shirt");
    this.remToCartBtnFJacket = page.locator("#remove-sauce-labs-fleece-jacket");
    this.remToCartBtnOnsie = page.locator("#remove-sauce-labs-onesie");
    this.remToCartBtnRedShirt = page.locator("[id='remove-test.allthethings()-t-shirt-(red)']");
    this.cartBtn = page.locator("#shopping_cart_container");
    this.cartItemCounter = page.locator("[data-test='shopping-cart-badge']");
    this.hamMenuAllItems = page.locator("#inventory_sidebar_link");
    this.hamMenuAbout = page.locator("#about_sidebar_link");
    this.hamMenuReset = page.locator("#reset_sidebar_link");
    this.backPackImageLink = page.locator("#item_4_img_link");
    this.backPackTitleLink = page.locator("#item_4_title_link");
    this.itemDetailsName = page.locator("[data-test='inventory-item-name']");
    this.backToProductBtn = page.locator("#back-to-products");
    this.filterOption = page.locator("[data-test='active-option']");
    this.addToCartFromItemPage = page.locator("#add-to-cart");
    this.removeFromCartFromItemPage = page.locator("#remove");
    this.cartContinueShopBtn = page.locator("#continue-shopping");
    this.cartItemOnsieName = page.locator("#item_2_title_link");
    this.cartItemBackPackName = page.locator("#item_4_title_link");
    this.checkoutBtn = page.locator("#checkout");
    this.checkoutContinueBtn = page.locator("#continue");
    this.checkoutYorInfoPage = page.locator("[data-test='title']");
    this.checkoutErrorYourInfoPage = page.locator("[data-test='error']");
    this.checkoutFirstNameField = page.locator("#first-name");
    this.checkoutLastNameField = page.locator("#last-name");
    this.checkoutZipPostalField = page.locator("#postal-code");
    this.checkoutFinishBtn = page.locator("#finish")
    this.checkoutFinishMessage = page.locator("[data-test='complete-header']");
    this.checkoutItemPrice = page.locator("[data-test='inventory-item-price']")
    this.inventoryContainer = page.locator("#inventory_container")
    this.inventoryItemPrice = page.locator("[data-test=iinventory-item-price']")


  }

    async assertHamburgerMenuBtnNotPresent(){
    await expect(this.hamburgerMenuBtn).not.toBeVisible();  
    }

    async addToCart(itemName:string){
      const item = this.page.getByText(itemName).locator("..").locator("..").locator("..");
      item.getByText("Add to cart").click();
    }

    async removeFromCart(itemName:string){
      const item = this.page.getByText(itemName).locator("..").locator("..").locator("..");
      item.getByText("Remove").click();
    }

    async assertCheckoutYourInfoError(error: string){
    await expect (this.checkoutErrorYourInfoPage).toHaveText(error);
    }

    async assertItemCheckoutPrice(itemprice: string){
    await expect (this.checkoutItemPrice).toHaveText(itemprice);
    }

    async assertCheckoutFinishMessage(message: string){
    await expect (this.checkoutFinishMessage).toHaveText(message);
    }

    async assertCartItemCounter(counter: string){
    await expect (this.cartItemCounter).toHaveText(counter);
    }

    async assertCheckoutYourInfoPageLoaded(yourInfoPageName: string){
    await expect (this.checkoutYorInfoPage).toHaveText(yourInfoPageName);
    }

    async assertItemDetailsName(itemName: string){
    await expect (this.itemDetailsName).toHaveText(itemName);
    }
 
    async assertCartItemCounterNotDisplayed(){
    await expect(this.cartItemCounter).not.toBeVisible();
    }

    async assertCartItemCounterIsDisplayed(){
    await expect(this.cartItemCounter).toBeVisible();
    }

    async assertHamMenuAllitemsIsDisplayed(){
    await expect(this.hamMenuAllItems).toBeVisible();
    }

    async assertHamMenuAboutIsDisplayed(){
    await expect(this.hamMenuAbout).toBeVisible();
    }

    async assertHamMenuResetIsDisplayed(){
    await expect(this.hamMenuReset).toBeVisible();
    }

    async assertHamMenuAboutIsNotVisible(){
    await expect(this.hamMenuAbout).not.toBeVisible();
    }

    async assertHamMenuLogOutIsDisplayed(){
    await expect(this.logoutBtn).toBeVisible();
    }

    async assertFilterOptionIsDisplayed(){
    await expect(this.filterOption).toBeVisible();
    }

     async assertCartContinueShoppingBtnIsDisplayed(){
     await expect(this.cartContinueShopBtn).toBeVisible();
    }

     async assertCartItemOnsieIsNotVisible(){
     await expect(this.cartItemOnsieName).not.toBeVisible();
    }

     async assertCartItemOnsieIsVisible(){
     await expect(this.cartItemOnsieName).toBeVisible();
    }

     async assertCartItemBackPackisNotVisible(){
     await expect(this.cartItemBackPackName).not.toBeVisible();
    }

     async clickOpenHamburgerMenu(){
     await this.hamburgerMenuBtn.click();
     }

     async clickCloseHamburgerMenu(){
     await this.closeHamburgerMenuBtn.click();
     }
      
     async logoutFromStore(){
     await this.logoutBtn.click();
      }

     async backToStoreFromItemDetails(){
      await this.backToProductBtn.click();
     }

     async clickOnBackPackItem(){
      await this.backPackTitleLink.click();
     }

     async clickOnBackPackImage(){
      await this.backPackImageLink.click();
     }

     async addToCartFromItemDetailsPage(){
      await this.addToCartFromItemPage.click();
     }

     async removeFromCartFromItemDetailsPage(){
      await this.removeFromCartFromItemPage.click();
     }

     async clickOnCartButton(){
      await expect(this.cartBtn).toBeVisible();
      await this.cartBtn.click();
     }

     async clickOnCheckOutButton(){
      await this.checkoutBtn.click();
     }

     async clickOnContinueShopFromCartPage(){
      await this.cartContinueShopBtn.click();
     }

     async clickOnContinueCheckout(){
      await this.checkoutContinueBtn.click();
     }

     async clickOnCheckOutFinishBtn(){
      await this.checkoutFinishBtn.click();
     }

     async fillCheckOutUserInfo(){
       await this.checkoutFirstNameField.fill(testData.checkoutPageInfo.firstName);
       await this.checkoutLastNameField.fill(testData.checkoutPageInfo.lastName);
       await this.checkoutZipPostalField.fill(testData.checkoutPageInfo.zipPostalCode);
     }

  }