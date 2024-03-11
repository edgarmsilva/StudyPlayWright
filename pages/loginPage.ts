import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inpuUserName: Locator;
  readonly inpuPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inpuUserName = page.locator('input#user-name');
    this.inpuPassword = page.locator('input#password');    
    this.loginButton = page.locator('input#login-button');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }

  async login() {
    await this.inpuUserName.fill('standard_user');
    await this.inpuPassword.fill('secret_sauce');
    await this.loginButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
  }

}