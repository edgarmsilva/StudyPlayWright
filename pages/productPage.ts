import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly produtctTitle: Locator;
  readonly inpuPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.produtctTitle = page.locator('div.product_label');
  }

  async validateTitle() {
    await expect(this.produtctTitle).toBeVisible();
    await expect(this.produtctTitle).toHaveText('Products');
  }

}