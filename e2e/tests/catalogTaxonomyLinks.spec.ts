import fs from 'fs';
import { test, expect } from '../pages/basePage';

const visibleCatalogs = JSON.parse(fs.readFileSync('e2e/playwrightTestData.json', 'utf8'))['catalogsVisible'];

test.describe('catalog card taxonomy pills have valid hyperlinks', () => {
 for (const item of visibleCatalogs) {
  test(`${item} details page has taxonomy hyperlinks`, async({
    page,
    catalogPage,
    datasetPage,
  }) => {

    await page.goto('/data-catalog');
    await expect(catalogPage.header, `catalog page should load`).toHaveText(/data catalog/i);

    await catalogPage.clickCatalogCard(item);

    await expect(datasetPage.header.filter({ hasText: item}), `${item} page should load`).toBeVisible();

    const taxonomyLinks = await datasetPage.getAllTaxonomyLinks();
    for(const link of taxonomyLinks) {
      const linkName = await test.step('get link text', async() => {
        return  await link.innerText();
      })
      await test.step(`testing that ${linkName} has an href`, async() => {
        const href = await link.getAttribute('href');
        expect(href).not.toBeNull;
      })
    }
  })
 }
});
