import { expect, type Locator, type Page } from '@playwright/test';

export class StorePage {
  readonly page: Page;
  readonly hamburgerMenuBtn: Locator;
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


  constructor(page: Page) {
    this.page = page;
    this.hamburgerMenuBtn = page.locator("#react-burger-menu-btn");
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


  }

    async assertHamburgerMenuBtnNotPresent(){
    await expect(this.hamburgerMenuBtn).not.toBeVisible();  
  }

    async assertCartItemCounter(counter: string){
    await expect (this.cartItemCounter).toHaveText(counter);
    }
 
   async assertCartItemCounterNotDisplayed(){
    await expect(this.cartItemCounter).not.toBeVisible();
  }

  }