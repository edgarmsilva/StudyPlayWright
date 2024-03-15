import {expect, test} from '@playwright/test';
import { defineConfig } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productPage';


// https://www.saucedemo.com/v1/

/*
1: - Login com sucesso:
- usar usuário standard_user
- verficar URL da página
- Verificar pelo menos 1 item da página final (visible)
*/

export default defineConfig({
    reporter: [['html', { outputFolder: 'my-report' }]],
  });

test('1 - Login com sucesso', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');

    const inpuUserName = await page.locator('input#user-name');
    const inpuPassword = await page.locator('input#password');    
    const loginButton = await page.locator('input#login-button');
    await expect(loginButton).toBeVisible();


    // para debug: adicionar o page.pause() para executar no debug todos os steps e parar nesse ponto (é como se fosse um breakpoint)
    // await page.pause()

    await inpuUserName.fill('standard_user');
    await inpuPassword.fill('secret_sauce');
    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

    const produtctTitle = await page.locator('div.product_label');

    await expect(produtctTitle).toBeVisible();
    await expect(produtctTitle).toHaveText('Products');
    
});


test('1a - Login com sucesso - Page Object', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.validateTitle();
});

/*
2: - Login com usuário Locked:
- usar usuário locked_out_user
- verficar mensagem de erro
*/
test('2 - Login com usuário Locked', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');

    const errorMessage = await page.getByTestId('error');
    await expect(errorMessage).not.toBeVisible();

    const inpuUserName = await page.locator('input#user-name');
    const inpuPassword = await page.locator('input#password');    
    const loginButton = await page.locator('input#login-button');
    await expect(loginButton).toBeVisible();

    await inpuUserName.fill('locked_out_user');
    await inpuPassword.fill('secret_sauce');
    await loginButton.click();

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    
});


/*
3: - Login com senha errada
- verficar mensagem de erro
*/

test('3 - Login com senha errada', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    const errorMessage = await page.getByTestId('error');
    await expect(errorMessage).not.toBeVisible();

    const inpuUserName = await page.locator('input#user-name');
    const inpuPassword = await page.locator('input#password');    
    const loginButton = await page.locator('input#login-button');
    await expect(loginButton).toBeVisible();

    await inpuUserName.fill('standard_user');
    await inpuPassword.fill('123456789');
    await loginButton.click();



    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    
});