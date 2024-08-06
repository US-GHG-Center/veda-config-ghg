import fs, { link } from 'fs';
import isurl from 'isurl';
import { test, expect } from '../pages/basePage';

const catalogs = JSON.parse(fs.readFileSync('e2e/playwrightTestData.json', 'utf8'))['catalogs'];
const datasetIds = JSON.parse(fs.readFileSync('e2e/playwrightTestData.json', 'utf8')).datasetIds;


test.describe('catalog card taxonomy pills have valid hyperlinks', () => {
 for (const item of catalogs) {
  test(`${item} details page has taxonomy hyperlinks`, async({
    page,
    catalogPage,
    datasetPage,
  }) => {

    await page.goto('/data-catalog');
    await expect(catalogPage.header, `catalog page should load`).toHaveText(/data catalog/i);

    const catalogCard = catalogPage.mainContent.getByRole('article').getByRole('heading', { level: 3, name: item, exact: true}).first();
    await catalogCard.scrollIntoViewIfNeeded();
    await catalogCard.click({force: true});

    await expect(datasetPage.header.filter({ hasText: item}), `${item} page should load`).toBeVisible();

    // check that taxonomy pills have hrefs
    const taxonomyLinks = await page.getByRole('heading', {name: /taxonomy/i , includeHidden: true}).locator('..').locator('dd').getByRole('link').all();
    for(const link of taxonomyLinks) {
      const linkName = await link.innerText();
      test.step(`testing that ${linkName} has an href`, async() => {
        const href = await link.getAttribute('href');
        expect(href).not.toBeNull;
      })
    }

  })
 }

});