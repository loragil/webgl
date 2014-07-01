'use strict';

describe('Directive: angularDatGui', function () {

  // load the directive's module
  beforeEach(module('3djsTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<angular-dat-gui></angular-dat-gui>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the angularDatGui directive');
  }));
});
