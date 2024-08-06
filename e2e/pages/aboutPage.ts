import { Locator, Page } from '@playwright/test';

export default class AboutPage {
  readonly page: Page;
  readonly aboutParagraph: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aboutParagraph = this.page.getByText("The U.S. Greenhouse Gas Center (US GHG Center) is a multi-agency effort");
  }
}