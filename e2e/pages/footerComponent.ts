import { Locator, Page, test } from '@playwright/test';

type FooterLinkName = "about" | "dataCatalog" | "dataExploration" | "dataInsights" | "hubLink"

export default class FooterComponent {
  readonly page: Page;
  readonly footer: Locator;
  readonly dataCatalogLink: Locator;
  readonly dataExplorationLink: Locator;
  readonly dataInsightsLink: Locator;
  readonly hubLink: Locator;
  readonly aboutLink: Locator;
  readonly pressInfoLink: Locator;
  readonly subscribeLink: Locator;
  readonly contactButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.footer = this.page.locator('footer');
    this.dataCatalogLink = this.footer.getByRole('link', { name: /data catalog/i} );
    this.dataExplorationLink = this.footer.getByRole('link', { name: /exploration/i} );
    this.dataInsightsLink = this.footer.getByRole('link', { name: /data insights/i} );
    this.hubLink = this.footer.getByRole('link', { name: /hub/i });
    this.aboutLink = this.footer.getByRole('link', { name: /about/i} );
    this.pressInfoLink = this.footer.getByRole('link', { name: /press info/i} );
    this.subscribeLink = this.footer.getByRole('link', { name: /subscribe/i} );
    this.contactButton = this.footer.getByRole('button', { name: /contact us/i} );
  }

  async clickLink(linkName: FooterLinkName) {
    await test.step(`click on ${linkName} link`, async() => {
      switch (linkName) {
        case 'about':
          await this.aboutLink.click();
          break;
        case 'dataCatalog':
          await this.dataCatalogLink.click();
          break;
        case 'dataExploration':
          await this.dataExplorationLink.click();
          break;
        case 'dataInsights':
          await this.dataInsightsLink.click();
          break;
        case 'hubLink':
          await this.hubLink.click();
          break;
        default:
          throw new Error('unknown link referenced in footer test')
      }
    })
  }
}