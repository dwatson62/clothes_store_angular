describe('Store Controller', function () {

  beforeEach(module('clothesStore'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('StoreControl');
    ctrl.products = testItems;
  }));

  it('is defined', function () {
    expect(ctrl).toBeDefined()
  });

  it('has a list of test items', function() {
    expect(ctrl.products).toBeDefined();
  });

  it('starts with an empty shopping cart', function() {
    expect(ctrl.shoppingCart.length).toEqual(0);
  });

  describe('Adding to the shopping cart', function() {

    var item;
    var originalQuantity;

    beforeEach(function() {
      item = testItems[0];
      originalQuantity = item.quantity;
      ctrl.addToCart(item);
    })

    it('increases cart size', function() {
      expect(ctrl.shoppingCart.length).toEqual(1);
    });

    it('decreases product quantity', function() {
      expect(item.quantity).toBeLessThan(originalQuantity);
    });

    it('updates cart quantities when duplicates are added', function() {
      ctrl.addToCart(item);
      expect(ctrl.shoppingCart[0].quantity).toEqual(2);
    });

  })


});