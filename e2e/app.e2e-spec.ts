import { myAutoAppPage } from './app.po';

describe('myAuto App', function() {
  let page: myAutoAppPage;

  beforeEach(() => {
    page = new myAutoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
