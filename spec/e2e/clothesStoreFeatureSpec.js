beforeEach(function(){
  browser.get('http://localhost:3000');
});

var almondToeCourtShoes = element(by.id('product-btn0'));
var outOfStockItem = element(by.id('outOfStock-4'));
var subTotal = element(by.model('storeCtrl.subTotal'));
var shoppingCart = element(by.id('cart'));
var emptyCart = element(by.id('empty-cart'));

describe('Clothes Store', function() {

  it('Has a title', function () {
    expect(browser.getTitle()).toEqual('Clothes Store');
  });

  it('Starts with an empty cart', function() {
    expect(emptyCart.getText()).toEqual('Empty!');
  });

  it('Can add an item, and have it appear in the cart', function() {
    almondToeCourtShoes.click();
    expect(shoppingCart.getText()).toContain('1x Almond Toe Court Shoes');
  });

  it('Out of stock items are displayed as so', function() {
    expect(outOfStockItem.getText()).toContain('Out of Stock');
  });

  it('Adding to the cart updates the total', function() {
    almondToeCourtShoes.click();
    expect(subTotal.getText()).toEqual('Total: £99.00');
  });

  it('Adding multiples of same item updates the cart quantity', function() {
    almondToeCourtShoes.click();
    almondToeCourtShoes.click();
    expect(shoppingCart.getText()).toContain('2x Almond Toe Court Shoes');
  });

  it('When last item is ordered, it is displayed as out of stock', function() {
    // This item has stock quantity of 5
    for (i = 0; i < 5; i ++) {
      almondToeCourtShoes.click();
    }
    var shoesOutOfStock = element(by.id('outOfStock-0'));
    expect(shoesOutOfStock.getText()).toContain('Out of Stock');
  });

  it('Can remove items from the cart', function() {
    almondToeCourtShoes.click();
    var removeItem = element(by.id('removeproduct-0'));
    removeItem.click();
    expect(emptyCart.getText()).toEqual('Empty!');
  });
});