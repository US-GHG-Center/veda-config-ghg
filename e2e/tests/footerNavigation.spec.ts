import exp from 'constants';
import { test, expect } from '../pages/basePage';
import LearnPage from '../pages/learnPage';

test.describe('ensure links in footer route to expected page', async () => {
  test('data catalog link', async({page, footerComponent, catalogPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.dataCatalogLink.click();
    await expect(catalogPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/data-catalog/i);
  })

  test('data exploration link', async({page, footerComponent, datasetSelectorComponent}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.dataExplorationLink.click();
    await expect(datasetSelectorComponent.header).toBeVisible();
    await expect(page).toHaveURL(/\/exploration/i);
  })
  
  test('data insights link', async({page, footerComponent, storyPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.dataInsightsLink.click();
    await expect(storyPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/stories/i);
  })

  test('hub link', async({page, footerComponent, datasetSelectorComponent}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible();
    await expect(footerComponent.hubLink).toBeVisible();
    const href = await footerComponent.hubLink.getAttribute('href');
    const target = await footerComponent.hubLink.getAttribute('target');
    expect(href).toBe('https://hub.ghg.center/');
    expect(target, 'should be set to open in a new tab').toBe('_blank');
  })

  test('about link', async({page, footerComponent, aboutPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.aboutLink.click();
    await expect(aboutPage.aboutParagraph).toBeVisible();
    await expect(page).toHaveURL(/\/about/i);
  })


  test('press info link', async({page, footerComponent, learnPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.pressInfoLink.click();
    await expect(learnPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/learn#press/i);
  })

  test('subscribe link', async({page, footerComponent, subscribePage}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.subscribeLink.click();
    await expect(subscribePage.header).toBeVisible();
    await expect(page).toHaveURL(/\/public\/subscription\/index.html/i);
  })

  test('contact us button', async({page, footerComponent, contactModal}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.contactButton.click();
    await expect(contactModal.header).toBeVisible();
    await expect(page.locator('iframe')).toBeVisible();
  })
})