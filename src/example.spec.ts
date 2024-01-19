import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  
  await page.locator("xpath=//*[@name='some value']").scrollIntoViewIfNeeded()

});
