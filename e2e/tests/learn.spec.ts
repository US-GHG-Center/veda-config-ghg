import { test, expect } from '../pages/basePage';

test('learn page should have no javascript errors', async ({
  page,
  learnPage,
 }) => {
  let pageErrorCalled = false;
  // Log all uncaught errors to the terminal
  page.on('pageerror', exception => {
    console.log(`Uncaught exception: "${exception}"`);
    pageErrorCalled = true;
  });

  await page.goto('/learn');
  await expect(learnPage.header, `learn page should load`).toBeVisible();

  // scroll page to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  expect(pageErrorCalled, 'no javascript exceptions thrown on page').toBe(false)
});

test('external links should be valid urls', async ({
  page,
  learnPage,
 }) => {

  await page.goto('/learn');
  await expect(learnPage.header, `learn page should load`).toBeVisible();

  await test.step('ensure that all articles are done loading before checking links', async() => {
    await expect(page.getByRole('article').getByRole('figure').last(), 'final article should be visible').toBeVisible();
  });

  const externalArticleLinks = await test.step('get all articles labeled as external links', async() => {
    return await page.getByRole('article').filter({hasText: "External Link"}).all();
  });

  for(const article of externalArticleLinks) {
    await article.scrollIntoViewIfNeeded();
    const articleName = await test.step('get name of article', async() => {
      return await article.locator('div').getByRole('heading', { level: 3 }).innerText();
    })
    test.step(`testing that ${articleName} has an href`, async() => {
      const [href, target] = await test.step('get html attributes for link', async() => {
        const href = await article.getByRole('link').getAttribute('href');
        const target = await article.getByRole('link').getAttribute('target');
        return [href, target]
      });
      expect(href, 'href should not be missing').not.toBeNull;
      expect(target, 'link should be set to open in a new tab').toBe('_blank');
    })
  }
});