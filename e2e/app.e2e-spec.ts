import { LlamafaceNg2Page } from './app.po';

describe('llamaface-ng2 App', () => {
  let page: LlamafaceNg2Page;

  beforeEach(() => {
    page = new LlamafaceNg2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
