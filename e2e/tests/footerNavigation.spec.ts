import { test, expect } from '../pages/basePage';

test.describe('ensure links in footer route to expected page', async () => {
  test('data catalog link', async({page, footerComponent, catalogPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer).toBeVisible()
    await footerComponent.clickLink('dataCatalog');
    await expect(catalogPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/data-catalog/i);
  })

  test('data exploration link', async({page, footerComponent, datasetSelectorComponent}) => {
    await page.goto('/');
    await expect(footerComponent.footer, 'footer should be visible').toBeVisible()
    await footerComponent.clickLink('dataExploration');
    await expect(datasetSelectorComponent.header).toBeVisible();
    await expect(page).toHaveURL(/\/exploration/i);
  })
  
  test('data insights link', async({page, footerComponent, storyPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer, 'footer should be visible').toBeVisible()
    await footerComponent.clickLink('dataInsights');
    await expect(storyPage.header).toBeVisible();
    await expect(page).toHaveURL(/\/stories/i);
  })

  test('hub link', async({page, footerComponent}) => {
    await page.goto('/');
    await expect(footerComponent.footer, 'footer should be visible').toBeVisible();
    await expect(footerComponent.hubLink, 'hub link should be visible').toBeVisible();
    const [href, target] = await test.step('get html attributes for link', async() => {
      const href = await footerComponent.hubLink.getAttribute('href');
      const target = await footerComponent.hubLink.getAttribute('target');
      return [href, target]
    })
    expect(href, 'href should point to hub.ghg.center').toBe('https://hub.ghg.center/');
    expect(target, 'link should be set to open in a new tab').toBe('_blank');
  })

  test('about link', async({page, footerComponent, aboutPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer, 'footer should be visible').toBeVisible()
    await footerComponent.aboutLink.click();
    await expect(aboutPage.aboutParagraph, 'about paragraph should be visible').toBeVisible();
    await expect(page, 'should navigate to about route').toHaveURL(/\/about/i);
  })


  test('press info link', async({page, footerComponent, learnPage}) => {
    await page.goto('/');
    await expect(footerComponent.footer, 'footer should be visible').toBeVisible()
    await footerComponent.pressInfoLink.click();
    await expect(learnPage.header, 'learn page header should be visibl').toBeVisible();
    await expect(page, 'should navigate to the "press" section of the learn route').toHaveURL(/\/learn#press/i);
  })

  test('subscribe link', async({page, footerComponent, subscribePage}) => {
    await page.goto('/');
    await expect(footerComponent.footer, 'footer should be visible').toBeVisible()
    await footerComponent.subscribeLink.click();
    await expect(subscribePage.header, 'subscribe header should be visible').toBeVisible();
    await expect(page, 'should navigate to the subscription page').toHaveURL(/\/public\/subscription\/index.html/i);
  })

  test('contact us button', async({page, footerComponent, contactModal}) => {
    await page.goto('/');
    await expect(footerComponent.footer, 'footer should be visible').toBeVisible()
    await footerComponent.contactButton.click();
    await expect(contactModal.header, 'contact modal header should be visible').toBeVisible();
    await expect(page.locator('iframe'), 'an iframe should be visible').toBeVisible();
  })
})