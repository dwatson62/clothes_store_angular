var voucher = app.factory('VoucherService', ['$http', function($http) {

  var Voucher = function() {};

  Voucher.prototype.getBestVoucher = function(config) {
    for (var i in config.vouchers) {
      var currentVoucher = config.vouchers[i];
      var quantity = this.getQuantityOfVoucherCondition(currentVoucher, config.cart);
      if (currentVoucher.minimum_order <= config.subTotal && currentVoucher.minimum_number <= quantity) {
        return currentVoucher;
      }
    }
    return false;
  };

  Voucher.prototype.getQuantityOfVoucherCondition = function(currentVoucher, shoppingCart) {
    var quantity = 0;
    _.each(shoppingCart, function(item) {
      if (item.category.indexOf(currentVoucher.condition) > -1) {
        quantity ++;
      }
    });
    return quantity;
  };

  return Voucher;

}]);