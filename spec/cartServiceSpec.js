describe('Cart service', function () {

  beforeEach(module('clothesStore'));

  var Cart;
  var item;
  var products;
  var shoppingCart;

  createItem = function(product, quantity) {
    return {
      'name': product.name,
      'category': product.category,
      'price': product.price,
      'quantity': quantity
    }
  };

  beforeEach(inject(function(CartService) {
    Cart = new CartService();
    shoppingCart = [];
    products = [];
    for (var i in testItems) {
      products.push(_.clone(testItems[i]))
    }
    item = createItem(products[0], 1);
    Cart.addToCart(shoppingCart, item);
  }));

  it('is defined', function() {
    expect(Cart).toBeDefined();
  });

  it('can add an item to the cart', function() {
    expect(shoppingCart.length).toEqual(1);
  });

  it('can remove an item from the cart', function() {
    shoppingCart = Cart.removeFromCart(shoppingCart, item);
    expect(shoppingCart.length).toEqual(0);
  });

  it('increases item quantity if already in cart', function() {
    Cart.addToCart(shoppingCart, item);
    expect(shoppingCart[0].quantity).toEqual(2);
  });

  it('can search for an item in the cart', function() {
    expect(Cart.findItemInCart(shoppingCart, item)).toEqual(item);
  });

});
