import exp from 'constants';
import { test, expect } from '../pages/basePage';
import LearnPage from '../pages/learnPage';

test.describe('ensure links in top navigation route to expected page', async () => {
  test('data catalog link', async({page, headerComponent, catalogPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation).toBeVisible()
    await headerComponent.dataCatalogLink.click();
    await expect(catalogPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/data-catalog/i);
  })

  test('exploration link', async({page, headerComponent, datasetSelectorComponent}) => {
    await page.goto('/');
    await expect(headerComponent.navigation).toBeVisible()
    await headerComponent.explorationLink.click();
    await expect(datasetSelectorComponent.header).toBeVisible();
    await expect(page).toHaveURL(/\/exploration/i);
  })
  
  test('data insights link', async({page, headerComponent, storyPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation).toBeVisible()
    await headerComponent.dataInsightsLink.click();
    await expect(storyPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/stories/i);
  })

  test('hub link', async({page, headerComponent, datasetSelectorComponent}) => {
    await page.goto('/');
    await expect(headerComponent.navigation).toBeVisible();
    await expect(headerComponent.hubLink).toBeVisible();
    const href = await headerComponent.hubLink.getAttribute('href');
    const target = await headerComponent.hubLink.getAttribute('target');
    expect(href).toBe('https://hub.ghg.center/');
    expect(target, 'should be set to open in a new tab').toBe('_blank');
  })

  test('learn link', async({page, headerComponent, learnPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation).toBeVisible()
    await headerComponent.learnLink.click();
    await expect(learnPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/learn/i);
  })

  test('about link', async({page, headerComponent, aboutPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation).toBeVisible()
    await headerComponent.aboutLink.click();
    await expect(aboutPage.aboutParagraph).toBeVisible();
    await expect(page).toHaveURL(/\/about/i);
  })

  test('contact us button', async({page, headerComponent, contactModal}) => {
    await page.goto('/');
    await expect(headerComponent.navigation).toBeVisible()
    await headerComponent.contactButton.click();
    await expect(contactModal.header).toBeVisible();
    await expect(page.locator('iframe')).toBeVisible();
  })
})