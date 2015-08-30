var storeController = app.controller('StoreControl', ['$http', function($http) {

  var self = this;
  self.shoppingCart = [];
  self.subTotal = 0;
  self.discount = 0;
  self.discountedTotal = 0;
  self.bestVoucher = false;

  $('.dropdown-toggle').dropdown();

  self.init = function() {
    $http.get('/javascripts/seedData.json').
      then(function(response) {
        self.products = response.data;
        self.showProducts = self.products;
        self.getCategories();
      });
    $http.get('/javascripts/seedVouchers.json').
      then(function(response) {
        self.sortVouchers(response.data);
      });
  };

  self.sortVouchers = function(vouchers) {
    self.vouchers = _.sortBy(vouchers, 'discount').reverse();
  };

  self.getBestVoucher = function() {
    for (var i in self.vouchers) {
      var currentVoucher = self.vouchers[i];
      var count = self.getQuantityOfVoucherCondition(currentVoucher);
      if (currentVoucher.minimum_order <= self.subTotal && currentVoucher.minimum_number <= count) {
        self.bestVoucher = currentVoucher;
        return;
      }
    }
    self.bestVoucher = false;
  };

  self.getQuantityOfVoucherCondition = function(currentVoucher) {
    var count = 0;
    _.each(self.shoppingCart, function(currentItem) {
      if (currentItem.category.includes(currentVoucher.condition)) {
        count += currentItem.quantity;
      }
    });
    return count;
  };

  self.applyVoucher = function() {
    self.discount = self.bestVoucher.discount;
    self.discountedTotal = self.subTotal - self.discount;
  };

  self.getCategories = function() {
    var categories =  _.pluck(self.products, 'category');
    self.categories = _.uniq(categories).sort();
  };

  self.showCategories = function(category) {
    // this will be used to filter products by category

    // self.showProducts =  _.pluck(self.products, function(element) {
    //   return element.category === category
    // });
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
    var updatedCart = _.filter(self.shoppingCart, function(product) {
      product.name === item.name;
    });
    self.shoppingCart = updatedCart;
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

  self.outOfStock = function(item) {
    if (item.quantity === 0) { return true; }
  };

}]);
