import { Locator, Page } from '@playwright/test';

export default class ExplorePage {
  readonly page: Page;
  readonly layersHeading: Locator;
  readonly mapboxCanvas: Locator;
  readonly firstDatasetItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.layersHeading = this.page.getByRole('heading', { name: 'Layers' });
    this.mapboxCanvas = this.page.getByLabel('Map', { exact: true });
    this.firstDatasetItem = page.getByRole('article')
  }
}