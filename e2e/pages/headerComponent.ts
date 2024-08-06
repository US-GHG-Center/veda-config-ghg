import { Locator, Page } from '@playwright/test';

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
}