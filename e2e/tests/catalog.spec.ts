import fs from 'fs';
import { test, expect } from '../pages/basePage';

const visibleCatalogs = JSON.parse(fs.readFileSync('e2e/playwrightTestData.json', 'utf8'))['catalogsVisible'];

test('catalogs displayed on /data-catalog route', async ({
  page,
  catalogPage,
 }) => {
  let pageErrorCalled = false;
  // Log all uncaught errors to the terminal
  page.on('pageerror', exception => {
    console.log(`Uncaught exception: "${exception}"`);
    pageErrorCalled = true;
  });

  await page.goto('/data-catalog');
  await expect(catalogPage.header, `catalog page should load`).toHaveText(/data catalog/i);

  for (const item of visibleCatalogs) {
    await test.step(`locate ${item} catalog card`, async() => {
      const catalogCard =  catalogPage.mainContent.getByRole('article').getByRole('heading', { level: 3, name: item, exact: true}).last();
      await catalogCard.scrollIntoViewIfNeeded();
      await expect(catalogCard, `${item} catalog card should load`).toBeVisible();
    })
    
  };

  expect(pageErrorCalled, 'no javascript exceptions thrown on page').toBe(false)

});
