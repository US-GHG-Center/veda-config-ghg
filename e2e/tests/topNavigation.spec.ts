import exp from 'constants';
import { test, expect } from '../pages/basePage';

test.describe('ensure links in top navigation route to expected page', async () => {
  test('data catalog link', async({page, headerComponent, catalogPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation, 'header should load').toBeVisible()
    await headerComponent.clickLink('dataCatalog');
    await expect(catalogPage.header, 'catalog page header should load').toBeVisible();
    await expect(page, 'should route to /data-catalog').toHaveURL(/\/data-catalog/i);
  })

  test('exploration link', async({page, headerComponent, datasetSelectorComponent}) => {
    await page.goto('/');
    await expect(headerComponent.navigation, 'header should load').toBeVisible()
    await headerComponent.clickLink('exploration');
    await expect(datasetSelectorComponent.header, 'data selector should load').toBeVisible();
    await expect(page, 'should route to /exploration').toHaveURL(/\/exploration/i);
  })
  
  test('data insights link', async({page, headerComponent, storyPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation, 'header should load').toBeVisible()
    await headerComponent.clickLink('dataInsights');
    await expect(storyPage.header, 'stories header should be visible').toBeVisible();
    await expect(page, 'should route to /stories').toHaveURL(/\/stories/i);
  })

  test('hub link', async({page, headerComponent, datasetSelectorComponent}) => {
    await page.goto('/');
    await expect(headerComponent.navigation, 'header should load').toBeVisible();
    await expect(headerComponent.hubLink, 'hub link should be visible').toBeVisible();
    const [href, target] = await test.step('get html attributes for link', async() => {
      const href = await headerComponent.hubLink.getAttribute('href');
      const target = await headerComponent.hubLink.getAttribute('target');
      return [href, target]
    });
    expect(href, 'href should be hub.ghg.center').toBe('https://hub.ghg.center/');
    expect(target, 'should be set to open in a new tab').toBe('_blank');
  })

  test('learn link', async({page, headerComponent, learnPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation, 'header should load').toBeVisible()
    await headerComponent.clickLink('learn');
    await expect(learnPage.header, 'learn page header should be visible').toBeVisible();
    await expect(page, 'should route to learn page').toHaveURL(/\/learn/i);
  })

  test('about link', async({page, headerComponent, aboutPage}) => {
    await page.goto('/');
    await expect(headerComponent.navigation, 'header should load').toBeVisible()
    await headerComponent.clickLink('about')
    await expect(aboutPage.aboutParagraph, 'about paragraph should be visible').toBeVisible();
    await expect(page, 'should route to about page').toHaveURL(/\/about/i);
  })

  test('contact us button', async({page, headerComponent, contactModal}) => {
    await page.goto('/');
    await expect(headerComponent.navigation, 'header should load').toBeVisible()
    await headerComponent.clickLink('contact');
    await expect(contactModal.header, 'contact modal header should be visible').toBeVisible();
    await expect(page.locator('iframe'), 'an iframe should be visible').toBeVisible();
  })
})