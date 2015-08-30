describe('Gives the best voucher', function () {

  beforeEach(module('clothesStore'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('StoreControl');
    ctrl.products = testItems;
  }));

  afterEach(function() {
    ctrl.emptyCart();
  });

  xit('applies a £5 discount', function() {
    ctrl.sortVouchers(testVouchers);
    console.log(ctrl.products[3]);
    ctrl.addToCart(ctrl.products[3]);
    console.log(ctrl.shoppingCart);
  });

  xit('for orders over £10', function() {
    ctrl.addToCart(ctrl.products[5]);
    ctrl.addToCart(ctrl.products[6]);
    ctrl.getBestVoucher();
  });

});