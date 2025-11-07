import { Page } from '@playwright/test';

export class navegaALaWeb {
  constructor(public page: Page) {}

  static using(page: Page) {
    return new navegaALaWeb(page);
  }

    getPage() {
    return this.page;
  }
}