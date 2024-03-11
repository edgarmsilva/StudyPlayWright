// https://the-internet.herokuapp.com/forgot_password
import {expect, test} from "@playwright/test"

test('Acoes Basicas 1', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/forgot_password');
    const emailInput = await page.locator('input#email');
    await emailInput.fill('startqa@hotmail.com');
    await emailInput.fill('');
    await emailInput.pressSequentially('123456');
    await expect(emailInput).toHaveValue('123456');

    //page.click()
    await page.goto('https://the-internet.herokuapp.com/')
    const checkBoxesLink = page.locator('a[href="/checkboxes"]');
    await checkBoxesLink.click();

    //checkboxes
    const checkBox1 = page.locator('input[type="checkbox"]').nth(0)
    await checkBox1.check();

    const checkBox2 = page.locator('input[type="checkbox"]').nth(1)
    await checkBox2.uncheck();

    await expect(checkBox1).toBeChecked();
    await expect(checkBox2).not.toBeChecked();

    await page.waitForTimeout(1000);
});

test('Acoes Basicas 2', async ({ page }) => {
    
    
    // dropdowns
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    const dropDown = page.locator('select#dropdown');
    await dropDown.selectOption('1');
    await expect(dropDown).toHaveValue('1');  
    await dropDown.selectOption({label: 'Option 2'});
    await expect(dropDown).toHaveValue('2');

    // hover
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const img1 = page.locator('div.figure').nth(0);
    const img2 = page.locator('div.figure').nth(1);
    const img3 = page.locator('div.figure').nth(2);

    const imgInfo1 = img1.locator('.figcaption');
    const imgInfo2 = img2.locator('.figcaption');
    const imgInfo3 = img3.locator('.figcaption');

    await img1.hover();

    await expect(imgInfo1).toBeVisible();
    await expect(imgInfo2).not.toBeVisible();
    await expect(imgInfo3).not.toBeVisible();

    await img2.hover();

    await expect(imgInfo1).not.toBeVisible();
    await expect(imgInfo2).toBeVisible();
    await expect(imgInfo3).not.toBeVisible();

    await imgInfo2.getByRole('link').click();

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/users/2');
    // // ou:
    // await imgInfo2.locator('a').click();

    // await img3.hover();

    // await expect(imgInfo1).not.toBeVisible();
    // await expect(imgInfo2).not.toBeVisible();
    // await expect(imgInfo3).toBeVisible();


    await page.waitForTimeout(2000);
});