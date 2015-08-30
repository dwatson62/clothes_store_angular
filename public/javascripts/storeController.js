var storeController = app.controller('StoreControl', ['$http', 'VoucherService', 'CartService', 'ShopService', function($http, VoucherService, CartService, ShopService) {

  var self = this;
  self.shoppingCart = [];

  var Voucher = new VoucherService();
  var Cart = new CartService();
  var Shop = new ShopService();

  self.init = function() {
    $http.get('/javascripts/seedData.json').
      then(function(response) {
        self.products = response.data;
        self.getCategories();
        self.showOneCategory(self.categories[0]);
      });
    $http.get('/javascripts/seedVouchers.json').
      then(function(response) {
        self.vouchers = _.sortBy(response.data, 'discount').reverse();
      });
  };

  self.getCategories = function() {
    var categories =  _.pluck(self.products, 'category');
    self.categories = _.uniq(categories).sort();
  };

  self.showOneCategory = function(category) {
    self.currentProducts = _.where(self.products, { category: category } )
  };

  self.hasEmptyCart = function() {
    if (self.shoppingCart.length === 0) { return true; }
  };

  self.noDiscountApplied = function() {
    if (self.discount === 0) { return true; }
  };

  self.outOfStock = function(item) {
    if (item.quantity === 0) { return true; }
  };

  self.getBestVoucher = function() {
    var config = {'subTotal': self.subTotal, 'vouchers': self.vouchers, 'cart': self.shoppingCart}
    self.bestVoucher = Voucher.getBestVoucher(config);
  };

  self.applyVoucher = function() {
    self.discount = self.bestVoucher.discount;
    self.discountedTotal = self.subTotal - self.discount;
  };

  self.removeDiscounts = function() {
    self.discount = 0;
    self.discountedTotal = 0;
  };

  self.addToCart = function(item) {
    Cart.addToCart(self.shoppingCart, item);
    Shop.decreaseProductQuantity(self.products, item)
    self.calculateSubTotal();
    self.getBestVoucher();
  };

  self.calculateSubTotal = function() {
    self.subTotal = Shop.calculateSubTotal(self.shoppingCart);
  }

  self.removeFromCart = function(item) {
    var itemToBeRemoved = Cart.findItemInCart(self.shoppingCart, item)
    self.shoppingCart = Cart.removeFromCart(self.shoppingCart, itemToBeRemoved);
    self.subTotal = Shop.calculateSubTotal();
    Shop.increaseProductQuantity(self.products, itemToBeRemoved);
    self.getBestVoucher();
  };

  self.emptyCart = function() {
    Shop.restoreQuantities(self.shoppingCart, self.products);
    self.shoppingCart = [];
    self.subTotal = Shop.calculateSubTotal(self.shoppingCart);
    self.removeDiscounts();
    self.getBestVoucher();
  };

}]);
