import { test, expect, Locator } from '@playwright/test';
import { users } from '../fixtures/test-data';

let username: Locator;
let password: Locator;
let loginButton: Locator;
let errorMessage: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com")

    username = page.locator('#user-name');
    password = page.locator('#password');
    loginButton = page.locator('#login-button');
    errorMessage = page.locator('[data-test="error"]');
});

test.describe('Login', () => {
    //Cenário #006
    test('Login realizado com sucesso', async ({ page }) => {
        await username.fill(users.standard.username);
        await password.fill(users.standard.password);
        await page.screenshot({ path: "evidences/username-password-correto.png" }); //salvando evidência
        await loginButton.click();
        await expect(page).toHaveURL(/inventory/);
        await page.screenshot({ path: "evidences/login-realizado.png" }); //salvando evidência
    });

    //Cenários #007 e #008
    test('Login não realizado, usuário e senha incorretos', async ({ page }) => {
        await username.fill(users.user.username);
        await password.fill(users.user.password);
        await page.screenshot({ path: "evidences/username-password-incorreto.png" }); //salvando evidência
        await loginButton.click();
        await expect(errorMessage).toBeVisible();
        await page.screenshot({ path: "evidences/error-username-password-not-match.png" }); //salvando evidência
    });

    //Cenário #009
    test('Login não realizado, usuário e senha não preenchidos', async ({ page }) => {
        await loginButton.click();
        await expect(errorMessage).toBeVisible();
        await page.screenshot({ path: "evidences/error-username-required.png" }); //salvando evidência
    });

    //Cenário #010
    test('Login não realizado, senha não preenchida', async ({ page }) => {
        await username.fill(users.standard.username);
        await page.screenshot({ path: "evidences/password-not-filled.png" }); //salvando evidência
        await loginButton.click();
        await expect(errorMessage).toBeVisible();
        await page.screenshot({ path: "evidences/error-password-required.png" }); //salvando evidência
    });
});