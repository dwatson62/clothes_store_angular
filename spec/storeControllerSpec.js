describe('Store Controller', function () {

  beforeEach(module('clothesStore'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('StoreControl');
    ctrl.products = testItems;

  //   httpBackend = $httpBackend;
  //   httpBackend
  //   .expectGET("/javascripts/seedData.json")
  //     .respond(
  //     { items: testItems }
  //   );

  // return httpBackend;

  }));

  afterEach(function() {
    ctrl.emptyCart();
  });

  it('is defined', function () {
    expect(ctrl).toBeDefined();
  });

  it('has a list of test items', function() {
    expect(ctrl.products).toBeDefined();
  });

  it('starts with an empty shopping cart', function() {
    expect(ctrl.shoppingCart.length).toEqual(0);
  });

  describe('Shopping', function() {

    var originalQuantity;

    describe('with a single item', function() {

      beforeEach(function() {
        originalQuantity = ctrl.products[0].quantity;
        ctrl.addToCart(ctrl.products[0]);
      });

      it('increases cart size', function() {
        expect(ctrl.shoppingCart.length).toEqual(1);
      });

      it('updates subtotal automatically', function() {
        expect(ctrl.subTotal).toEqual(99);
      });

    });

    describe('with multiple items', function() {

      beforeEach(function() {
        originalQuantity = ctrl.products[0].quantity;
        ctrl.addToCart(ctrl.products[0]);
        ctrl.addToCart(ctrl.products[0]);
      });

      it('updates cart quantities when duplicates are added', function() {
        expect(ctrl.shoppingCart[0].quantity).toEqual(2);
      });

      it('does not increase cart length when duplicates are added', function() {
        expect(ctrl.shoppingCart.length).toEqual(1);
      });

      it('updates subtotal automatically', function() {
        expect(ctrl.subTotal).toEqual(198);
      });

    });

    describe('Removing', function() {

      beforeEach(function() {
        originalQuantity1 = ctrl.products[0].quantity;
        originalQuantity2 = ctrl.products[1].quantity;
        ctrl.addToCart(ctrl.products[0]);
      });

      it('a single item', function() {
        ctrl.removeFromCart(ctrl.shoppingCart[0]);
        expect(ctrl.shoppingCart.length).toEqual(0);
      });

      it('will update the subtotal automatically', function() {
        ctrl.removeFromCart(ctrl.products[0]);
        expect(ctrl.subTotal).toEqual(0);
      });

      it('can empty the cart', function() {
        ctrl.addToCart(ctrl.products[1]);
        ctrl.emptyCart();
        expect(ctrl.shoppingCart.length).toEqual(0);
      });

    });

  });


});