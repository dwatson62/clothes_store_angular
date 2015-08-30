var shop = app.factory('ShopService', [function() {

  var Shop = function() {};

  Shop.prototype.decreaseProductQuantity = function(shopProducts, item) {
    _.each(shopProducts, function(element) {
      if (item === element) { element.quantity -= 1; }
    });
  };

  Shop.prototype.increaseProductQuantity = function(shopProducts, item) {
    _.each(shopProducts, function(element) {
      if (item.name === element.name) { element.quantity += item.quantity; }
    });
  };

  Shop.prototype.restoreQuantities = function(cart, shopProducts) {
    for (var i in cart) {
      this.increaseProductQuantity(shopProducts, cart[i]);
    }
  };

  Shop.prototype.calculateSubTotal = function(cart) {
    var total = _.reduce(cart, function(sum, item) {
      return sum + (item.price * item.quantity);
    }, 0);
    return total;
  };

  return Shop;

}]);