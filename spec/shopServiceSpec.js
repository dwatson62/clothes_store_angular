describe('Shop service', function () {

  beforeEach(module('clothesStore'));

  var products;
  var Shop;

  beforeEach(inject(function(ShopService) {
    Shop = new ShopService();
    products = [];
    for (var i in testItems) {
      products.push(_.clone(testItems[i]))
    }
  }));

  createItem = function(product, quantity) {
   return {
      'name': product.name,
      'category': product.category,
      'price': product.price,
      'quantity': quantity
    }
  };

  it('is defined', function() {
    expect(Shop).toBeDefined();
  });

  it('can decrease stock quantity by 1', function() {
    var originalQuantity = products[0].quantity;
    Shop.decreaseProductQuantity(products, products[0]);
    expect(products[0].quantity).toBeLessThan(originalQuantity);
  });

  it('can increase stock quantity', function() {
    var originalQuantity = products[0].quantity
    var item = createItem(products[0], 1)
    Shop.increaseProductQuantity(products, item);
    expect(products[0].quantity).toBeGreaterThan(originalQuantity);
  });

  it('can increase multiple stock quantities', function() {
    var item1 = createItem(products[0], 1);
    var item2 = createItem(products[1], 2);
    var cart = [item1, item2];
    Shop.restoreQuantities(cart, products);
    expect(products[0].quantity).toBeGreaterThan(item1.quantity);
    expect(products[1].quantity).toBeGreaterThan(item2.quantity);
  });

  it('can calculate subtotal', function() {
    var item1 = createItem(products[0], 1);
    var item2 = createItem(products[1], 1);
    var cart = [item1, item2];
    var price = item1.price + item2.price
    expect(Shop.calculateSubTotal(cart)).toEqual(price)
  });

});
