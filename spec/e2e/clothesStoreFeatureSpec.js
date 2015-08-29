beforeEach(function(){
  browser.get('http://localhost:3000');
});

describe('Clothes Store', function() {

  it('Has a title', function () {
    expect(browser.getTitle()).toEqual('Clothes Store');
  });
});