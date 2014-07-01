'use strict';

describe('Service: angularDatGui', function () {

  // load the service's module
  beforeEach(module('3djsTestApp'));

  // instantiate service
  var angularDatGui;
  beforeEach(inject(function (_angularDatGui_) {
    angularDatGui = _angularDatGui_;
  }));

  it('should do something', function () {
    expect(!!angularDatGui).toBe(true);
  });

});
