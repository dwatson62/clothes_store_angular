var storeController = app.controller('StoreControl', ['$http', 'VoucherService', function($http, VoucherService) {

  var self = this;
  self.shoppingCart = [];

  var VoucherService = new VoucherService();

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

  self.getBestVoucher = function() {
    var config = {'subTotal': self.subTotal, 'vouchers': self.vouchers, 'cart': self.shoppingCart}
    self.bestVoucher = VoucherService.getBestVoucher(config);
  };

  self.applyVoucher = function() {
    self.discount = self.bestVoucher.discount;
    self.discountedTotal = self.subTotal - self.discount;
  };

  self.getCategories = function() {
    var categories =  _.pluck(self.products, 'category');
    self.categories = _.uniq(categories).sort();
  };

  self.showOneCategory = function(category) {
    self.currentProducts = _.where(self.products, { category: category } )
  };

  self.addToCart = function(item) {
    if (self.checkItemAlreadyInCart(item) === false) {
      var newProduct = {
        'name': item.name,
        'category': item.category,
        'price': item.price,
        'quantity': 1
      };
      self.shoppingCart.push(newProduct);
    }
    self.decreaseProductQuantity(item);
    self.subTotal = self.calculateSubTotal();
    self.getBestVoucher();
  };

  self.decreaseProductQuantity = function(item) {
    _.each(self.products, function(element) {
      if (item === element) { element.quantity -= 1; }
    });
  };

  self.increaseProductQuantity = function(item) {
    _.each(self.products, function(element) {
      if (item.name === element.name) { element.quantity += item.quantity; }
    });
  };

  self.checkItemAlreadyInCart = function(item) {
    for (var i in self.shoppingCart) {
      if (self.shoppingCart[i].name === item.name) {
        self.shoppingCart[i].quantity ++;
        return;
      }
    }
    return false;
  };

  self.calculateSubTotal = function() {
    var total = _.reduce(self.shoppingCart, function(sum, item) {
      return sum + (item.price * item.quantity);
    }, 0);
    self.removeDiscounts();
    return total;
  };

  self.removeDiscounts = function() {
    self.discount = 0;
    self.discountedTotal = 0;
  };

  self.removeFromCart = function(item) {
    var itemToBeRemoved = _.find(self.shoppingCart, function(element) {
      return element.name === item.name;
    });
    self.shoppingCart = _.filter(self.shoppingCart, function(product) {
      return product != itemToBeRemoved;
    });
    self.subTotal = self.calculateSubTotal();
    self.increaseProductQuantity(itemToBeRemoved);
    self.getBestVoucher();
  };

  self.emptyCart = function() {
    _.each(self.shoppingCart, function(element) {
      self.increaseProductQuantity(element);
    });
    self.shoppingCart = [];
    self.subTotal = self.calculateSubTotal();
    self.getBestVoucher();
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

}]);
