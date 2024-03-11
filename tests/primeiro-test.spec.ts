import {test} from "@playwright/test"

test('Visitando página Playwight', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const text = await page.getByText('enables reliable end-to-end testing for modern web apps.').textContent();
    console.log(text);
    await page.locator('.getStarted_Sjon').click();
    // await page.getByText('Get started').click();
    
    
});