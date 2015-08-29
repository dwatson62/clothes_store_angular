var storeController = app.controller('StoreControl', ['$http', function($http) {

  var self = this;
  self.category;
  self.shoppingCart = [];

  $('.dropdown-toggle').dropdown();

  self.init = function() {
    $http.get('/javascripts/seedData.json').
      then(function(response){
        self.products = response.data;
        self.getCategories();
      });
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
    var quantity = self.checkCartQuantities(item);
    self.shoppingCart.push( {'name': item.name, 'price': item.price, 'quantity': quantity } );
    self.decreaseProductQuantity(item);
  };

  self.decreaseProductQuantity = function(item) {
    for (var i in self.products) {
      if (item === self.products[i]) {
        self.products[i].quantity -= 1;
      }
    }
  };

  self.checkCartQuantities = function(item) {
    var count = 1;
    for (var i in self.shoppingCart.reverse()) {
      var currentItem = self.shoppingCart[i];
      if (currentItem.name === item.name) {
        count = currentItem.quantity + 1;
        self.shoppingCart.splice(i, 1);
      }
    }
    return count;
  };

}]);
