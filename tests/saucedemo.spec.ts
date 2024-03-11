import {expect, test} from "@playwright/test"

test('Localizando por data-test-id', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('teste');
    await page.waitForTimeout(1000);
});

test('Asserts Basicos', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    const loginButton = await page.locator('input#login-button');
    await expect(loginButton).toBeVisible();

    // use o 'soft' para que o teste não pare em caso de erro: 
    await expect.soft(loginButton, 'a cor do botão não corresponde').toHaveCSS('background-color','rgb(226, 35, 26)');
    await expect(loginButton).not.toHaveCSS('background-color','rgb(0, 0, 0)');
    await expect(loginButton).toHaveAttribute('value', 'LOGIN');
    
    await page.waitForTimeout(2000);
});