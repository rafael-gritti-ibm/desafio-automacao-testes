import { test, expect } from '@playwright/test';
import { users, products } from '../fixtures/test-data';

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com")

    const username = page.locator('#user-name');
    const password = page.locator('#password');
    const loginButton = page.locator('#login-button');

    await username.fill(users.standard.username);
    await password.fill(users.standard.password);
    await loginButton.click();
});

test.describe('Inventory', () => {
    test('Adicionar e Remover itens', async ({ page }) => {
        const cartBadge = page.locator('.shopping_cart_badge');

        //Cenário #011
        await page.locator(`text=${products[0]}`).locator('xpath=ancestor::div[@class="inventory_item"]').locator('button').click();
        await page.screenshot({ path: "evidences/add-item-1.png" }); //salvando evidência

        await page.locator(`text=${products[1]}`).locator('xpath=ancestor::div[@class="inventory_item"]').locator('button').click();
        await page.screenshot({ path: "evidences/add-item-2.png" }); //salvando evidência

        await page.locator(`text=${products[2]}`).locator('xpath=ancestor::div[@class="inventory_item"]').locator('button').click();
        await page.screenshot({ path: "evidences/add-item-3.png" }); //salvando evidência

        await expect(cartBadge).toHaveText('3');

        //Cenário #012
        await page.locator(`text=${products[1]}`).locator('xpath=ancestor::div[@class="inventory_item"]').locator('button').click();
        await page.screenshot({ path: "evidences/remove-item-1.png" }); //salvando evidência

        await expect(cartBadge).toHaveText('2');
    });
});