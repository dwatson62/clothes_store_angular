var cart = app.factory('CartService', [function() {

  var Cart = function() {};

  Cart.prototype.addToCart = function(cart, item) {
    if (this.checkItemAlreadyInCart(cart, item) === false) {
      var newProduct = {
        'name': item.name,
        'category': item.category,
        'price': item.price,
        'quantity': 1
      };
      cart.push(newProduct);
    }
  };

  Cart.prototype.checkItemAlreadyInCart = function(cart, item) {
    for (var i in cart) {
      if (cart[i].name === item.name) {
        cart[i].quantity ++;
        return;
      }
    }
    return false;
  };

  Cart.prototype.findItemInCart = function(cart, item) {
    var itemToBeRemoved = _.find(cart, function(element) {
      return element.name === item.name;
    });
    return itemToBeRemoved;
  };

  Cart.prototype.removeFromCart = function(cart, item) {
    cart = _.filter(cart, function(product) {
      return product.name != item.name;
    });
    return cart;
  };

  return Cart;

}]);