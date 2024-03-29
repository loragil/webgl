'use strict';

describe('Controller: Demo2Ctrl', function () {

  // load the controller's module
  beforeEach(module('3djsTestApp'));

  var Demo2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Demo2Ctrl = $controller('Demo2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
