import { Locator, Page, test } from '@playwright/test';

export default class AnalysisPage {
  readonly page: Page;
  readonly selectDatasetsMessage: Locator;
  readonly mainContent: Locator;
  readonly header: Locator;
  readonly mapboxCanvas: Locator;
  readonly generateAnalysisButton: Locator;
  readonly datasetCheckbox: Locator;
  readonly moreOptionsButton: Locator;
  readonly northAmericaOption: Locator;


  constructor(page: Page) {
    this.page = page;
    this.selectDatasetsMessage = this.page.getByText(/To select datasets, please define an area and a date first/i);
    this.mainContent = this.page.getByRole('main');
    this.header = this.mainContent.getByRole('heading', {level: 1, name: /exploration/i });
    this.mapboxCanvas = this.page.getByLabel('Map', { exact: true });
    this.generateAnalysisButton = this.page.getByRole('link', { name: /Generate analysis/i });
    this.datasetCheckbox = this.page.locator('label').filter({ hasText: /From:/i })
    this.moreOptionsButton = this.page.getByRole('button', {name: /more options/i });
    this.northAmericaOption = this.page.getByRole('button', {name: /north america/i });
  }

  async drawPolygon (polygonCorners: number[][]) {
    await test.step('draw polygon on mapbox canvas box', async () => {
      if(polygonCorners.length < 3) {
        throw new Error('polygon in drawPolygon must have >=3 corners')
      }
      // mutating corners array to have all but the final corner
      const finalCorner = polygonCorners.pop()|| [];

      // single click each remaining corner
      for (const corner of polygonCorners) {
        await this.mapboxCanvas.click({
          position: {
            x: corner[0],
            y: corner[1]
          }
        });
      }
      // double click on final corner
      await this.mapboxCanvas.dblclick({
        position: {
          x: finalCorner[0],
          y: finalCorner[1]
        }
      });
    })
  }

  async clickDatasetOption (index: number) {
    test.step(`clicking dataset number ${index}`, async () => {
      this.datasetCheckbox.nth(index).click();
    })
  }
}
