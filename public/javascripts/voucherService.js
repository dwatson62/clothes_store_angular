var voucher = app.factory('VoucherService', ['$http', function($http) {

  var Voucher = function() {};

  Voucher.prototype.getVouchers = function() {
    $http.get('/javascripts/seedVouchers.json').
      then(function(response) {
        return this.sortVouchers(response.data);
      });
  };

  Voucher.prototype.sortVouchers = function(vouchers) {
    return _.sortBy(vouchers, 'discount').reverse();
  };

  return Voucher;

}]);