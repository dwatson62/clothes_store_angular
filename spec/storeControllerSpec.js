describe('Store Controller', function () {

  beforeEach(module('clothesStore'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('StoreControl');
  }));

  it('is defined', function () {
    expect(ctrl).toBeDefined()
  });

});