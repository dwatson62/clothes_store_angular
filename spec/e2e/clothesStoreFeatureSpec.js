beforeEach(function(){
  browser.get('http://localhost:3000');
  element(by.id('category4')).click();
});

var almondToeCourtShoes = element(by.id('product-btn0'));
var blueSuedeShoes = element(by.id('product-btn1'));
var categoryMensCasual = element(by.id('category0'));
var subTotal = element(by.model('storeCtrl.subTotal'));
var shoppingCart = element(by.id('cart'));
var emptyCartMsg = element(by.id('empty-cart-msg'));
var emptyCartBtn = element(by.id('empty-cart-btn'));

describe('Clothes Store', function() {

  describe('Upon page load', function() {

    it('Has a title', function () {
      expect(browser.getTitle()).toEqual('Clothes Store');
    });

    it('Starts with an empty cart', function() {
      expect(emptyCartMsg.getText()).toEqual('Empty!');
    });

    it('Out of stock items are displayed as so', function() {
      element(by.id('category1')).click();
      var outOfStockItem = element(by.id('outOfStock-2'));
      expect(outOfStockItem.getText()).toContain('Out of Stock');
    });

    it('Displays a list of products', function() {
      var productList = element.all(by.repeater('product in storeCtrl.currentProducts'));
      expect(productList.count()).toBeGreaterThan(0);
    });

    it('Displays an image with a product', function() {
      var productImage = element(by.id('product-images1'));
      expect(productImage.isDisplayed()).toBeTruthy();
    });

    it('Can change categories', function() {
      categoryMensCasual.click();
      var productList = element.all(by.repeater('product in storeCtrl.currentProducts'));
      expect(productList.get(0).getText()).toContain('Fine Stripe Short Sleeve Shirt');
    });

    it('If product is reduced, old price is also displayed', function() {
      categoryMensCasual.click();
      var reducedItem = element(by.id('product1'));
      expect(reducedItem.getText()).toContain('£49.99 £39.99')
    });

    it('Subtotal is not displayed when cart is empty', function() {
      expect(subTotal.isDisplayed()).toBeFalsy();
    });

  });

  describe('While shopping', function() {

    beforeEach(function() {
      almondToeCourtShoes.click();
    });

    it('items appears in the cart', function() {
      expect(shoppingCart.getText()).toContain('1x Almond Toe Court Shoes');
    });

    it('Adding to the cart updates the total', function() {
      expect(subTotal.getText()).toEqual('Total: £99.00');
    });

    it('Adding multiples of same item updates the cart quantity', function() {
      almondToeCourtShoes.click();
      expect(shoppingCart.getText()).toContain('2x Almond Toe Court Shoes');
    });

    it('When last item is ordered, it is displayed as out of stock', function() {
      // This item has stock quantity of 5
      for (i = 0; i < 4; i ++) {
        almondToeCourtShoes.click();
      }
      var shoesOutOfStock = element(by.id('outOfStock-0'));
      expect(shoesOutOfStock.getText()).toContain('Out of Stock');
    });

    it('Can remove items from the cart', function() {
      var removeItem = element(by.id('removeproduct-0'));
      removeItem.click();
      expect(emptyCartMsg.getText()).toEqual('Empty!');
    });

    it('Can remove all items from the cart', function() {
      blueSuedeShoes.click();
      emptyCartBtn.click();
      expect(emptyCartMsg.getText()).toEqual('Empty!');
    });

  });

  describe('Vouchers', function() {

    var discount = element(by.id('applied-discount'));
    var discountedTotal = element(by.id('discounted-total'));

    it('Displays no voucher when cart is empty', function() {
      var voucherBtn = element(by.id('best-voucher-btn'));
      expect(voucherBtn.isDisplayed()).toBeFalsy();
    });

    it('Discounted totals are hidden if voucher is not applied', function() {
      expect(discount.isDisplayed()).toBeFalsy();
      expect(discountedTotal.isDisplayed()).toBeFalsy();
    });

    it('When products are added, voucher button is displayed', function() {
      almondToeCourtShoes.click();
      var voucherBtn = element(by.id('best-voucher-btn'));
      expect(voucherBtn.isDisplayed()).toBeTruthy();
    });

    it('When more products are added, an improved voucher is displayed', function() {
      blueSuedeShoes.click();
      var voucherBtn = element(by.id('best-voucher-btn'));
      expect(voucherBtn.getText()).toEqual('£5 off your order');
      almondToeCourtShoes.click();
      expect(voucherBtn.getText()).toEqual('£15 off footwear special offer');
    });

    it('When voucher is added, totals are updated', function() {
      almondToeCourtShoes.click();
      var voucherBtn = element(by.id('best-voucher-btn'));
      voucherBtn.click();
      expect(discount.getText()).toEqual('Discount: £15.00');
      expect(discountedTotal.getText()).toEqual('Discounted total: £84.00');
    });

    it('When item is removed, applied voucher is also removed', function() {
      almondToeCourtShoes.click();
      var voucherBtn = element(by.id('best-voucher-btn'));
      voucherBtn.click();
      emptyCartBtn.click();
      expect(discount.isDisplayed()).toBeFalsy();
      expect(discountedTotal.isDisplayed()).toBeFalsy();
    });

  });

});