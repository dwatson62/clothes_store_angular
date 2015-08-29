var storeController = app.controller('StoreControl', ['$http', function($http) {

  var self = this;
  self.category;
  self.shoppingCart = [];
  self.subTotal = 0;
  self.bestVoucher = false;

  $('.dropdown-toggle').dropdown();

  self.init = function() {
    $http.get('/javascripts/seedData.json').
      then(function(response) {
        self.products = response.data;
        self.getCategories();
      });
    $http.get('/javascripts/seedVouchers.json').
      then(function(response) {
        self.sortVouchers(response.data)
      });
  };

  self.sortVouchers = function(vouchers) {
    self.vouchers = _.sortBy(vouchers, 'discount').reverse();
  };

  self.getBestVoucher = function() {
    for (var i in self.vouchers) {
      var count = 0;
      var currentVoucher = self.vouchers[i];
      for (var j in self.shoppingCart) {
        var currentItem = self.shoppingCart[j];
        if (currentItem.category.includes(currentVoucher.condition)) {
          count += currentItem.quantity;
        }
      }
      if (self.vouchers[i].minimum_order <= self.subTotal && currentVoucher.minimum_number <= count) {
        self.bestVoucher = currentVoucher;
        return;
      }
    }
    self.bestVoucher = false;
  };

  self.getCategories = function() {
    var categories = []
    for (var i in self.products) {
      categories.push(self.products[i].category);
    }
    self.categories = _.uniq(categories).sort();
  };

  self.showCategories = function(category) {
    // this will be used to filter products by category
    self.products
  };

  self.addToCart = function(item) {
    if (self.checkItemAlreadyInCart(item) === false) {
      self.shoppingCart.push( {'name': item.name, 'category': item.category, 'price': item.price, 'quantity': 1 } );
    }
    self.decreaseProductQuantity(item);
    self.subTotal = self.calculateSubTotal();
    self.getBestVoucher();
  };

  self.decreaseProductQuantity = function(item) {
    for (var i in self.products) {
      if (item === self.products[i]) {
        self.products[i].quantity -= 1;
      }
    }
  };

  self.increaseProductQuantity = function(item) {
    for (var i in self.products) {
      if (item.name === self.products[i].name) {
        self.products[i].quantity += item.quantity;
      }
    }
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
    var total = 0;
    for (var i in self.shoppingCart) {
      var currentItem = self.shoppingCart[i];
      total += (currentItem.price * currentItem.quantity);
    }
    return total;
  };

  self.removeFromCart = function(item) {
    var updatedCart = _.filter(self.shoppingCart, function(product) {
      product.name === item.name;
    });
    self.shoppingCart = updatedCart;
    self.subTotal = self.calculateSubTotal();
    self.increaseProductQuantity(item);
    self.getBestVoucher();
  };

  self.emptyCart = function() {
    for (var i in self.shoppingCart) {
      self.increaseProductQuantity(self.shoppingCart[i]);
    }
    self.shoppingCart = [];
    self.subTotal = self.calculateSubTotal();
    self.getBestVoucher();
  }

  self.outOfStock = function(item) {
    if (item.quantity === 0) { return true; }
  };

}]);
