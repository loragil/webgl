'use strict';

/**
 * @ngdoc service
 * @name 3djsTestApp.angularDatGui
 * @description
 * # angularDatGui
 * Service in the 3djsTestApp.
 */
 angular.module('3djsTestApp')
 .service('Angulardatgui', function Angulardatgui() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var gui = null;

    var init = function (DOMContainer){
    	//init dat.GUI object
    	gui = new dat.GUI({
    		autoPlace: false,
    		height : 5 * 32 - 1
    	});

    	//attach to screen
    	angular.element(DOMContainer).append(gui.domElement);
    	//return gui;
    };

    this.add = function (obj, name, min, max) {
    	gui.add(obj, name, min, max);
    };

    this.get = function (obj, name) {
    	//gui.get(obj, name);
    };

    init();
});
