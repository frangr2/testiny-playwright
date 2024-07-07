import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Page } from 'playwright';

export const steps = {
    'Usuario accede al buscador de Google': async function (page: Page) {
        await page.goto('https://www.google.com/?hl=es');
        await page.getByRole('button', { name: 'Rechazar todo' }).click();
    },
    "Busca 'Playwright' en el buscador": async function (page: Page) {
        const searchBox = page.locator('[name="q"]');
        await searchBox.click();
        await searchBox.fill('Playwright');
        await searchBox.press('Enter');
    },
    'Accede al primer resultado': async function (page: Page) {
        const firstResult = page.locator('#search a').first();
        await firstResult.click();
    },
    'El primer resultado es el sitio oficial de Playwright': async function (
        page: Page
    ) {
        expect(page.url()).toEqual('https://playwright.dev/');
    },
};

// Given('Usuario accede al buscador de Google', steps['Usuario accede al buscador de Google']);
// When("Busca 'Playwright' en el buscador", steps["Busca 'Playwright' en el buscador"]);
// When('Accede al primer resultado', steps['Accede al primer resultado']);
// Then('El primer resultado es el sitio oficial de Playwright', steps['El primer resultado es el sitio oficial de Playwright']);
