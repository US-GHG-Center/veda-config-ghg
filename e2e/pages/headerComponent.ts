import { Locator, Page, test } from '@playwright/test';

type HeaderLinkName = "about" | "dataCatalog" | "exploration" | "dataInsights" | "hubLink" | "learn" | "contact"

export default class HeaderComponent {
  readonly page: Page;
  readonly navigation: Locator;
  readonly dataCatalogLink: Locator;
  readonly explorationLink: Locator;
  readonly dataInsightsLink: Locator;
  readonly hubLink: Locator;
  readonly learnLink: Locator;
  readonly aboutLink: Locator;
  readonly contactButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = this.page.getByLabel('Global Navigation');
    this.dataCatalogLink = this.navigation.getByRole('link', { name: /data catalog/i} );
    this.explorationLink = this.navigation.getByRole('link', { name: /exploration/i} );
    this.dataInsightsLink = this.navigation.getByRole('link', { name: /data insights/i} );
    this.hubLink = this.navigation.getByRole('link', { name: /hub/i });
    this.learnLink = this.page.getByRole('link', { name: "Learn", exact: true })
    this.aboutLink = this.navigation.getByRole('link', { name: /about/i} );
    this.contactButton = this.navigation.getByRole('button', { name: /contact us/i} );
  }

  async clickLink(linkName: HeaderLinkName) {
    await test.step(`click on ${linkName} link`, async() => {
      switch (linkName) {
        case 'about':
          await this.aboutLink.click();
          break;
        case 'dataCatalog':
          await this.dataCatalogLink.click();
          break;
        case 'exploration':
          await this.explorationLink.click();
          break;
        case 'dataInsights':
          await this.dataInsightsLink.click();
          break;
        case 'hubLink':
          await this.hubLink.click();
          break;
        case 'learn':
          await this.learnLink.click();
          break;
        case 'contact':
          await this.contactButton.click();
          break;
        default:
          throw new Error('unknown link referenced in footer test')
      }
    })
  }
}