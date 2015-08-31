describe('Voucher service', function () {

  beforeEach(module('clothesStore'));

  var products;
  var vouchers = _.sortBy(testVouchers, 'discount').reverse();
  var Voucher;

  createConfig = function(cart) {
    var subTotal = _.reduce(cart, function(sum, item) {
      return sum + (item.price * item.quantity);
    }, 0);
    return {
      'subTotal': subTotal,
      'vouchers': vouchers,
      'cart': cart
    }
  }

  createItem = function(product, quantity) {
    return {
      'name': product.name,
      'category': product.category,
      'price': product.price,
      'quantity': quantity
    }
  };

  beforeEach(inject(function(VoucherService) {
    Voucher = new VoucherService();
    products = [];
    for (var i in testItems) {
      products.push(_.clone(testItems[i]))
    }

  }));

  it('is defined', function() {
    expect(Voucher).toBeDefined();
  });

  it('starts with three available vouchers', function() {
    expect(vouchers.length).toEqual(3);
  });

  xit('can determine how many of a category has been ordered', function() {
    var cart = [createItem(products[0], 1)];
    var voucher = vouchers[0];
    var count = Voucher.getQuantityOfVoucherCondition(voucher, cart);
    console.log(vouchers)
    expect(count).toEqual(1);
  });

  xdescribe('Offers the best voucher for', function() {

    it('orders under £50', function() {
      var item1 = createItem(products[1], 1);
      var cart = [item1];
      var config = createConfig(cart);
      var bestVoucher = Voucher.getBestVoucher(config);
      expect(bestVoucher.discount).toEqual(5);
    });

    it('orders over £50', function() {
      var item1 = createItem(products[5], 1);
      var item2 = createItem(products[6], 1);
      var cart = [item1, item2];
      var config = createConfig(cart);
      var bestVoucher = Voucher.getBestVoucher(config);
      expect(bestVoucher.discount).toEqual(10);
    });

    it('orders over £75 and one item of footwear bought', function() {
      var item1 = createItem(products[0], 1);
      var cart = [item1];
      var config = createConfig(cart);
      var bestVoucher = Voucher.getBestVoucher(config);
      expect(bestVoucher.discount).toEqual(15);
    });

  });

});
