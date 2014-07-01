'use strict';

/**
 * @ngdoc directive
 * @name 3djsTestApp.directive:angularDatGui
 * @description
 * # angularDatGui
 */
 angular.module('3djsTestApp')
 .directive('angularDatGui', function ($parse) {
    /*return {
      template: '<div></div>',
      restrict: 'E',
      replace: 'true',
      link: function postLink(scope, element, attrs) {
        element.text('this is the angularDatGui directive');
        scope.gui = new dat.GUI({
 			autoPlace: false,
 			height : 5 * 32 - 1
 		});
      }
  };*/

  return {
  	restrict: "E",
  	replace: true,
  	transclude: false,
  	compile: function (element, attrs) {
  		var modelAccessor = $parse(attrs.ngModel);

  		var html = "<div type='text' id='" + attrs.id + "' class='" + attrs.class + "' >" + "</div>";

  		var newElem = $(html);
  		element.replaceWith(newElem);

  		return function (scope, element, attrs, controller) {

  			var processChange = function () {
               //var date = new Date(element.datepicker("getDate"));
               var gui = new dat.GUI({
		           	autoPlace: false,
		           	height : 5 * 32 - 1
               });

               scope.$apply(function (scope) {
                  // Change bound variable
                  modelAccessor.assign(scope, date);
              });
           };

           /*element.datepicker({
           	inline: true,
           	onClose: processChange,
           	onSelect: processChange
           });*/

           scope.$watch(modelAccessor, function (val) {
           	var date = new Date(val);
           	element.datepicker("setDate", date);
           });

       };

   }
};
});
